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
// let sin = c.addPlot((x) => (Math.sin(1/x)));
// sin.color = c.sketch.color(235, 195, 52);
// sin.animation.animate = true;

// let cir = c.addParametricPlot([0, 2 * Math.PI], (t) => {
//     return [2 * Math.cos(t), 2 * Math.sin(t)];
// });
// cir.color = c.sketch.color(235, 195, 52);
// cir.animation.animate = true;

// let heart = c.addPlot((x) => {
//     return ((Math.abs(x) ** (2/3)) + (((3.3 - (x ** 2)) ** 0.5) * Math.sin(1 * Math.PI * x)));
// });
// heart.color = c.sketch.color(235, 195, 52);
// // heart.animation.animate = true;
// heart.data.push(1);

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

c.setup(() => {

});

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

    // c.zoomToCenter(1, 5).then(() => {
    //     c.scale = 0.125;
    //     c.zoomToCenter(1, 5).then(() => {
    //         c.scale = 0.0625;
    //         c.zoomToCenter(1, 2);
    //     });
    // });

    // c.zoomToCenter();
    // heart.data[0] += 0.01;
    // heart.func = (x) => {
    //     return ((Math.abs(x) ** (2/3)) + (((3.3 - (x ** 2)) ** 0.5) * Math.sin(heart.data[0] * Math.PI * x)));
    // };
});


// const btn = document.querySelector('button'),
//   chunks = [];

// function record() {
//   chunks.length = 0;
//   let stream = document.querySelector('canvas').captureStream(30),
//   recorder = new MediaRecorder(stream);
//   recorder.ondataavailable = e => {
//     if (e.data.size) {
//       chunks.push(e.data);
//     }
//   };
//   recorder.onstop = exportVideo;
//   btn.onclick = e => {
//     recorder.stop();
//     btn.textContent = 'start recording';
//     btn.onclick = record;
//   };
//   recorder.start();
//   btn.textContent = 'stop recording';
// }

// function exportVideo(e) {
//   var blob = new Blob(chunks);
//   var vid = document.createElement('video');
//   vid.id = 'recorded'
//   vid.controls = true;
//   vid.src = URL.createObjectURL(blob);
//   document.body.appendChild(vid);
//   vid.play();
// }
// btn.onclick = record;