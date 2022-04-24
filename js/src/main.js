const e = 0.000001; // For floating point errors

const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

function lerpAnimation() {
  GUI.animateLerp(new Point(20, 180), new Point(25, 10));
}

function main() {
  lerpAnimation();

  // const curve = new BezierCurve([
  //   new Point(20, 180),
  //   new Point(25, 10),
  //   new Point(140, 10),
  //   new Point(145, 160)
  // ]);

  // GUI.animateBezierCurve(curve, drawLines=true);
}

window.onload = () => {
  main();
}
