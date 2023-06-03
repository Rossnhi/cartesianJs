class Cartesian {
    constructor({ canvasSize = [600, 600], rangeX = [-5, 5], rangeY = [-5, 5], scale = 0.25, grid = {numbered : true, style : "gridlined"}, gridAnimation = new Animation(true, 0, 0.1), draw}) {
        this.sketch;
        this.initializeSketch(canvasSize[0], canvasSize[1]);
        this.rangeX = rangeX;
        this.rangeSpanX = this.rangeX[1] - this.rangeX[0];
        this.rangeY = rangeY;
        this.rangeSpanY = this.rangeY[1] - this.rangeY[0];
        this.unitX = canvasSize[0]/(this.rangeX[1] - this.rangeX[0]);
        this.unitY = canvasSize[1]/(this.rangeY[1] - this.rangeY[0]);
        this.originPx = [-this.rangeX[0] * this.unitX, this.rangeY[1] * this.unitY];
        this.scale = scale; // distance at which gridlines are displayed
        this.grid = grid;
        this.unitX;
        this.unitY;
        this.originPx;
        this.center = [(this.rangeX[1] + this.rangeX[0])/2, (this.rangeY[1] + this.rangeY[0])/2];
        this.colorPallete = {
            background : 30,
            axis : 255,
            grid : this.sketch.color(50, 120, 180),
            markings : 255
        };
        this.markings = 1; // grid will have thick lines and be marked with the number every ___ units
        this.gridAnimation = gridAnimation;
        this.zoom = {
            sequencer : 0,
            animations : []
        };
        this.pan = {
            sequencer : 0,
            animations : []
        }
        this.components = {
            points : [],
            plots : []
        };
    }

    initializeSketch(canvasWidth, canvasHeight) {
        const s = ( sketch ) => {
            sketch.setup = () => {
                sketch.createCanvas(canvasWidth, canvasHeight);
                this._draw();
            };
          };
          this.sketch = new p5(s);
    }

    _draw() {
        this.drawPlane();
        this.drawPoints();
        this.drawPlots();
    }

    draw(f) {
        this.sketch.draw = () => {
            f();
            this._draw();
        };
    }

    _setup() {
        this.mousePressed();
    }

    setup(f) {
        var cachedFunc = this.sketch.setup;
        this.sketch.setup = () => {
            cachedFunc.apply();
            f();
            this._setup();
        };
    }

    _mousePressed() {
        for (let point of this.components.points) {
            point._mousePressed();
        }
    }

    mousePressed(f = () => {}) {
        this.sketch.mousePressed = () => {
            f();
            this._mousePressed();
        };
    }

    pixelToPoint(x, y) {
        let a =  (x / this.unitX) + this.rangeX[0];
        let b =  this.rangeY[1] - (y / this.unitY);
        return [a , b];
    }

    pointToPixel(a, b) {
        let x = this.unitX * (a - this.rangeX[0]);
        let y = this.unitY * (this.rangeY[1] - b);
        return [x, y];
    }

    updateRangeX(newRange) {
        this.rangeX = newRange;
        this.unitX = this.sketch.width/(this.rangeX[1] - this.rangeX[0]);
        this.rangeSpanX = this.rangeX[1] - this.rangeX[0];
        this.originPx[0] = -this.rangeX[0] * this.unitX;
        this.center[0] = (this.rangeX[1] + this.rangeX[0])/2;
    }

    updateRangeY(newRange) {
        this.rangeY = newRange;
        this.unitY = this.sketch.height/(this.rangeY[1] - this.rangeY[0]);
        this.rangeSpanY = this.rangeY[1] - this.rangeY[0];
        this.center[1] = (this.rangeY[1] + this.rangeY[0])/2;
        this.originPx[1] =  this.rangeY[1] * this.unitY;
    }

    updateScale(newScale) {
        this.scale = newScale
    }

    // give positive speed to zoom in and negative to zoom out
    // will zoom till the viewport displays a graph that ranges to targetScale * scale in all directions from center 
    zoomToCenter(speed = 1, targetScale = 1, targetRange = null) {
        if (typeof this.zoom.animations[this.zoom.sequencer] == "undefined") {
            this.zoom.animations[this.zoom.sequencer] = new Animation();
        }
        if (this.zoom.animations[this.zoom.sequencer].animate != false) {
            if ((!targetRange || (targetRange[0] * Math.sign(speed) > this.rangeX[0] * Math.sign(speed))) && this.scale * Math.sign(speed) < (this.rangeX[1] - this.rangeX[0])/(2 * targetScale) * Math.sign(speed)) {
                this.zoom.animations[this.zoom.sequencer].animate = true;
                this.updateRangeX([this.rangeX[0] + (.002 * this.rangeSpanX * speed), this.rangeX[1] - (.002 * this.rangeSpanX  * speed)]);
                this.updateRangeY([this.rangeY[0] + (.002 * this.rangeSpanY * speed), this.rangeY[1] - (.002 * this.rangeSpanY  * speed)]);
            }
            else {
                this.zoom.animations[this.zoom.sequencer].animate = false;
            }
        }
        this.zoom.sequencer++;
        return this.zoom.animations[this.zoom.sequencer - 1];
    }

    panTo(point, speed = 0.5) {
        if (typeof this.pan.animations[this.pan.sequencer] == "undefined") {
            this.pan.animations[this.pan.sequencer] = new Animation();
        }
        if (this.pan.animations[this.pan.sequencer].animate != false) {
            let v = new Vector(point);
            if (!v.isEqual(new Vector(this.center))) {
                this.pan.animations[this.pan.sequencer].animate = true;
                let cen = new Vector(this.center);
         
                let vel = v.subtract(cen).unit().mult(0.1 * speed);
                if (Vector.length(v, cen) < vel.mag) {
                    vel.resizeTo(Vector.length(v, cen));
                }
                this.updateRangeX([this.rangeX[0] + vel.x, this.rangeX[1] + vel.x]);
                this.updateRangeY([this.rangeY[0] + vel.y, this.rangeY[1] + vel.y]);
            }
            else {
                this.pan.animations[this.pan.sequencer].animate = false;
            }
        }
        this.pan.sequencer++;
        return this.pan.animations[this.pan.sequencer - 1];
    }

    resetAnimationSequencer() {
        this.zoom.sequencer = 0;
        this.pan.sequencer = 0;
    }

    drawPlane() {
        this.resetAnimationSequencer();
        this.sketch.background(this.colorPallete.background);
        
        for (let i = parseInt(this.rangeX[0]/this.scale) * this.scale; i <= this.rangeX[1]; i += this.scale) {
            this.sketch.strokeWeight(0.5);
            this.sketch.stroke(this.colorPallete.grid);

            if ((i / this.markings).round(5) % 1 == 0 && i.toFixed() != 0) {
                this.sketch.strokeWeight(1);
            }
            if (this.grid.style == "gridlined") {
                this.sketch.line(this.pointToPixel(i, 0)[0], 0, this.pointToPixel(i, 0)[0], this.sketch.height);
            }
            else {
                this.sketch.line(this.pointToPixel(i, 0)[0], this.originPx[1] - 5, this.pointToPixel(i, 0)[0], this.originPx[1] + 5);
            }
            
            if (i.toFixed(10) == 0) {
                this.sketch.strokeWeight(1);
                this.sketch.stroke(this.colorPallete.axis);
                this.sketch.line(this.pointToPixel(i, 0)[0], 0, this.pointToPixel(i, 0)[0], this.sketch.height);
            }

            if ((i / this.markings).round(5) % 1 == 0 || i.toFixed(10) == 0) {
                this.sketch.textSize(17);
                this.sketch.fill(this.colorPallete.markings);
                this.sketch.noStroke();
                this.sketch.textAlign(this.sketch.CENTER, this.sketch.TOP);
                if(i.toFixed(10) == 0) {
                    this.sketch.textAlign(this.sketch.RIGHT, this.sketch.TOP);
                    if (this.grid.numbered) {
                        this.sketch.text( 0, this.pointToPixel(i, 0)[0] - 10, this.originPx[1] + 10);
                    }
                    continue;
                }
                if (this.grid.numbered) {
                    this.sketch.text(i.round(3), this.pointToPixel(i, 0)[0], this.originPx[1] + 10);
                }
            }
        }

        for (let j = parseInt(this.rangeY[1]/this.scale) * this.scale; j >= this.rangeY[0]; j -= this.scale) {
            this.sketch.strokeWeight(0.5);
            this.sketch.stroke(this.colorPallete.grid);
            if (j.toFixed(10) == 0) {
                this.sketch.strokeWeight(1);
                this.sketch.stroke(this.colorPallete.axis);
                this.sketch.line(0, this.pointToPixel(0, j)[1], this.sketch.width, this.pointToPixel(0, j)[1]);
            }
            if ((j / this.markings).round(5) % 1 == 0 && j.toFixed(10) != 0) {
                this.sketch.strokeWeight(1);
            }
            
            if (this.grid.style == "gridlined") {
                this.sketch.line(0, this.pointToPixel(0, j)[1], this.sketch.width, this.pointToPixel(0, j)[1]);

            }
            else {
                this.sketch.line(this.originPx[0] - 5, this.pointToPixel(0, j)[1], this.originPx[0] + 5, this.pointToPixel(0, j)[1]);

            }
            
            if ((j / this.markings).round(5) % 1 == 0 && j.toFixed(10) != 0) {
                this.sketch.textSize(17);
                this.sketch.fill(this.colorPallete.markings);
                this.sketch.noStroke();
                this.sketch.textAlign(this.sketch.RIGHT, this.sketch.CENTER);
                if (this.grid.numbered) {
                    this.sketch.text(j.round(3), this.originPx[0] - 10, this.pointToPixel(0, j)[1]);
                }
            }
        }
    }

    addPoint(p) {
        let point = new Point(p, this);
        this.components.points.push(point);
        return point;
    }

    drawPoints() {
        for (let point of this.components.points) {
            point.draw();
        }
    }
    
    addPlot(f) {
        let plot = new Plot(f, this);
        this.components.plots.push(plot);
        return plot;
    }

    drawPlots() {
        for (let plot of this.components.plots) {
            plot.draw();
            for (let plotPoint of plot.plotPoints) {
                plotPoint.p.draw();
            }
        }
    }
}

