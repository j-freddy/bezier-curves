class GUI {
  /*
    drawBezierCurve: takes @numSamples values of t uniformly distributed between
                     0 and 1, calculate the point at each t and join them
                     together linearly
    - curve
    - numSamples
  */
  static drawBezierCurve(curve, numSamples) {
    ctx.save();

    ctx.beginPath();
    let point = curve.sample(0);
    ctx.moveTo(point.x, point.y);

    for (let i = 1; i < numSamples; i++) {
      point = curve.sample(i / (numSamples - 1));
      ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();

    ctx.restore();
  }
}
