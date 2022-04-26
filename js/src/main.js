const e = 0.000001; // For floating point errors

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

// Make a GIF
const myGif = new GIF({
  workers: 2,
  quality: 4,
  background: "#fff",
  repeat: 0
});

function main() {
  // animateLerp();
  // animateDoubleLerp();
  // animateQuadraticBezier();
  // animateBezier();
  animateBezierLoop();
}

window.onload = () => {
  main();
}

function animateLerp() {
  GUI.animateLerp(
    new Point(70, 40),
    new Point(230, 200)
  );
}

function animateDoubleLerp() {
  GUI.animateDoubleLerp(
    new Point(40, 200),
    new Point(155, 40),
    new Point(260, 200)
  );
}

function animateQuadraticBezier() {
  const curve = new BezierCurve([
    new Point(40, 200),
    new Point(155, 40),
    new Point(260, 200)
  ]);

  GUI.animateBezierCurve(curve, drawLines=true);
}

function animateBezier() {
  const curve = new BezierCurve([
    new Point(40, 210),
    new Point(60, 40),
    new Point(150, 55),
    new Point(260, 190)
  ]);

  GUI.animateBezierCurve(curve, drawLines=true);
}

function animateBezierLoop() {
  const curve = new BezierCurve([
    new Point(220, 80),
    new Point(40, 210),
    new Point(50, 40),
    new Point(270, 140)
  ]);

  GUI.animateBezierCurve(curve, drawLines=true);
}
