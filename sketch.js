
const s = ( sketch ) => {


  sketch.setup = () => {
    sketch.createCanvas(600, 600);
    c = new Cartesian({sketch, rangeX : [-3, 3], rangeY : [2, 8]});
    c.drawPlane();
  };

  sketch.draw = () => {
    // c.zoomToCenter(1, 2, null).then(() => {
    //   c.panTo([2,1]);
    // });
    // c.panTo([0, 12]).then(() => {
    //   c.zoomToCenter(1, 2, null)
    // });
    // c.zoomToCenter(2, 2);
    // c.panTo([12, 0], 0.3);
    c.drawPlane();
  };
};

// if you want to zoom and pan simultaneously 
// 1. always zoom first and then pan
// 2. speed of pan should always be greater than or equal to speed of zoom -- not needed anymore

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