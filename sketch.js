let c = new Cartesian({});
// c.colorPallete = {
//     background : c.sketch.color(120, 150, 80),
//     axis : 30,
//     markings : 40,
//     grid : c.sketch.color(20, 60, 40)
// }
// c.gridAnimation.animate = true;
// let p1 = c.addPoint([1,2]);
// p1.style = "arrow";
// p1.moveWithMouse = true;
// let pl1 = c.addPlot((x) => {x ** 2});
// pl1.addPlotPoint(2);
// let sin = c.addPlot((x) => (Math.sin(x)));
// sin.color = c.sketch.color(235, 195, 52);
// sin.animation.animate = true;
// c.addPlot((x) => (1/x)).color = c.sketch.color(120, 150, 80);
// c.addPlot((x) => Math.sin(1/x)).color = c.sketch.color(170, 120, 240);

// let dirchlet = c.addPlot((x) => {
//     if(Calculus.isRational(x)) {
//         return 1;
//     }
//     else {
//         return 0;
//     }
// });
// dirchlet.style = "dot";
// dirchlet.analysisMode = true;

// let mdirchlet = c.addPlot((x) => {
//     if(Calculus.isRational(x)) {
//         return x;
//     }
//     else {
//         return 0;
//     }
// });
// mdirchlet.style = "dot";
// mdirchlet.analysisMode = true;

// let thomae = c.addPlot((x) => {
//     if(Calculus.isRational(x)) {
//         let frac = Calculus.fraction(x);
//         return 1/frac[1];
//     }
//     else {
//         return 0;
//     }
// });
// thomae.style = "dot";
// thomae.color = c.sketch.color(235, 195, 52);
// thomae.analysisMode = true;

// let weistrass = c.addPlot((x) => {
//     let sum = 0;
//     for ( let i = 0; i < 100; i++) {
//         sum += (0.5 ** i) * Math.cos((12 ** i) * Math.PI * x);
//     }
//     return sum;
// });


//[Math.PI, 0]
// let reimann = c.addPlot((x) => {
//     let sum = 0;
//     for ( let i = 1; i < 800; i++) {
//         sum += Math.sin((i ** 2) * x)/(i ** 2);
//     }
//     return sum;
// });

// c.setup(() => {

// });

c.draw(() => {
    // c.zoomToCenter(5, 2).then(() =>{
    //     c.panTo([0, 3], 0.5).then(() => {
    //         c.zoomToCenter(-5, 20).then(() => {
                
    //         });
    //     }, 2);
    // }, 2);

    // p.slideTo(-3, 2).then(() => {
    //     p.slideTo(1, 2);
    // }, 10);

    // sin.animation.then(() => {
    //     c.zoomToCenter(1, 2);
    // });

    // c.zoomToCenter(1, 2).then(() => {
    //     c.scale = 0.0625;
    //     c.zoomToCenter(1, 2).then(() => {
    //         c.scale = 0.015625;
    //         c.zoomToCenter(1, 2);
    //     });
    // });
});


