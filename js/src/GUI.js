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
    ctx.save();

    ctx.beginPath();

    let t = 0;

    while (t <= maxT) {
      let point = curve.sample(t);
      ctx.lineTo(point.x, point.y);
      t += sampleInterval;
    }

    ctx.stroke();

    if (drawInnerLines) {
      // Loop through each recursive iteration of point calculation
      for (let points of curve.innerPoints) {
        ctx.beginPath();

        // Draw lines
        for (let point of points) {
          ctx.lineTo(point.x, point.y);
        }

        ctx.stroke();
      }
    }

    ctx.restore();
  }

  /*
    drawBezierCurveLines: draws the lines that define the Bezier curve
    - curve
  */
  static drawBezierCurveLines(curve) {
    ctx.save();

    ctx.beginPath();

    for (let point of curve.points) {
      ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();

    ctx.restore();
  }
}
