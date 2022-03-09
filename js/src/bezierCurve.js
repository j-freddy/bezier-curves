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