class Vector {
    constructor(v) {
        this.x = v[0];
        this.y = v[1];
        this.mag = Math.sqrt(this.dotProduct(this));
    }

    static createVector(a = 0) {
        return new Vector([a, a]);
    }

    index(i) {
        switch (i) {
            case 0:
                return this.x;
            case 1:
                return this.y;
        }
    }

    insert(i, val) {
        switch (i) {
            case 0:
                this.x = val;
            case 1:
                this.y = val;
        }

        return this;
    }

    isEqual(v) {
        return (this.x == v.x && this.y == v.y);
    }

    isZero() {
        return (this.mag == 0);
    }

    clone() {
        return new Vector([this.x, this.y]);
    }

    add(v) {
        return new Vector([v.x + this.x, v.y + this.y]);
    }

    addScalar(a) {
        return new Vector([a + this.x, a + this.y]); // this.add(Vector.createVector(a));
    }

    subtract(v) {
        return new Vector([this.x - v.x, this.y - v.y]);
    }

    // scalar multiplication
    mult(a) {
        return new Vector([a * this.x, a * this.y]);
    }

    scale(a) {
        Object.assign(this, this.mult(a));
        return this;
    } 

    resizeTo(a) {
        Object.assign(this, this.unit().mult(a));
        return this;
    }

