let c = new Cartesian({});
// c.colorPallete = {
//     background : c.sketch.color(120, 150, 80),
//     axis : 30,
//     markings : 40,
//     grid : c.sketch.color(20, 60, 40)
// }

// let p1 = c.addPoint([1,2]);
// p1.style = "arrow";
// p1.moveWithMouse = true;

// let pl = c.addPlot((x) => ((x/2) ** 2));
let pl1 = c.addPlot((x) => (Math.sin(x ** 2)));
p = pl1.addPlotPoint(2);
// c.addPlot((x) => (1/x)).color = c.sketch.color(120, 150, 80);
// c.addPlot((x) => Math.sin(1/x)).color = c.sketch.color(170, 120, 240);

c.setup(() => {

});

c.draw(() => {
    c.zoomToCenter(5, 2).then(() =>{
        c.panTo([0, 3], 0.5).then(() => {
            c.zoomToCenter(-5, 20).then(() => {
                
            });
        }, 2);
    }, 2);
    p.slideTo(-3, 2).then(() => {
        p.slideTo(1, 2);
    }, 10);
});