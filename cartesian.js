class Cartesian {
    constructor({sketch, rangeX = [-5, 5], rangeY = [-5, 5], scale = 0.25, grid = {numbered : true, style : "gridlined"}}) {
        this.sketch = sketch;
        this.rangeX = rangeX;
        this.rangeY = rangeY;
        this.scale = scale; // distance at which gridlines are displayed
        this.grid = grid;
        this.unitX = this.sketch.width/(rangeX[1] - rangeX[0]);
        this.unitY = this.sketch.height/(rangeY[1] - rangeY[0]);
        this.originPx = [-rangeX[0] * this.unitX, rangeY[1] * this.unitY];
        this.center = [(this.rangeX[1] + this.rangeX[0])/2, (this.rangeY[1] + this.rangeY[0])/2];
        this.colorPallete = {
            background : 30,
            axis : 255,
            grid : this.sketch.color(50, 120, 180),
            markings : 255
        };
        this.markings = 1; // grid will have thick lines and be marked with the number every ___ units
        this.maxHeight = this.sketch.height;
        this.maxWidth = this.sketch.width;
        if (grid.style == "lined") {
            this.maxHeight = 10;
            this.maxWidth = 10;
            this.colorPallete.grid = this.sketch.color(100, 200, 255);
        }
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
        this.originPx[0] = -this.rangeX[0] * this.unitX;
        this.center[0] = (this.rangeX[1] + this.rangeX[0])/2;

        if(this.rangeX[1] - this.rangeX[0] < 2 * this.scale) {
            this.sketch.noLoop();
        }
    }

    updateRangeY(newRange) {
        this.rangeY = newRange
        this.unitY = this.sketch.height/(this.rangeY[1] - this.rangeY[0]);
        this.center[1] = (this.rangeY[1] + this.rangeY[0])/2;
        this.originPx[1] =  this.rangeY[1] * this.unitY;

        if(this.rangeY[1] - this.rangeY[0] < 2 * this.scale) {
            this.sketch.noLoop();
        }
    }

    updateScale(newScale) {
        this.scale = newScale
    }

    // give positive speed to zoom in and negative to zoom out
    // will zoom till the viewport displays a graph that ranges to targetScale * scale in all directions from center 
    zoomToCenter(speed = 1, targetRange = null, targetScale = 1) {
        if ((!targetRange || (targetRange[0] * Math.sign(speed) > this.rangeX[0] * Math.sign(speed))) && this.scale < (this.rangeX[1] - this.rangeX[0])/(2 * targetScale)) {
            this.updateRangeX([this.rangeX[0] / (1 + (.005 * speed)), this.rangeX[1] / (1 + (.005 * speed))]);
            this.updateRangeY([this.rangeY[0] / (1 + (.005 * speed)), this.rangeY[1] / (1 + (.005 * speed))]);
        }
    }

    panTo(point, speed = 1) {
        let v = new Vector(point);
        if (!v.isEqual(new Vector(this.center))) {
            let cen = new Vector(this.center);
     
            let vel = v.subtract(cen).unit().mult(0.1 * speed);
            if (Vector.length(v, cen) < vel.mag) {
                vel.resizeTo(Vector.length(v, cen));
            }
            this.updateRangeX([this.rangeX[0] + vel.x, this.rangeX[1] + vel.x]);
            this.updateRangeY([this.rangeY[0] + vel.y, this.rangeY[1] + vel.y]);
        }
    }

    drawPlane() {
        this.sketch.background(this.colorPallete.background);
        
        for (let i = parseInt(this.rangeX[0]/this.scale) * this.scale; i <= this.rangeX[1]; i += this.scale) {
            this.sketch.strokeWeight(0.5);
            this.sketch.stroke(this.colorPallete.grid);

            if (i.toFixed(10) == 0) {
                this.sketch.strokeWeight(1);
                this.sketch.stroke(this.colorPallete.axis);
                // this.sketch.line(this.pointToPixel(i, 0)[0], 0, this.pointToPixel(i, 0)[0], this.sketch.height);
            }

            if ((i / this.markings).round(5) % 1 == 0 && i.toFixed() != 0) {
                this.sketch.strokeWeight(1);
            }
            
            this.sketch.line(this.pointToPixel(i, 0)[0], 0, this.pointToPixel(i, 0)[0], this.sketch.height);
            
            if ((i / this.markings).round(5) % 1 == 0 || i.toFixed(10) == 0) {
                this.sketch.textSize(17);
                this.sketch.fill(this.colorPallete.markings);
                this.sketch.noStroke();
                this.sketch.textAlign(this.sketch.CENTER, this.sketch.TOP);
                if(i.toFixed(10) == 0) {
                    this.sketch.textAlign(this.sketch.RIGHT, this.sketch.TOP);
                    this.sketch.text( 0, this.pointToPixel(i, 0)[0] - 10, this.originPx[1] + 10);
                    continue;
                }
                this.sketch.text(i.round(3), this.pointToPixel(i, 0)[0], this.originPx[1] + 10);
            }
        }

        for (let j = parseInt(this.rangeY[1]/this.scale) * this.scale; j >= this.rangeY[0]; j -= this.scale) {
            this.sketch.strokeWeight(0.5);
            this.sketch.stroke(this.colorPallete.grid);
            if (j.toFixed(10) == 0) {
                this.sketch.strokeWeight(1);
                this.sketch.stroke(this.colorPallete.axis);
                // this.sketch.line(0, this.pointToPixel(0, j)[1], this.sketch.width, this.pointToPixel(0, j)[1]);
            }
            if ((j / this.markings).round(5) % 1 == 0 && j.toFixed(10) != 0) {
                this.sketch.strokeWeight(1);
            }
            
            this.sketch.line(0, this.pointToPixel(0, j)[1], this.sketch.width, this.pointToPixel(0, j)[1]);

            if ((j / this.markings).round(5) % 1 == 0 && j.toFixed(10) != 0) {
                this.sketch.textSize(17);
                this.sketch.fill(this.colorPallete.markings);
                this.sketch.noStroke();
                this.sketch.textAlign(this.sketch.RIGHT, this.sketch.TOP);
                this.sketch.text(j.round(3), this.originPx[0] - 10, this.pointToPixel(0, j)[1]);
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
    
    normal() {
        if (this.x != 0) {
            return new Vector([1/this.x, 0]);
        }
        else if (this.y != 0) {
            return new Vector([0, 1/this.y]);
        }
        else {
            return this.clone();
        }
    }

    static length(v1, v2 = new Vector([0, 0])) {
        let len = Math.sqrt((v1.x - v2.x)**2 + (v1.y - v2.y)**2);
        return len;
    }

}

Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
  }