    dotProduct(v) {
        let dot = (this.x * v.x) + (this.y * v.y);
        return dot;
    } 

    unit() {
        if (this.mag == 0) {
            return this;
        }
        return this.mult(1/this.mag);
    }

    isNormal(v) {
        return (this.dotProduct(v) == 0);
    }
    
    normal(dir = 1) {
        return new Vector([-this.y * dir, this.x * dir]);
    }

    rotate(t) {
        t = t * Math.PI / 180;
        let rot = new Matrix([new Vector([ Math.cos(t), -Math.sin(t)]), new Vector([ Math.sin(t), Math.cos(t)])]);
        return rot.vectorMult(this).mult(1/this.mag);
    }

    static length(v1, v2 = new Vector([0, 0])) {
        let len = Math.sqrt((v1.x - v2.x)**2 + (v1.y - v2.y)**2);
        return len;
    }

}

class Matrix {
    constructor(matrix) {
        this.matrix = matrix;
    }

    det() {
        return ((this.matrix[0].index(0) * this.matrix[1].index(1)) - (this.matrix[1].index(0) * this.matrix[0].index(1)));
    }

    adj() {
        return new Matrix([ new Vector([ this.matrix[1].index(1), -this.matrix[0].index(1)]), new Vector([ -this.matrix[1].index(0), this.matrix[0].index(0)])]);
    }

