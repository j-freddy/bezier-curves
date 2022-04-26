const data = {
  lineWidth: 2,
  thickLineWidth: 3,
  circleRadius: 3,
  
  colourPrimary: "#343a40",
  colourSecondary: "#fd7e14",
  colourTertiary: "#20c997",
  
  deltaTime: 0.02,
  fps: 24
}

class MyGif {
  static snapshotCanvas() {
    // Save canvas pixels to gif
    // gif.addFrame(ctx, {copy: true}); // Doesn't work
    let snapshot = new Image();
    snapshot.src = canvas.toDataURL();
    myGif.addFrame(snapshot, {delay: 1/data.fps});
  }

  static showGif() {
    myGif.on("finished", blob => {
      window.open(URL.createObjectURL(blob));
    });

    myGif.render();
  }
}
  
class GUI {
  static drawPoint(point) {
    ctx.save();

    ctx.fillStyle = data.colourPrimary;

    ctx.beginPath();
    ctx.arc(point.x, point.y, data.circleRadius, 0, 2*Math.PI);
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
      ctx.lineWidth = data.thickLineWidth;
      ctx.strokeStyle = data.colourSecondary;

    } else {
      ctx.lineWidth = data.lineWidth;
      ctx.strokeStyle = data.colourPrimary;
    }

    ctx.beginPath();
    ctx.lineTo(pointOne.x, pointOne.y);
    ctx.lineTo(pointEnd.x, pointEnd.y);
    ctx.stroke();

    ctx.restore();

    return pointEnd;
  }

  static drawPrettyLerp(pointOne, pointTwo, t=1) {
    GUI.drawLerp(pointOne, pointTwo);              // Draw base line
    const pointEnd
      = GUI.drawLerp(pointOne, pointTwo, t, true); // Draw lerp overlay
    GUI.drawPoint(pointOne);                       // Draw points
    GUI.drawPoint(pointTwo);
    GUI.drawPoint(pointEnd);
  }

  /*
    animateLerp: animates lerp drawing from t=@t to t=1
    - pointOne: start of lerp
    - pointTwo: end of lerp
    - deltaTime: specifies change in @t per iteration
    - t: t value of starting point of lerp
  */
  static animateLerp(pointOne, pointTwo, deltaTime=data.deltaTime, t=0) {
    if (t >= 1 + e) {
      MyGif.showGif();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    GUI.drawPrettyLerp(pointOne, pointTwo, t);

    MyGif.snapshotCanvas();

    window.requestAnimationFrame(() => {
      GUI.animateLerp(pointOne, pointTwo, deltaTime, t + deltaTime);
    });
  }

  static animateDoubleLerp(pointOne, pointTwo, pointThree,
                           deltaTime=data.deltaTime, t=0) {
    if (t >= 1 + e) {
      MyGif.showGif();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    GUI.drawPrettyLerp(pointOne, pointTwo, t);
    GUI.drawPrettyLerp(pointTwo, pointThree, t);

    MyGif.snapshotCanvas();

    window.requestAnimationFrame(() => {
      GUI.animateDoubleLerp(pointOne, pointTwo, pointThree, deltaTime,
                            t + deltaTime);
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

    ctx.lineWidth = data.thickLineWidth;
    ctx.strokeStyle = data.colourSecondary;

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

      ctx.lineWidth = data.lineWidth;
      ctx.strokeStyle = data.colourTertiary;

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

    ctx.lineWidth = data.lineWidth;
    ctx.strokeStyle = data.colourPrimary;

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
  static animateBezierCurve(curve, drawLines=false, deltaTime=data.deltaTime,
                            t=0) {
    if (t >= 1 + e) {
      MyGif.showGif();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (drawLines) {
      GUI.drawBezierCurveLines(curve);
    }

    GUI.drawBezierCurve(curve, deltaTime, t, drawLines);

    MyGif.snapshotCanvas();

    window.requestAnimationFrame(() => {
      GUI.animateBezierCurve(curve, drawLines, deltaTime, t + deltaTime);
    });
  }
}
