
const s = ( sketch ) => {


  sketch.setup = () => {
    sketch.createCanvas(600, 600);
    c = new Cartesian({sketch, rangeX : [-5, 5], rangeY : [-5, 5]});
    c.drawPlane();
  };

  sketch.draw = () => {
    // c.zoomToCenter(1, 2, null).then(() => {
    //   c.panTo([2,1]);2
    // });

    // c.panTo([0, 12]).then(() => {
    //   c.zoomToCenter(1, 2, null)
    // });

    // c.panTo([12, 0], 0.5);
    // c.zoomToCenter();

    // c.panTo([12, 0], 0.5).tillThen(() => {
    //   c.zoomToCenter();
    // });

    // c.panTo([8, 2]).then(() => {
    //   c.panTo([-3, 6]).then(() => {
    //     c.panTo([0, 0]).then(() => {
    //       c.zoomToCenter(1, 2);
    //     });
    //   });
    // });

    // c.zoomToCenter(1, 2).then(() => {
    //   c.panTo([3, 1]).then(() => {
    //     c.panTo([0, -4], 0.5).tillThen(() => {
    //       c.zoomToCenter(-1, 20);
    //     });
    //   });
    // });

    // c.zoomToCenter().then(() => {
    //   c.panTo([4,0]);
    // });

    c.drawPlane();
  };
};

// if you want to zoom and pan simultaneously 
// 1. always zoom first and then pan -- not needed anymore
// 2. speed of pan should always be greater than or equal to speed of zoom -- not needed anymore

let myp5 = new p5(s);