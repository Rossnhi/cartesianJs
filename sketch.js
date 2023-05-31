
const s = ( sketch ) => {


  sketch.setup = () => {
    sketch.createCanvas(600, 600);
    c = new Cartesian({sketch});
    c.drawPlane();
  };

  sketch.draw = () => {
    //c.zoomToCenter(2, [-0.5, 0.5]);
    c.zoomToCenter( 1, null, 1.5);
    c.panTo([0, 12]);
    c.drawPlane();
  };
};

// if you want to zoom and pan simultaneously 
// 1. always zoom first and then pan
// 2. speed of pan should always be greater than or equal to speed of zoom 

const s2 = ( sketch ) => {

  let x = 100;
  let y = 100;

  let p;

  sketch.setup = () => {
    sketch.createCanvas(600, 600);
    p = new Plane(sketch);
    p.drawPlane();
    p.plotGraph((x) => (Math.cos(1/x)));

  };

  sketch.draw = () => {
    //  sketch.background(30);
    //  p.rangeX = [p.rangeX[0] /= 1.01, p.rangeX[1] /= 1.01];
    //  p.rangeY = [p.rangeY[0] /= 1.01, p.rangeY[1] /= 1.01];
    //  p.unitY = sketch.height / (p.rangeY[1] - p.rangeY[0]);
    //  p.unitX = sketch.height / (p.rangeX[1] - p.rangeX[0]);
    //  p.drawPlane();
    //  p.plotGraph((x) => Math.cos(1/x));
  };
};
let myp5 = new p5(s);
let myp52 = new p5(s2);