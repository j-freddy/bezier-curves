class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /*
    lerp: linear interpolates between @x (start) and @y (end)
    - x: float
    - y: float
    - t: value between 0 and 1 inclusive
  */
  lerp(x, y, t) {
    return (1 - t) * x + t * y
  }

  /*
    lerpWithPoint: linear interpolates between this pointer and @other
    - other: other point
    - t: value between 0 and 1 inclusive
  */
  lerpWithPoint(other, t) {
    return new Point(
      this.lerp(this.x, other.x, t),
      this.lerp(this.y, other.y, t)
    );
  }
}

class BezierCurve {
  constructor(points) {
    this.points = points;
  }

  /*
    sample: calculates the position of a point along the bezier curve
    - t: value between 0 and 1 inclusive (lerp value)
  */
  sample(t) {
    let points = this.points;

    // Repeat until we get the point
    while (points.length > 1) {
      let nextPoints = [];
      
      // Calculate new point as lerp between 2 points
      for (let i = 0; i < points.length - 1; i++) {
        nextPoints.push(points[i].lerpWithPoint(points[i+1], t));
      }

      points = nextPoints;
    }

    return points[0];
  }
}

function main() {
  const curve = new BezierCurve([
    new Point(20, 180),
    new Point(25, 10),
    new Point(140, 10),
    new Point(145, 160)
  ]);

  // Draw curve
  let samples = 100;

  ctx.beginPath();
  let point = curve.sample(0);
  ctx.moveTo(point.x, point.y);

  for (let i = 1; i < samples; i++) {
    point = curve.sample(i / (samples - 1));
    ctx.lineTo(point.x, point.y);
  }
  
  ctx.stroke();
}

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

window.onload = () => {
  console.log("Hello world!");
  main();
}
