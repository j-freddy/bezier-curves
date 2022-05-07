const e = 0.000001; // For floating point errors
const SAMPLE_INTERVAL = 0.01;

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

const curve = new BezierCurve([
  new Point(40, 210),
  new Point(60, 40),
  new Point(150, 55),
  new Point(260, 190)
]);

function drawCurve() {
  GUI.drawBezierCurveLines(curve);
  GUI.drawBezierCurve(curve, SAMPLE_INTERVAL);
}

function updateCanvas() {
  GUI.clear();
  drawCurve();
}

window.addEventListener("load", drawCurve);

// Interactive Bezier curves

draggedPoints = [];

canvas.addEventListener("mousedown", e => {
  for (point of curve.points) {
    // TODO refactor
    // Select 1st point close to cursor
    let distFromCursor
      = Math.sqrt((point.x - e.offsetX)**2 + (point.y - e.offsetY)**2);

    if (distFromCursor < 28) {
      draggedPoints.push(point);
      break;
    }
  }

  if (draggedPoints == []) {
    return;
  }

  // TODO duplicate code
  for (point of draggedPoints) {
    point.x = e.offsetX;
    point.y = e.offsetY;
  }

  // Update GUI
  updateCanvas();
});

canvas.addEventListener("mouseup", () => {
  draggedPoints = [];
});

canvas.addEventListener("mousemove", e => {
  for (point of draggedPoints) {
    point.x = e.offsetX;
    point.y = e.offsetY;
  }

  // Update GUI
  updateCanvas();
});
