// js/main.js

// ==========================
// Helpers (retina-ready)
// ==========================
function setupCanvas(canvas, cssSize = 320) {
  const dpr = window.devicePixelRatio || 1;

  canvas.style.width = cssSize + "px";
  canvas.style.height = cssSize + "px";

  canvas.width = Math.floor(cssSize * dpr);
  canvas.height = Math.floor(cssSize * dpr);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.clearRect(0, 0, cssSize, cssSize);

  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";

  return ctx;
}

function resetInk(ctx) {
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
}

// ==========================
// 1) FORMA RECTANGULAR
// ==========================
function drawFormaRectangular(ctx) {
  resetInk(ctx);
  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
}

// ==========================
// 2) DIBUJAR TRAZADOS
// ==========================
function drawDibujarTrazados(ctx) {
  resetInk(ctx);
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}

// ==========================
// 3) MOVER LA PLUMA
// ==========================
function drawMoverLaPluma(ctx) {
  resetInk(ctx);
  ctx.beginPath();

  ctx.arc(150, 150, 90, 0, Math.PI * 2, true);

  ctx.moveTo(210, 150);
  ctx.arc(150, 150, 60, 0, Math.PI, false);

  ctx.moveTo(130, 130);
  ctx.arc(120, 130, 10, 0, Math.PI * 2, true);

  ctx.moveTo(190, 130);
  ctx.arc(180, 130, 10, 0, Math.PI * 2, true);

  ctx.stroke();
}

// ==========================
// 4) LÍNEAS
// ==========================
function drawLineas(ctx) {
  resetInk(ctx);

  ctx.beginPath();
  ctx.moveTo(30, 30);
  ctx.lineTo(180, 30);
  ctx.lineTo(30, 180);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(250, 250);
  ctx.lineTo(250, 120);
  ctx.lineTo(120, 250);
  ctx.closePath();
  ctx.stroke();
}

// ==========================
// 5) ARCOS
// ==========================
function drawArcos(ctx) {
  resetInk(ctx);
  ctx.save();
  ctx.translate(30, 30);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();
      const x = 30 + j * 85;
      const y = 30 + i * 75;
      const r = 26;
      const end = Math.PI + (Math.PI * j) / 2;
      const ccw = i % 2 !== 0;

      ctx.arc(x, y, r, 0, end, ccw);
      if (i > 1) ctx.fill();
      else ctx.stroke();
    }
  }

  ctx.restore();
}

// ==========================
// 6) CURVAS CUADRÁTICAS
// ==========================
function drawCurvasCuadraticas(ctx) {
  ctx.save();
  resetInk(ctx);
  ctx.lineWidth = 7;

  ctx.translate(20, 20);
  ctx.scale(2.2, 2.2);

  ctx.beginPath();
  ctx.moveTo(75, 25);
  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  ctx.stroke();

  ctx.restore();
}

// ==========================
// 7) CURVAS CÚBICAS BÉZIER
// ==========================
function drawCurvasCubicasBezier(ctx) {
  resetInk(ctx);
  ctx.save();
  ctx.translate(20, 10);
  ctx.scale(2, 2);

  ctx.beginPath();
  ctx.moveTo(75, 40);
  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  ctx.bezierCurveTo(130, 25, 100, 25, 100, 25);
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  ctx.fill();

  ctx.restore();
}

// ==========================
// 8) RECTÁNGULOS REDONDEADOS
// (CORREGIDO – igual al ejemplo)
// ==========================
function drawRectangulos(ctx) {
  ctx.save();

  const BASE = 150;
  const SIZE = 320;
  const scale = SIZE / BASE;

  ctx.scale(scale, scale);
  ctx.lineWidth = 1 / scale;
  ctx.lineJoin = "miter";
  ctx.lineCap = "butt";
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";

  roundedRect(ctx, 12, 12, 150, 150, 15);
  roundedRect(ctx, 19, 19, 150, 150, 9);
  roundedRect(ctx, 53, 53, 49, 33, 10);
  roundedRect(ctx, 53, 119, 49, 16, 6);
  roundedRect(ctx, 135, 53, 49, 33, 10);
  roundedRect(ctx, 135, 119, 25, 49, 10);

  ctx.beginPath();
  ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
  ctx.lineTo(31, 37);
  ctx.fill();

  for (let i = 0; i < 8; i++) ctx.fillRect(51 + i * 16, 35, 4, 4);
  for (let i = 0; i < 6; i++) ctx.fillRect(115, 51 + i * 16, 4, 4);
  for (let i = 0; i < 8; i++) ctx.fillRect(51 + i * 16, 99, 4, 4);

  ctx.beginPath();
  ctx.moveTo(83, 116);
  ctx.lineTo(83, 102);
  ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
  ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
  ctx.lineTo(111, 116);
  ctx.lineTo(106.333, 111.333);
  ctx.lineTo(101.666, 116);
  ctx.lineTo(97, 111.333);
  ctx.lineTo(92.333, 116);
  ctx.lineTo(87.666, 111.333);
  ctx.lineTo(83, 116);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(91, 96);
  ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
  ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
  ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
  ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);

  ctx.moveTo(103, 96);
  ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
  ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
  ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
  ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
  ctx.fill();

  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(101, 102, 2, 0, Math.PI * 2);
  ctx.arc(89, 102, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x, y + r);
  ctx.arcTo(x, y + h, x + r, y + h, r);
  ctx.arcTo(x + w, y + h, x + w, y + h - r, r);
  ctx.arcTo(x + w, y, x + w - r, y, r);
  ctx.arcTo(x, y, x, y + r, r);
  ctx.closePath();
  ctx.stroke();
}

// ==========================
// 9) Path2D
// ==========================
function drawPath2D(ctx) {
  resetInk(ctx);

  const rect = new Path2D();
  rect.rect(30, 60, 120, 120);

  const circ = new Path2D();
  circ.arc(260, 120, 60, 0, Math.PI * 2);

  ctx.stroke(rect);
  ctx.fill(circ);
}

// ==========================
// Render
// ==========================
const CANVAS_SIZE = 320;

function renderAll() {
  const items = [
    ["cv_rect", drawFormaRectangular],
    ["cv_trazados", drawDibujarTrazados],
    ["cv_pluma", drawMoverLaPluma],
    ["cv_lineas", drawLineas],
    ["cv_arcos", drawArcos],
    ["cv_quad", drawCurvasCuadraticas],
    ["cv_bezier", drawCurvasCubicasBezier],
    ["cv_round", drawRectangulos],
    ["cv_path2d", drawPath2D],
  ];

  items.forEach(([id, draw]) => {
    const canvas = document.getElementById(id);
    const ctx = setupCanvas(canvas, CANVAS_SIZE);
    draw(ctx);
  });
}

renderAll();

document.getElementById("btnRedibujar").addEventListener("click", renderAll);

window.addEventListener("resize", () => {
  clearTimeout(window.__cv_resize);
  window.__cv_resize = setTimeout(renderAll, 150);
});
