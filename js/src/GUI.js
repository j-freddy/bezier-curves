class GUI {
  static drawLerp(pointOne, pointTwo, t=1, colourRed=false) {
    const pointEnd = pointOne.lerpWithPoint(pointTwo, t);

    ctx.save();

    if (colourRed) {
      ctx.strokeStyle = "#ff0000";
    }

    ctx.beginPath();
    ctx.lineTo(pointOne.x, pointOne.y);
    ctx.lineTo(pointEnd.x, pointEnd.y);
    ctx.stroke();

    ctx.restore();
  }

  static animateLerp(pointOne, pointTwo, deltaTime=0.01, t=0) {
    if (t >= 1 + e) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    GUI.drawLerp(pointOne, pointTwo, 1);
    GUI.drawLerp(pointOne, pointTwo, t, true);

    window.requestAnimationFrame(() => {
      GUI.animateLerp(pointOne, pointTwo, deltaTime, t + deltaTime)
    });
  }

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

  /*
    animateBezierCurve: animates Bezier curve drawing from t=@tStart to t=1
    - curve
    - drawLines: if true, draws construction lines
    - tStart: t value of starting point of Bezier curve
  */
  static animateBezierCurve(curve, drawLines=false, deltaTime=0.01, t=0) {
    if (t >= 1 + e) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (drawLines) {
      GUI.drawBezierCurveLines(curve);
    }

    GUI.drawBezierCurve(curve, deltaTime, t, drawLines);

    window.requestAnimationFrame(() => {
      GUI.animateBezierCurve(curve, drawLines, deltaTime, t + deltaTime)
    });
  }
}
