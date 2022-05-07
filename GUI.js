class GUI {
  /*
    drawBezierCurve: calculates position of a point every @sampleInterval at t
                     until @maxT, and join them together linearly
    - curve
    - sampleInterval
    - maxT
    - drawInnerLines: if true, draws inner lines used to construct point at
                      @maxT
  */
  static drawBezierCurve(curve, sampleInterval, maxT=1, drawInnerLines=false) {
    ctx.beginPath();

    let t = 0;

    while (t <= maxT) {
      let point = curve.sample(t);
      ctx.lineTo(point.x, point.y);
      t += sampleInterval;
    }

    ctx.stroke();
  }
}