    inv() {
        if (this.det() != 0) {
            return this.adj().scalarMult(1/this.det());
        }
    }

    transpose() {
        return new Matrix([new Vector([ this.matrix[0].index(0), this.matrix[1].index(0)]), new Vector([ this.matrix[0].index(1), this.matrix[1].index(1)])]);
    }

    add(m) {
        let res = new Matrix([]);
        for(let i = 0; i < 2; i++) {
            res.matrix.push(new Vector([0, 0]));
            for (let j = 0; j < 2; j++) {
                res.matrix[i].insert(j, this.matrix[i].index(j) + m.matrix[i].index(j));
            }
        }
        return res;
    }

    scalarMult(a) {
        let res = new Matrix([]);
        for(let i = 0; i < 2; i++) {
            res.matrix.push(new Vector([0, 0]));
            for (let j = 0; j < 2; j++) {
                res.matrix[i].insert(j, this.matrix[i].index(j) * a);
            }
        }
        return res;
    }

    subtract(m) {
        return this.add(m.scalarMult(-1));
    }

    matMult(m) {
        let res = new Matrix([new Vector([0, 0]), new Vector([0, 0])]);
        for(let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let dot = this.matrix[i].dotProduct(new Vector([m.matrix[0].index(j), m.matrix[1].index(j)]));
                res.matrix[i].insert(j, dot);
            }
        }
        return res;
    }

    vectorMult(v) {
        let res = new Vector([0, 0]);
        for(let i = 0; i < 2; i++) {
            let dot = this.matrix[i].dotProduct(v);
            res.insert(i, dot);
        }
        return res;
    }
}

Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
}

class Animation {
    constructor( animate = null, val = 0, inc = 0) {
        this.animate = animate;
        this.val = val;
        this.inc = inc;
    }

    // a.then(b) will execute b sequentially after a is done animating. b starts after a.
    then(f, s = 0) {
        if (!this.animate) {
            if (this.inc > s * 55) {
                f();
            }
        }
        this.inc++;
    }

    // a.tillThen(b) will execute b while a is animating and will continue only till a is done animating. b stops as soon as a stops
    tillThen(f) {
        if (this.animate) {
            f();
        }
    }
}

class Point {
    constructor(p, cart, size = 7, color = null, style = "dot", dropPerpendiculars = false) {
        this.point = new Vector(p);
        this.c = cart; // object of class cartesian
        this.pointPx = this.c.pointToPixel(this.point.x, this.point.y);
        this.size = size;
        this.color = color == null? c.sketch.color(235, 195, 52) : color;
        this.style = style;
        this.dropPerpendiculars = style == "dot"? dropPerpendiculars : false;
        this.moveWithMouse = false;
        this.move = false;
    }

    _moveWithMouse() {
        if (this.move && this.moveWithMouse) {
            this.update([this.c.pixelToPoint(this.c.sketch.mouseX, this.c.sketch.mouseY)[0], this.c.pixelToPoint(this.c.sketch.mouseX, this.c.sketch.mouseY)[1]]);
        }
    }

    update(p) {
        this.point = new Vector(p);
        this.pointPx = this.c.pointToPixel(this.point.x, this.point.y);
    }

    modify() {
        this._moveWithMouse();
    }

