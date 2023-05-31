Number.prototype.round = function(places) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
  }
  
  class Line {
    constructor() {
        this.p1 =  new Vector([x1, y1]);
        this.p2 =  new Vector([x2, y2]);
        this.length = Geom.length(p1, p2);
    }
}

// class Vector {
//     constructor(p) {
//         this.x = p[0];
//         this.y = p[1];
//         if(this.isZero()) {
//             this.mag = 0;
//         }
//         else {
//             this.mag = Geom.length(this);
//         }
//     }

//     isEqual(p) {
//         return (p.x == this.x && p.y == this.y);
//     }

//     isZero() {
//         return (this.x == 0 && this.y == 0);
//     }

//     clone() {
//         return new Vector([this.x, this.y]);
//     }

//     add(p) {
//         return new Vector([p.x + this.x, p.y + this.y]);
//     }

//     // scalar multiplication
//     mult(a) {
//         return new Vector([a * this.x, a * this.y]);
//     }
    

// }

class Plane {
    constructor(sketch, rangeX = [-3, 3], rangeY = [-3, 3], scale = 0.25, axisLabel = {numbered : true, grid : "lined"}) {
        this.sketch = sketch;
        this.rangeX = rangeX;
        this.rangeY = rangeY;
        this.scale = scale;
        this.unitX = this.sketch.width / (parseInt(rangeX[1] - rangeX[0]));
        this.unitY = this.sketch.height / (parseInt(rangeY[1] - rangeY[0]));
        this.axisLabel = axisLabel;
        this.background = 30;
    }


    drawPlane() {
        this.sketch.background(this.background);
        if (this.axisLabel.grid == "lined") {
            let i = this.rangeX[0]/this.scale - parseInt(this.rangeX[0]/this.scale) > 0? 1 - (this.rangeX[0]/this.scale - parseInt(this.rangeX[0]/this.scale)) : -(this.rangeX[0]/this.scale - parseInt(this.rangeX[0]/this.scale));
            i *= this.scale;

            while(i <= this.rangeX[1] -  this.rangeX[0]) {
                this.sketch.textSize(17);
                this.sketch.fill(255);

                if (i == -this.rangeX[0]) {
                    this.sketch.strokeWeight(1);
                    this.sketch.stroke(255)
                    this.sketch.line(this.unitX * i, 0, this.unitX * i, this.sketch.height);

                    this.sketch.noStroke();
                    this.sketch.textAlign(this.sketch.RIGHT, this.sketch.TOP);
                    this.sketch.text(Math.round(this.rangeX[0] + i).toString(), (this.unitX * i) - 10, (this.rangeY[1] * this.unitY) + 10);
                }
                // (((-this.rangeX[0] - i) % this.unitX).round(1) % 1 == 0 )
                else if ((this.rangeX[0] + i).round(5) % 1 == 0 ) {
                    this.sketch.strokeWeight(1);
                    this.sketch.stroke(50, 120, 180);
                    this.sketch.line(this.unitX * i, 0, this.unitX * i, this.sketch.height);

                    this.sketch.noStroke();
                    this.sketch.textAlign(this.sketch.CENTER, this.sketch.TOP);
                    this.sketch.text(Math.round(this.rangeX[0] + i).toString(), this.unitX * i, (this.rangeY[1] * this.unitY) + 10);
                }
                else {
                    this.sketch.strokeWeight(0.5);
                    this.sketch.stroke(50, 120, 180);
                    this.sketch.line(this.unitX * i, 0, this.unitX * i, this.sketch.height);
                }
                
                i += this.scale;
            }

            i = this.rangeY[0]/this.scale - parseInt(this.rangeY[0]/this.scale) > 0? 1 - (this.rangeY[0]/this.scale - parseInt(this.rangeY[0]/this.scale)) : -(this.rangeY[0]/this.scale - parseInt(this.rangeY[0]/this.scale));
            i *= this.scale;

            while(i <= this.rangeY[1] -  this.rangeY[0]) {
                
                if (i == -this.rangeY[0]) {
                    this.sketch.strokeWeight(1);
                    this.sketch.stroke(255);
                    this.sketch.line(0, this.sketch.height - (this.unitY * i), this.sketch.width, this.sketch.height - (this.unitY * i));
                }
                // (((-this.rangeY[0] - i) % this.unitY).round(1) % 1 == 0)
                else if ((-this.rangeY[0] - i).round(5) % 1 == 0) {
                    this.sketch.strokeWeight(1);
                    this.sketch.stroke(50, 120, 180);
                    this.sketch.line(0, this.sketch.height - (this.unitY * i), this.sketch.width, this.sketch.height - (this.unitY * i));
                    
                    this.sketch.noStroke();
                    this.sketch.textAlign(this.sketch.RIGHT, this.sketch.CENTER);
                    this.sketch.text(Math.round(this.rangeY[0] + i).toString(), (-this.rangeX[0] * this.unitX) - 10, this.sketch.height - (this.unitY * i));
                    
                }
                else {
                    this.sketch.strokeWeight(0.5);
                    this.sketch.stroke(50, 120, 180);
                    this.sketch.line(0, this.sketch.height - (this.unitY * i), this.sketch.width, this.sketch.height - (this.unitY * i));
                }
                i += this.scale;
            }
        }
    }

    plotGraph(f) {
        let x = this.rangeX[0];
        for (let i = this.rangeX[0]; i <= this.rangeX[1]; i += (this.rangeX[1] - this.rangeX[0])/10000) {
            this.sketch.strokeWeight(1);
            this.sketch.stroke(255);
            this.sketch.line((x - this.rangeX[0]) * this.unitX, (this.rangeY[1] - f(x)) * this.unitY, (i - this.rangeX[0]) * this.unitX, (this.rangeY[1] - f(i)) * this.unitY);
            x = i;
        }
    }
}

class Geom {
    static length(p1, p2 = new Vector([0, 0])) {
        let len = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
        return len;
    }
}