const gui = {
  lineWidth: 2,
  thickLineWidth: 3,
  circleRadius: 3,

  colourPrimary: "#000",
  colourSecondary: "#ff0000",
  colourTertiary: "#00ff00",
  
  deltaTime: 0.005
}

class GUI {
  static drawPoint(point) {
    ctx.save();

    ctx.fillStyle = gui.colourPrimary;

    ctx.beginPath();
    ctx.arc(point.x, point.y, gui.circleRadius, 0, 2*Math.PI);
    ctx.fill();

    ctx.restore();
  }

  static drawPoints(points) {
    for (let point of points) {
      GUI.drawPoint(point);
    }
  }

  /*
    drawLerp: draw a line that connects @pointOne to @pointTwo, or draw a line
              partially from @pointOne, with the fraction specified by @t
    - pointOne
    - pointTwo
    - t
    - overlay: if set to true, use a different style
    - return: end point of lerp
  */
  static drawLerp(pointOne, pointTwo, t=1, overlay=false) {
    const pointEnd = pointOne.lerpWithPoint(pointTwo, t);

    ctx.save();

    if (overlay) {
      ctx.lineWidth = gui.thickLineWidth;
      ctx.strokeStyle = gui.colourSecondary;

    } else {
      ctx.lineWidth = gui.lineWidth;
      ctx.strokeStyle = gui.colourPrimary;
    }

    ctx.beginPath();
    ctx.lineTo(pointOne.x, pointOne.y);
    ctx.lineTo(pointEnd.x, pointEnd.y);
    ctx.stroke();

    ctx.restore();

    return pointEnd;
  }

  /*
    animateLerp: animates lerp drawing from t=@t to t=1
    - pointOne: start of lerp
    - pointTwo: end of lerp
    - deltaTime: specifies change in @t per iteration
    - t: t value of starting point of lerp
  */
  static animateLerp(pointOne, pointTwo, deltaTime=gui.deltaTime, t=0) {
    if (t >= 1 + e) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    GUI.drawLerp(pointOne, pointTwo);              // Draw base line
    const pointEnd
      = GUI.drawLerp(pointOne, pointTwo, t, true); // Draw lerp overlay
    GUI.drawPoint(pointOne);                       // Draw points
    GUI.drawPoint(pointTwo);
    GUI.drawPoint(pointEnd);

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

    ctx.lineWidth = gui.thickLineWidth;
    ctx.strokeStyle = gui.colourSecondary;

    if (drawInnerLines) {
      // Draw construction lines
      drawInnerLines();
    }

    ctx.beginPath();

    let t = 0;

    // Draw Bezier curve
    while (t <= maxT) {
      let point = curve.sample(t);
      ctx.lineTo(point.x, point.y);
      t += sampleInterval;
    }

    ctx.stroke();

    ctx.restore();

    function drawInnerLines() {
      ctx.save();

      ctx.lineWidth = gui.lineWidth;
      ctx.strokeStyle = gui.colourTertiary;

      // Loop through each recursive iteration of point calculation
      for (let points of curve.innerPoints) {
        ctx.beginPath();

        // Draw lines
        for (let point of points) {
          ctx.lineTo(point.x, point.y);
        }

        ctx.stroke();

        // Draw points
        GUI.drawPoints(points);
      }

      ctx.restore();
    }
  }

  /*
    drawBezierCurveLines: draws the lines that define the Bezier curve
    - curve
  */
  static drawBezierCurveLines(curve) {
    ctx.save();

    ctx.lineWidth = gui.lineWidth;
    ctx.strokeStyle = gui.colourPrimary;

    ctx.beginPath();

    for (let point of curve.points) {
      ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();

    ctx.restore();

    // Draw points
    GUI.drawPoints(curve.points);
  }

  /*
    animateBezierCurve: animates Bezier curve drawing from t=@t to t=1
    - curve
    - drawLines: if true, draws construction lines
    - deltaTime: specifies change in @t per iteration
    - t: t value of starting point of Bezier curve
  */
  static animateBezierCurve(curve, drawLines=false, deltaTime=gui.deltaTime,
                            t=0) {
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
