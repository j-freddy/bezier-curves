const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

function main() {
  const curve = new BezierCurve([
    new Point(20, 180),
    new Point(25, 10),
    new Point(140, 10),
    new Point(145, 160)
  ]);

  GUI.drawBezierCurveLines(curve);
  GUI.drawBezierCurve(curve, 1/100, 1);
}

window.onload = () => {
  main();
}
