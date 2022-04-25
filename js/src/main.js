const e = 0.000001; // For floating point errors

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

function animateLerp() {
  GUI.animateLerp(new Point(50, 50), new Point(150, 150));
}

function animateDoubleLerp() {
  GUI.animateDoubleLerp(
    new Point(50, 50),
    new Point(150, 150),
    new Point(250, 250)
  );
}

function animateBezier() {
  const curve = new BezierCurve([
    new Point(20, 180),
    new Point(50, 30),
    new Point(140, 50),
    new Point(200, 160)
  ]);

  GUI.animateBezierCurve(curve, drawLines=true);
}

function main() {
  animateDoubleLerp();
}

window.onload = () => {
  main();
}
