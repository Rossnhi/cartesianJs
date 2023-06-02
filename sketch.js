let c = new Cartesian({});
c.draw(() => {
    c.zoomToCenter(1, 2).then(() =>{
        c.panTo([0, 3]).then(() => {
            c.zoomToCenter(-1, 10);
        });
    });
});