    draw() {
        this.modify();

        this.pointPx = this.c.pointToPixel(this.point.x, this.point.y);

        if (this.style == "dot") {
            this.c.sketch.noStroke();
            this.c.sketch.fill(this.color);
            this.c.sketch.ellipse(this.pointPx[0], this.pointPx[1], this.size, this.size);

            if (this.dropPerpendiculars) {
                this.c.sketch.stroke(this.color);
                this.c.sketch.strokeWeight(1.5);
                this.c.sketch.line(this.pointPx[0], this.pointPx[1], this.pointPx[0], this.c.originPx[1]);
                this.c.sketch.line(this.pointPx[0], this.pointPx[1], this.c.originPx[0], this.pointPx[1]);
            }
        }
        else {
            this.c.sketch.stroke(this.color);
            this.c.sketch.strokeWeight(1.5);
            this.c.sketch.line( this.c.originPx[0], this.c.originPx[1], this.pointPx[0], this.pointPx[1]);

            let arrow1 = this.point.mult(-1).rotate(30).unit().mult(10/ this.c.unitX).add(this.point);
            this.c.sketch.line(this.pointPx[0], this.pointPx[1], this.c.pointToPixel(arrow1.x, arrow1.y)[0], this.c.pointToPixel(arrow1.x, arrow1.y)[1]);
            
            let arrow2 = this.point.mult(-1).rotate(-30).unit().mult(10/ this.c.unitX).add(this.point);
            this.c.sketch.line(this.pointPx[0], this.pointPx[1], this.c.pointToPixel(arrow2.x, arrow2.y)[0], this.c.pointToPixel(arrow2.x, arrow2.y)[1]);
        }
    }

    _mousePressed() {
        if(( this.pointPx[0] < this.c.sketch.mouseX + 5 && this.pointPx[0] > this.c.sketch.mouseX - 5) && ( this.pointPx[1] < this.c.sketch.mouseY + 5 && this.pointPx[1] > this.c.sketch.mouseY - 5 )) {
            this.move = !this.move;
        }
    }
}

class Plot {
    constructor(func, cart, color = null, step = 3000) {
        this.func = func;
        this.c = cart;
        this.color = color == null? c.sketch.color(69, 205, 255) : color;
        this.plotPoints = [];
        this.step = step;
    }

    draw() {
        for(let plotPoint of this.plotPoints) {
            plotPoint.slides.sequencer = 0;
        }   

        let span = this.c.rangeSpanX/this.step;
        let prevX = this.c.rangeX[0];
        for (let x = this.c.rangeX[0]; x <= this.c.rangeX[1]; x += span) {
            this.c.sketch.strokeWeight(1.1);
            this.c.sketch.stroke(this.color);
            this.c.sketch.line(this.c.pointToPixel(prevX, this.func(prevX))[0], this.c.pointToPixel(prevX, this.func(prevX))[1], this.c.pointToPixel(x, this.func(x))[0], this.c.pointToPixel(x, this.func(x))[1]);
            prevX = x;
        }
    }

    addPlotPoint(x) {
        let p = new PlotPoint(new Point([x, this.func(x)], this.c), this.func);
        p.p.dropPerpendiculars = true;
        this.plotPoints.push(p);
        return p;
    }
}

class PlotPoint {
    constructor(p, func) {
        this.p = p;
        this.func = func;
        this.slides = {
            sequencer : 0,
            animations : []
        };
    }

    slideTo(x, speed = 1) {
        if (typeof this.slides.animations[this.slides.sequencer] == "undefined") {
            this.slides.animations[this.slides.sequencer] = new Animation();
        }
        if (this.slides.animations[this.slides.sequencer].animate != false) {
            if ( Math.abs(x - this.p.point.x) > 0.0005 * speed * this.p.c.rangeSpanX) {
                this.slides.animations[this.slides.sequencer].animate = true;
                if(x > this.p.point.x) {
                    let newX = this.p.point.x + 0.0005 * speed * this.p.c.rangeSpanX;
                    this.p.update([newX, this.func(newX)]);
                }
                else {
                    let newX = this.p.point.x - 0.0005 * speed * this.p.c.rangeSpanX;
                    this.p.update([newX, this.func(newX)]);
                }
            }
            else {
                // this.p.update([x, this.func(x)]);
                this.slides.animations[this.slides.sequencer].animate = false
            }
        }
        this.slides.sequencer++;
        return this.slides.animations[this.slides.sequencer - 1];
    }

    style(s) {
        this.p.style = s;
    }
}