#!/usr/bin/env node
'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const W = 612;   // US Letter width (points = 8.5 in)
const H = 792;   // US Letter height (points = 11 in)
const M = 50;    // Page margin

const OUT = path.join(__dirname, '../public/coloring-pages');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ─── UTILITY ─────────────────────────────────────────────────────────────────

function createDoc() {
  return new PDFDocument({ size: 'LETTER', autoFirstPage: false, margin: 0 });
}

function writeDoc(doc, filename) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(path.join(OUT, filename));
    ws.on('finish', resolve);
    ws.on('error', reject);
    doc.pipe(ws);
  });
}

function border(doc) {
  doc.save()
     .strokeColor('#000').lineWidth(2.8)
     .rect(M, M, W - 2 * M, H - 2 * M).stroke()
     .lineWidth(0.8)
     .rect(M + 9, M + 9, W - 2 * M - 18, H - 2 * M - 18).stroke()
     .restore();
}

function title(doc, text, y = M + 16) {
  doc.font('Helvetica-Bold').fontSize(20).fillColor('#000')
     .text(text, M + 12, y, { width: W - 2 * M - 24, align: 'center' });
}

function subtitle(doc, text, y = M + 46) {
  doc.font('Helvetica-Oblique').fontSize(9.5).fillColor('#555')
     .text(text, M + 12, y, { width: W - 2 * M - 24, align: 'center' });
}

function footer(doc) {
  doc.font('Helvetica').fontSize(7).fillColor('#aaa')
     .text('HummingbirdWatcher.com  •  Printable Coloring Page', 0, H - M - 8,
           { width: W, align: 'center' });
}

function factBox(doc, heading, bullets) {
  const bx = M + 14, by = H - M - 110, bw = W - 2 * M - 28, bh = 102;
  doc.save()
     .fillColor('#fafafa').strokeColor('#ccc').lineWidth(0.8)
     .roundedRect(bx, by, bw, bh, 6).fillAndStroke()
     .restore();
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#000')
     .text(heading, bx + 10, by + 7, { width: bw - 20 });
  doc.font('Helvetica').fontSize(7.5).fillColor('#222');
  bullets.slice(0, 4).forEach((b, i) => {
    doc.text('• ' + b, bx + 10, by + 20 + i * 19, { width: bw - 20 });
  });
}

// Draw a coloring instruction line
function coloringLine(doc, y = M + 68) {
  doc.font('Helvetica').fontSize(8).fillColor('#777')
     .text('Color me!  →  Print on white paper  |  Use colored pencils, markers, or crayons',
           M + 12, y, { width: W - 2 * M - 24, align: 'center' });
}

// Horizontal dashed divider
function divider(doc, y) {
  doc.save().strokeColor('#ccc').lineWidth(0.6).dash(4, { space: 4 })
     .moveTo(M + 20, y).lineTo(W - M - 20, y).stroke().undash().restore();
}

// ─── DRAWING HELPERS ─────────────────────────────────────────────────────────

// Draw a leaf from (bx,by) toward (tx,ty) with given half-width
function leaf(doc, bx, by, tx, ty, w = 10, lw = 1.2) {
  const dx = tx - bx, dy = ty - by;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const m1x = bx + dx * 0.45 + nx * w;
  const m1y = by + dy * 0.45 + ny * w;
  const m2x = bx + dx * 0.45 - nx * w;
  const m2y = by + dy * 0.45 - ny * w;
  doc.save().fillColor('#fff').strokeColor('#000').lineWidth(lw)
     .moveTo(bx, by)
     .bezierCurveTo(m1x, m1y, tx + nx, ty + ny, tx, ty)
     .bezierCurveTo(tx - nx, ty - ny, m2x, m2y, bx, by)
     .fillAndStroke()
     .moveTo(bx, by).lineTo(tx, ty)
     .lineWidth(lw * 0.55).stroke()
     .restore();
}

// Draw a pointed petal centered at angle `a` around (cx,cy), from innerR to outerR
function petal(doc, cx, cy, innerR, outerR, a, hw = 8, lw = 0.9) {
  const cos = Math.cos(a), sin = Math.sin(a);
  const pc = Math.cos(a + Math.PI / 2), ps = Math.sin(a + Math.PI / 2);
  const bx = cx + innerR * cos, by = cy + innerR * sin;
  const tx = cx + outerR * cos, ty = cy + outerR * sin;
  const mid = (innerR + outerR) / 2;
  const lx = cx + mid * cos + hw * pc, ly = cy + mid * sin + hw * ps;
  const rx = cx + mid * cos - hw * pc, ry = cy + mid * sin - hw * ps;
  doc.save().fillColor('#fff').strokeColor('#000').lineWidth(lw)
     .moveTo(bx, by)
     .bezierCurveTo(lx, ly, tx + pc * 2, ty + ps * 2, tx, ty)
     .bezierCurveTo(tx - pc * 2, ty - ps * 2, rx, ry, bx, by)
     .fillAndStroke()
     .restore();
}

// Draw a ring of petals
function petalRing(doc, cx, cy, innerR, outerR, count, hw, lw, angleOffset = 0) {
  for (let i = 0; i < count; i++) {
    const a = angleOffset + (i / count) * Math.PI * 2;
    petal(doc, cx, cy, innerR, outerR, a, hw, lw);
  }
}

// Draw a trumpet vine flower cluster at (cx,cy)
function trumpetVine(doc, cx, cy, s = 1.0) {
  doc.save();
  // Main stem
  doc.strokeColor('#000').lineWidth(2 * s).fillColor('#fff');
  doc.moveTo(cx, cy + 70 * s)
     .bezierCurveTo(cx - 8 * s, cy + 40 * s, cx + 6 * s, cy + 15 * s, cx, cy)
     .stroke();

  // Leaves off stem
  leaf(doc, cx - 2 * s, cy + 55 * s, cx - 32 * s, cy + 35 * s, 9 * s, 1.2 * s);
  leaf(doc, cx + 2 * s, cy + 40 * s, cx + 30 * s, cy + 22 * s, 9 * s, 1.2 * s);
  leaf(doc, cx - 1 * s, cy + 22 * s, cx - 28 * s, cy + 8 * s, 8 * s, 1.2 * s);

  // 3 trumpet flowers fanning upward
  const flowers = [
    { ox: -18 * s, oy: -10 * s, rot: -0.4 },
    { ox: 0,        oy: -26 * s, rot: 0   },
    { ox: 18 * s,  oy: -10 * s, rot: 0.4 },
  ];

  flowers.forEach(({ ox, oy, rot }) => {
    const fx = cx + ox, fy = cy + oy;
    const cos = Math.cos(rot), sin = Math.sin(rot);
    doc.strokeColor('#000').lineWidth(1.5 * s);
    // Tube (two converging lines)
    doc.moveTo(fx - 5 * s, fy + 20 * s)
       .lineTo(fx - 10 * s * cos - 0, fy + 0).stroke();
    doc.moveTo(fx + 5 * s, fy + 20 * s)
       .lineTo(fx + 10 * s * cos,     fy + 0).stroke();
    // Petals at opening (5 lobes)
    for (let k = 0; k < 5; k++) {
      const pa = rot + (k / 5) * Math.PI * 2;
      const px = fx + Math.cos(pa) * 15 * s;
      const py = fy + Math.sin(pa) * 15 * s;
      doc.fillColor('#fff').lineWidth(1.2 * s)
         .ellipse(
           (fx + px) / 2,
           (fy + py) / 2,
           6 * s, 10 * s
         ).fillAndStroke();
    }
  });

  doc.restore();
}

// Draw a bee balm flower at (cx,cy)
function beeBalmFlower(doc, cx, cy, s = 1.0) {
  doc.save();
  // Stem
  doc.strokeColor('#000').lineWidth(2 * s)
     .moveTo(cx, cy + 80 * s).lineTo(cx, cy + 22 * s).stroke();
  // Leaves
  leaf(doc, cx, cy + 60 * s, cx - 28 * s, cy + 38 * s, 8 * s, 1.2 * s);
  leaf(doc, cx, cy + 46 * s, cx + 26 * s, cy + 26 * s, 8 * s, 1.2 * s);
  // Spiky flower head
  const nPetals = 14;
  for (let i = 0; i < nPetals; i++) {
    const a = (i / nPetals) * Math.PI * 2;
    const p1x = cx + Math.cos(a) * 11 * s, p1y = cy + Math.sin(a) * 11 * s;
    const p2x = cx + Math.cos(a) * 26 * s, p2y = cy + Math.sin(a) * 26 * s;
    const c1x = cx + Math.cos(a - 0.18) * 20 * s, c1y = cy + Math.sin(a - 0.18) * 20 * s;
    const c2x = cx + Math.cos(a + 0.18) * 20 * s, c2y = cy + Math.sin(a + 0.18) * 20 * s;
    doc.fillColor('#fff').strokeColor('#000').lineWidth(1 * s)
       .moveTo(p1x, p1y)
       .bezierCurveTo(c1x, c1y, p2x, p2y, p2x, p2y)
       .bezierCurveTo(c2x, c2y, p1x, p1y, p1x, p1y)
       .fillAndStroke();
  }
  doc.fillColor('#fff').strokeColor('#000').lineWidth(1.5 * s)
     .circle(cx, cy, 11 * s).fillAndStroke();
  doc.restore();
}

// Draw a simple 5-petal flower at (cx,cy)
function simplFlower(doc, cx, cy, r = 22, s = 1.0, lw = 1.2) {
  doc.save();
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const px = cx + Math.cos(a) * r * s;
    const py = cy + Math.sin(a) * r * s;
    doc.fillColor('#fff').strokeColor('#000').lineWidth(lw * s)
       .ellipse((cx + px) / 2, (cy + py) / 2, 6 * s, 11 * s).fillAndStroke();
  }
  doc.fillColor('#fff').strokeColor('#000').lineWidth(lw * s)
     .circle(cx, cy, 8 * s).fillAndStroke();
  doc.restore();
}

// ─── MAIN HUMMINGBIRD (adult, detailed) ──────────────────────────────────────
// Facing left, centered at (cx, cy), scale s.
// gorget: 'oval' | 'patch' | 'stripe' | 'none'
function drawBird(doc, cx, cy, s = 1.0, gorget = 'oval') {
  doc.save();

  // Body
  doc.fillColor('#fff').strokeColor('#000').lineWidth(2.2 * s)
     .ellipse(cx, cy, 80 * s, 30 * s).fillAndStroke();

  // Head
  doc.fillColor('#fff').strokeColor('#000').lineWidth(2.2 * s)
     .ellipse(cx - 74 * s, cy - 14 * s, 30 * s, 28 * s).fillAndStroke();

  // Blank neck gap
  doc.fillColor('#fff').lineWidth(0)
     .rect(cx - 93 * s, cy - 40 * s, 35 * s, 52 * s).fill();

  // Neck outline top
  doc.strokeColor('#000').lineWidth(2.2 * s)
     .moveTo(cx - 58 * s, cy - 40 * s)
     .bezierCurveTo(cx - 50 * s, cy - 30 * s, cx - 44 * s, cy - 20 * s, cx - 42 * s, cy - 14 * s)
     .stroke();
  // Neck outline bottom
  doc.moveTo(cx - 60 * s, cy + 14 * s)
     .bezierCurveTo(cx - 52 * s, cy + 10 * s, cx - 46 * s, cy + 5 * s, cx - 42 * s, cy + 2 * s)
     .stroke();

  // Beak (upper mandible - thicker)
  doc.lineWidth(2.6 * s)
     .moveTo(cx - 102 * s, cy - 20 * s)
     .lineTo(cx - 196 * s, cy - 13 * s).stroke();
  // Lower mandible (thinner)
  doc.lineWidth(1.4 * s)
     .moveTo(cx - 102 * s, cy - 14 * s)
     .lineTo(cx - 196 * s, cy - 12 * s).stroke();

  // Wing
  doc.fillColor('#fff').strokeColor('#000').lineWidth(2.2 * s)
     .moveTo(cx - 22 * s, cy - 26 * s)
     .bezierCurveTo(cx - 12 * s, cy - 100 * s, cx + 50 * s, cy - 120 * s, cx + 80 * s, cy - 78 * s)
     .bezierCurveTo(cx + 100 * s, cy - 48 * s, cx + 78 * s, cy - 16 * s, cx + 48 * s, cy - 10 * s)
     .bezierCurveTo(cx + 16 * s, cy - 4 * s, cx - 8 * s, cy - 12 * s, cx - 22 * s, cy - 26 * s)
     .fillAndStroke();

  // Wing feather dividers (3 lines)
  doc.lineWidth(1.1 * s).strokeColor('#000');
  doc.moveTo(cx + 4 * s, cy - 98 * s).lineTo(cx + 6 * s, cy - 18 * s).stroke();
  doc.moveTo(cx + 36 * s, cy - 110 * s).lineTo(cx + 38 * s, cy - 14 * s).stroke();
  doc.moveTo(cx + 64 * s, cy - 86 * s).lineTo(cx + 66 * s, cy - 14 * s).stroke();

  // Tail feathers (4)
  doc.lineWidth(2.2 * s).strokeColor('#000');
  doc.moveTo(cx + 78 * s, cy - 10 * s)
     .bezierCurveTo(cx + 106 * s, cy - 3 * s, cx + 136 * s, cy + 18 * s, cx + 160 * s, cy + 42 * s).stroke();
  doc.moveTo(cx + 78 * s, cy - 2 * s)
     .bezierCurveTo(cx + 108 * s, cy + 10 * s, cx + 140 * s, cy + 32 * s, cx + 164 * s, cy + 56 * s).stroke();
  doc.moveTo(cx + 78 * s, cy + 6 * s)
     .bezierCurveTo(cx + 110 * s, cy + 20 * s, cx + 144 * s, cy + 48 * s, cx + 168 * s, cy + 72 * s).stroke();
  doc.moveTo(cx + 78 * s, cy + 14 * s)
     .bezierCurveTo(cx + 114 * s, cy + 32 * s, cx + 150 * s, cy + 60 * s, cx + 172 * s, cy + 86 * s).stroke();

  // Eye
  doc.fillColor('#000').circle(cx - 88 * s, cy - 22 * s, 5.5 * s).fill();
  doc.fillColor('#fff').circle(cx - 86.5 * s, cy - 23.5 * s, 2 * s).fill();

  // Gorget
  if (gorget === 'oval') {
    doc.fillColor('#fff').strokeColor('#000').lineWidth(1.5 * s)
       .ellipse(cx - 66 * s, cy + 9 * s, 16 * s, 10 * s).fillAndStroke();
  } else if (gorget === 'patch') {
    doc.fillColor('#fff').strokeColor('#000').lineWidth(1.5 * s)
       .ellipse(cx - 62 * s, cy + 6 * s, 22 * s, 15 * s).fillAndStroke();
  } else if (gorget === 'stripe') {
    doc.strokeColor('#000').lineWidth(1.2 * s);
    for (let i = 0; i < 3; i++) {
      doc.moveTo(cx - 84 * s, cy - 2 * s + i * 6 * s)
         .lineTo(cx - 50 * s, cy - 2 * s + i * 6 * s).stroke();
    }
  }

  // Feet
  doc.strokeColor('#000').lineWidth(1.6 * s);
  // Left foot
  doc.moveTo(cx - 18 * s, cy + 28 * s).lineTo(cx - 14 * s, cy + 52 * s).stroke();
  doc.moveTo(cx - 14 * s, cy + 52 * s).lineTo(cx - 36 * s, cy + 64 * s).stroke();
  doc.moveTo(cx - 14 * s, cy + 52 * s).lineTo(cx - 14 * s, cy + 68 * s).stroke();
  doc.moveTo(cx - 14 * s, cy + 52 * s).lineTo(cx + 2 * s, cy + 65 * s).stroke();
  // Right foot
  doc.moveTo(cx + 16 * s, cy + 28 * s).lineTo(cx + 20 * s, cy + 52 * s).stroke();
  doc.moveTo(cx + 20 * s, cy + 52 * s).lineTo(cx - 2 * s, cy + 64 * s).stroke();
  doc.moveTo(cx + 20 * s, cy + 52 * s).lineTo(cx + 20 * s, cy + 68 * s).stroke();
  doc.moveTo(cx + 20 * s, cy + 52 * s).lineTo(cx + 36 * s, cy + 65 * s).stroke();

  doc.restore();
}

// ─── KIDS HUMMINGBIRD (bigger, rounder, bolder) ──────────────────────────────
function drawKidsBird(doc, cx, cy, s = 1.0) {
  doc.save();

  // Body — rounder
  doc.fillColor('#fff').strokeColor('#000').lineWidth(3 * s)
     .ellipse(cx, cy, 72 * s, 44 * s).fillAndStroke();

  // Head — large circle
  doc.fillColor('#fff').strokeColor('#000').lineWidth(3 * s)
     .ellipse(cx - 68 * s, cy - 18 * s, 42 * s, 40 * s).fillAndStroke();

  // Neck blank
  doc.fillColor('#fff').lineWidth(0)
     .rect(cx - 106 * s, cy - 56 * s, 50 * s, 70 * s).fill();

  // Neck outline
  doc.strokeColor('#000').lineWidth(3 * s)
     .moveTo(cx - 56 * s, cy - 56 * s)
     .bezierCurveTo(cx - 46 * s, cy - 40 * s, cx - 38 * s, cy - 26 * s, cx - 36 * s, cy - 16 * s)
     .stroke();
  doc.moveTo(cx - 58 * s, cy + 24 * s)
     .bezierCurveTo(cx - 48 * s, cy + 18 * s, cx - 40 * s, cy + 10 * s, cx - 36 * s, cy + 6 * s)
     .stroke();

  // Beak (thicker for kids)
  doc.lineWidth(3.5 * s)
     .moveTo(cx - 108 * s, cy - 22 * s).lineTo(cx - 178 * s, cy - 15 * s).stroke();
  doc.lineWidth(2 * s)
     .moveTo(cx - 108 * s, cy - 14 * s).lineTo(cx - 178 * s, cy - 14 * s).stroke();

  // Big simple wing
  doc.fillColor('#fff').strokeColor('#000').lineWidth(3 * s)
     .moveTo(cx - 12 * s, cy - 38 * s)
     .bezierCurveTo(cx - 2 * s, cy - 108 * s, cx + 56 * s, cy - 118 * s, cx + 84 * s, cy - 74 * s)
     .bezierCurveTo(cx + 100 * s, cy - 44 * s, cx + 78 * s, cy - 14 * s, cx + 48 * s, cy - 8 * s)
     .bezierCurveTo(cx + 14 * s, cy - 2 * s, cx - 4 * s, cy - 14 * s, cx - 12 * s, cy - 38 * s)
     .fillAndStroke();

  // Wing lines (just 2 — simpler)
  doc.lineWidth(2 * s)
     .moveTo(cx + 22 * s, cy - 100 * s).lineTo(cx + 24 * s, cy - 20 * s).stroke();
  doc.moveTo(cx + 58 * s, cy - 92 * s).lineTo(cx + 60 * s, cy - 16 * s).stroke();

  // Tail (3 big feathers)
  doc.lineWidth(3 * s);
  doc.moveTo(cx + 70 * s, cy - 14 * s)
     .bezierCurveTo(cx + 98 * s, cy - 6 * s, cx + 124 * s, cy + 16 * s, cx + 146 * s, cy + 42 * s).stroke();
  doc.moveTo(cx + 70 * s, cy + 14 * s)
     .bezierCurveTo(cx + 102 * s, cy + 32 * s, cx + 132 * s, cy + 62 * s, cx + 150 * s, cy + 88 * s).stroke();
  doc.moveTo(cx + 70 * s, cy)
     .bezierCurveTo(cx + 100 * s, cy + 14 * s, cx + 128 * s, cy + 40 * s, cx + 148 * s, cy + 65 * s).stroke();

  // Big cute eye
  doc.fillColor('#000').circle(cx - 83 * s, cy - 26 * s, 9 * s).fill();
  doc.fillColor('#fff').circle(cx - 79 * s, cy - 30 * s, 4 * s).fill();

  // Big throat patch
  doc.fillColor('#fff').strokeColor('#000').lineWidth(2 * s)
     .ellipse(cx - 62 * s, cy + 14 * s, 26 * s, 16 * s).fillAndStroke();

  // Feet (thick)
  doc.strokeColor('#000').lineWidth(2.5 * s);
  doc.moveTo(cx - 18 * s, cy + 42 * s).lineTo(cx - 12 * s, cy + 68 * s).stroke();
  doc.moveTo(cx - 12 * s, cy + 68 * s).lineTo(cx - 36 * s, cy + 82 * s).stroke();
  doc.moveTo(cx - 12 * s, cy + 68 * s).lineTo(cx - 12 * s, cy + 86 * s).stroke();
  doc.moveTo(cx - 12 * s, cy + 68 * s).lineTo(cx + 8 * s, cy + 82 * s).stroke();
  doc.moveTo(cx + 16 * s, cy + 42 * s).lineTo(cx + 22 * s, cy + 68 * s).stroke();
  doc.moveTo(cx + 22 * s, cy + 68 * s).lineTo(cx - 2 * s, cy + 82 * s).stroke();
  doc.moveTo(cx + 22 * s, cy + 68 * s).lineTo(cx + 22 * s, cy + 86 * s).stroke();
  doc.moveTo(cx + 22 * s, cy + 68 * s).lineTo(cx + 40 * s, cy + 82 * s).stroke();

  doc.restore();
}

// ─── COVER / TITLE PAGE ──────────────────────────────────────────────────────
function coverPage(doc, mainTitle, packSubtitle, details, facts) {
  doc.addPage();
  border(doc);

  // Big decorative header
  doc.font('Helvetica-Bold').fontSize(26).fillColor('#000')
     .text(mainTitle, M + 12, M + 24, { width: W - 2 * M - 24, align: 'center' });
  doc.font('Helvetica-BoldOblique').fontSize(13).fillColor('#333')
     .text(packSubtitle, M + 12, M + 62, { width: W - 2 * M - 24, align: 'center' });

  divider(doc, M + 90);

  // Small hummingbird decorative illustration centered
  const cx = W / 2 + 40, cy = 300;
  drawBird(doc, cx, cy, 0.9);
  trumpetVine(doc, cx + 165, cy - 80, 0.85);

  // Details block (pages, difficulty, format)
  const dtY = 480;
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#000')
     .text('Pack Details', M + 30, dtY, { continued: false });
  divider(doc, dtY + 16);
  doc.font('Helvetica').fontSize(9.5).fillColor('#222');
  details.forEach((d, i) => {
    doc.text(d, M + 30, dtY + 24 + i * 17, { width: W / 2 - M - 10 });
  });

  // What you need box
  const needY = dtY + 24 + details.length * 17 + 12;
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#000')
     .text('What you need:', M + 30, needY);
  doc.font('Helvetica').fontSize(9).fillColor('#333')
     .text('• White paper (letter size, 8.5″ × 11″)\n• Printer (any home printer works)\n• Colored pencils, markers, or crayons',
           M + 30, needY + 14, { width: W / 2 - M });

  // Tip box
  const tipY = H - M - 160;
  doc.save().fillColor('#f5f5f5').strokeColor('#bbb').lineWidth(0.8)
     .roundedRect(M + 14, tipY, W - 2 * M - 28, 52, 6).fillAndStroke().restore();
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#000')
     .text('Pro Tip:', M + 24, tipY + 7);
  doc.font('Helvetica').fontSize(8).fillColor('#333')
     .text('Print on cardstock for best results. Use light pencil strokes first, then build up color gradually for a beautiful professional look!',
           M + 24, tipY + 20, { width: W - 2 * M - 48 });

  footer(doc);
}

// ─── NORTH AMERICA MAP ───────────────────────────────────────────────────────
function drawNAMap(doc, mapX, mapY, mapW, mapH) {
  const minLon = -130, maxLon = -60, minLat = 15, maxLat = 72;
  const x = (lon) => mapX + ((lon - minLon) / (maxLon - minLon)) * mapW;
  const y = (lat) => mapY + ((maxLat - lat) / (maxLat - minLat)) * mapH;

  // Land fill
  doc.save().fillColor('#f5f5f5').strokeColor('#000').lineWidth(1.2);

  // Continental US outline (simplified polygon)
  const usOutline = [
    [-67, 47], [-70, 42], [-72, 41], [-74, 40], [-75, 38],
    [-76, 35], [-77, 34], [-79, 33], [-80, 32], [-82, 30],
    [-84, 29], [-82, 26], [-80, 25], [-83, 27], [-87, 30],
    [-90, 29], [-94, 29], [-97, 26], [-97, 28], [-100, 28],
    [-104, 29], [-106, 32], [-117, 32], [-120, 34], [-122, 37],
    [-124, 40], [-124, 46], [-124, 49], [-95, 49], [-67, 47],
  ];
  doc.moveTo(x(usOutline[0][0]), y(usOutline[0][1]));
  usOutline.slice(1).forEach(([lon, lat]) => doc.lineTo(x(lon), y(lat)));
  doc.closePath().fillAndStroke();

  // Canada (simplified)
  const caOutline = [
    [-67, 47], [-64, 46], [-60, 46], [-63, 52], [-65, 60],
    [-80, 64], [-88, 68], [-100, 70], [-120, 70], [-130, 58],
    [-124, 50], [-124, 49], [-95, 49], [-67, 47],
  ];
  doc.moveTo(x(caOutline[0][0]), y(caOutline[0][1]));
  caOutline.slice(1).forEach(([lon, lat]) => doc.lineTo(x(lon), y(lat)));
  doc.closePath().stroke();

  // Mexico (simplified)
  const mxOutline = [
    [-97, 26], [-94, 29], [-90, 29], [-87, 16], [-90, 16],
    [-92, 18], [-95, 20], [-103, 19], [-105, 20],
    [-110, 23], [-115, 28], [-117, 32], [-106, 32],
    [-104, 29], [-100, 28], [-97, 28], [-97, 26],
  ];
  doc.moveTo(x(mxOutline[0][0]), y(mxOutline[0][1]));
  mxOutline.slice(1).forEach(([lon, lat]) => doc.lineTo(x(lon), y(lat)));
  doc.closePath().stroke();

  doc.restore();
  return { x, y };
}

// Small dot marker on map
function mapDot(doc, mx, my, label, labelSide = 'right') {
  doc.fillColor('#000').circle(mx, my, 3).fill();
  doc.font('Helvetica').fontSize(6).fillColor('#000');
  if (labelSide === 'right') {
    doc.text(label, mx + 5, my - 4, { width: 60 });
  } else {
    doc.text(label, mx - 65, my - 4, { width: 60, align: 'right' });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PDF #1 — Ruby-throated Hummingbird (3 pages)
// ═══════════════════════════════════════════════════════════════════════════════
async function genRubyThroated() {
  const doc = createDoc();
  const p = writeDoc(doc, 'ruby-throated-hummingbird.pdf');

  // Page 1: Cover
  coverPage(doc,
    'Ruby-throated Hummingbird',
    'Printable Coloring Pack  •  3 Pages',
    [
      '• Pages: 3 coloring pages',
      '• Difficulty: Beginner – Intermediate',
      '• Format: US Letter PDF',
      '• Best printed on: white cardstock',
    ],
    []
  );

  // Page 2: Full portrait with trumpet vine
  doc.addPage();
  border(doc);
  title(doc, 'Ruby-throated Hummingbird', M + 16);
  subtitle(doc, 'Archilochus colubris  —  Eastern North America’s only breeding hummingbird', M + 46);
  coloringLine(doc, M + 64);
  divider(doc, M + 80);

  // Main bird + flowers
  const cx1 = 290, cy1 = 360;
  drawBird(doc, cx1, cy1, 1.05, 'oval');
  // Trumpet vine on right
  trumpetVine(doc, cx1 + 210, cy1 - 70, 0.95);
  // Extra leaves
  leaf(doc, cx1 + 170, cy1 + 60, cx1 + 190, cy1 + 30, 12, 1.3);
  leaf(doc, cx1 + 180, cy1 + 80, cx1 + 205, cy1 + 55, 10, 1.3);
  // A smaller flower on lower left
  simplFlower(doc, M + 90, cy1 + 90, 20, 1.0, 1.3);
  leaf(doc, M + 90, cy1 + 110, M + 68, cy1 + 88, 9, 1.2);

  factBox(doc, 'Ruby-throated Hummingbird Facts', [
    'Males have a brilliant iridescent red throat (gorget) that looks black in dim light.',
    'The only hummingbird species that breeds east of the Mississippi River.',
    'Flies non-stop across the 500-mile Gulf of Mexico during fall migration.',
    'Beats its wings 53 times per second and can fly 25–30 mph in normal flight.',
  ]);
  footer(doc);

  // Page 3: Head detail + wing pattern
  doc.addPage();
  border(doc);
  title(doc, 'Ruby-throated Hummingbird — Detail Study', M + 16);
  subtitle(doc, 'Head & Wing Close-up  |  Color each section a different shade', M + 46);
  divider(doc, M + 66);

  // Large head close-up (left half of page)
  const hcx = 190, hcy = 310;
  const hs = 2.2; // large scale for detail
  // Head only (big)
  doc.fillColor('#fff').strokeColor('#000').lineWidth(2.8)
     .ellipse(hcx, hcy, 66 * hs * 0.45, 62 * hs * 0.45).fillAndStroke();
  // Beak
  doc.lineWidth(3.2)
     .moveTo(hcx - 28, hcy - 8)
     .lineTo(hcx - 120, hcy - 3).stroke();
  doc.lineWidth(1.6)
     .moveTo(hcx - 28, hcy - 2)
     .lineTo(hcx - 120, hcy - 2).stroke();
  // Eye
  doc.fillColor('#000').circle(hcx - 14, hcy - 16, 10).fill();
  doc.fillColor('#fff').circle(hcx - 10, hcy - 19, 4).fill();
  // Gorget detail (stripes in oval)
  doc.fillColor('#fff').strokeColor('#000').lineWidth(2)
     .ellipse(hcx - 4, hcy + 22, 34, 22).fillAndStroke();
  for (let i = -3; i <= 3; i++) {
    doc.strokeColor('#000').lineWidth(0.7)
       .moveTo(hcx - 4 + i * 7, hcy + 6)
       .lineTo(hcx - 4 + i * 7, hcy + 38).stroke();
  }
  // Head label
  doc.font('Helvetica').fontSize(8).fillColor('#555')
     .text('Head & gorget detail', hcx - 60, hcy + 90, { width: 120, align: 'center' });

  // Wing detail (right half of page)
  const wcx = 420, wcy = 290;
  // Single large wing
  doc.fillColor('#fff').strokeColor('#000').lineWidth(2.2)
     .moveTo(wcx - 60, wcy + 30)
     .bezierCurveTo(wcx - 40, wcy - 120, wcx + 70, wcy - 140, wcx + 100, wcy - 80)
     .bezierCurveTo(wcx + 118, wcy - 38, wcx + 92, wcy + 6, wcx + 60, wcy + 14)
     .bezierCurveTo(wcx + 24, wcy + 22, wcx - 14, wcy + 12, wcx - 60, wcy + 30)
     .fillAndStroke();
  // Many feather lines
  for (let i = 0; i < 6; i++) {
    const t = (i + 1) / 7;
    const fx = wcx - 60 + (wcx + 60 - wcx + 60) * t * 1.5;
    const fy1 = wcy - 120 + 60 * t;
    const fy2 = wcy + 18 - 8 * t;
    doc.strokeColor('#000').lineWidth(1.0)
       .moveTo(wcx - 60 + (wcx + 100 + 60) * t * 0.6, fy1 - 20)
       .lineTo(wcx - 60 + (wcx + 60 + 60) * t * 0.55, fy2).stroke();
  }
  doc.font('Helvetica').fontSize(8).fillColor('#555')
     .text('Wing feather detail', wcx - 60, wcy + 80, { width: 120, align: 'center' });

  // Color guide
  const cgY = H - M - 188;
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#000')
     .text('Ruby-throated Hummingbird Color Guide:', M + 14, cgY);
  const colors = [
    { label: 'Throat (gorget)', hint: 'Brilliant ruby-red / iridescent crimson' },
    { label: 'Back & crown', hint: 'Metallic emerald green' },
    { label: 'Belly', hint: 'Grayish-white' },
    { label: 'Wing', hint: 'Brownish-gray with darker tips' },
    { label: 'Beak', hint: 'Long black needle-like bill' },
  ];
  colors.forEach((c, i) => {
    const cx2 = M + 14 + (i % 2) * 238, cy2 = cgY + 18 + Math.floor(i / 2) * 18;
    doc.save().strokeColor('#000').lineWidth(0.8)
       .rect(cx2, cy2 - 2, 10, 10).stroke().restore();
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#000')
       .text(c.label + ':', cx2 + 14, cy2, { continued: true })
       .font('Helvetica').text(' ' + c.hint, { continued: false });
  });

  footer(doc);

  doc.end();
  await p;
  console.log('  ✓ ruby-throated-hummingbird.pdf');
}

// ═══════════════════════════════════════════════════════════════════════════════
// PDF #2 — Hummingbird Garden Scene (5 pages)
// ═══════════════════════════════════════════════════════════════════════════════
async function genGardenScene() {
  const doc = createDoc();
  const p = writeDoc(doc, 'hummingbird-garden-scene.pdf');

  // Page 1: Cover
  coverPage(doc,
    'Hummingbird Garden Scene',
    'Printable Coloring Pack  •  5 Pages',
    [
      '• Pages: 5 coloring pages',
      '• Difficulty: Intermediate',
      '• Format: US Letter PDF',
      '• Features: Trumpet vine, Bee balm, Garden scenes',
    ],
    []
  );

  // Page 2: Hummingbird & Bee Balm
  doc.addPage();
  border(doc);
  title(doc, 'Hummingbird & Bee Balm Garden');
  subtitle(doc, 'Monarda didyma — A favorite nectar source for hummingbirds');
  coloringLine(doc, M + 64);
  divider(doc, M + 80);

  drawBird(doc, 290, 340, 1.0, 'oval');
  beeBalmFlower(doc, 490, 290, 1.0);
  beeBalmFlower(doc, 460, 400, 0.85);
  leaf(doc, 480, 470, 510, 445, 14, 1.3);
  leaf(doc, 485, 490, 455, 462, 12, 1.3);
  simplFlower(doc, M + 100, 480, 18, 1.0, 1.3);
  leaf(doc, M + 100, 498, M + 78, 474, 9, 1.2);

  factBox(doc, 'Garden Scene Facts', [
    'Bee balm (Monarda) produces nectar-rich tubular flowers that perfectly fit hummingbird bills.',
    'Hummingbirds remember every flower in their territory and return in a circuit pattern.',
    'A hummingbird can visit 1,000–2,000 flowers per day for nectar.',
    'Plant bee balm in USDA Zones 3–9; it blooms July–September.',
  ]);
  footer(doc);

  // Page 3: Hummingbird & Trumpet Vine
  doc.addPage();
  border(doc);
  title(doc, 'Hummingbird & Trumpet Vine');
  subtitle(doc, 'Campsis radicans — Native vine with brilliant orange-red flowers');
  coloringLine(doc, M + 64);
  divider(doc, M + 80);

  // Bird hovering (slightly higher, as if approaching vine)
  drawBird(doc, 270, 310, 1.0, 'oval');
  trumpetVine(doc, 490, 210, 1.1);
  leaf(doc, 490, 350, 525, 320, 14, 1.3);
  leaf(doc, 488, 370, 456, 342, 13, 1.3);
  leaf(doc, 460, 440, 500, 415, 12, 1.2);
  // Extra vine
  doc.strokeColor('#000').lineWidth(1.8)
     .moveTo(490, 380).bezierCurveTo(480, 440, 500, 490, 490, 530).stroke();
  leaf(doc, 490, 490, 455, 468, 11, 1.2);

  factBox(doc, 'Trumpet Vine Facts', [
    'Trumpet vine (Campsis radicans) is native to eastern North America and blooms June–September.',
    'Its long tubular flowers evolved alongside hummingbirds — they fit the bill perfectly.',
    'Ruby-throated hummingbirds are the primary pollinators of trumpet vine in eastern US.',
    'Plant in full sun; it can grow 30–40 feet long and needs a strong trellis or fence.',
  ]);
  footer(doc);

  // Page 4: Two hummingbirds at flower cluster
  doc.addPage();
  border(doc);
  title(doc, 'Two Hummingbirds at a Flower Garden');
  subtitle(doc, 'Hummingbirds are territorial — watch them chase each other away from feeders!');
  coloringLine(doc, M + 64);
  divider(doc, M + 80);

  // First bird (left, larger)
  drawBird(doc, 255, 310, 0.95, 'oval');
  // Second bird (right, slightly smaller, higher up)
  // We'll draw a mirror-image bird (facing right) using a rotated transform
  // For simplicity, draw a second bird slightly offset
  doc.save().translate(W, 0).scale(-1, 1, { origin: [0, 0] });
  drawBird(doc, W - 430, 240, 0.8, 'patch');
  doc.restore();

  // Flower cluster in center
  beeBalmFlower(doc, W / 2 + 20, 300, 0.9);
  simplFlower(doc, W / 2 - 30, 360, 20, 1.0, 1.3);
  simplFlower(doc, W / 2 + 60, 390, 18, 1.0, 1.3);
  leaf(doc, W / 2, 420, W / 2 + 30, 395, 12, 1.2);
  leaf(doc, W / 2 - 10, 440, W / 2 - 38, 414, 12, 1.2);

  factBox(doc, 'Hummingbird Territory Facts', [
    'Male hummingbirds are highly territorial and will aggressively defend nectar sources.',
    'Territory size is typically 1/4 to 1/2 acre around a reliable food source.',
    'Hummingbirds use a dive display — swooping in a U or J shape — to warn rivals.',
    'To reduce conflicts, space feeders at least 10–20 feet apart.',
  ]);
  footer(doc);

  // Page 5: Decorative border/repeat pattern
  doc.addPage();
  border(doc);
  title(doc, 'Hummingbird Garden Border Pattern');
  subtitle(doc, 'A decorative coloring page — fill in the repeating floral and bird motifs');
  coloringLine(doc, M + 64);
  divider(doc, M + 80);

  // Grid of small birds and flowers
  const startY = M + 100;
  // Row 1: birds
  for (let col = 0; col < 3; col++) {
    const bx = 150 + col * 155;
    drawBird(doc, bx, startY + 80, 0.52, col % 2 === 0 ? 'oval' : 'patch');
  }
  divider(doc, startY + 190);
  // Row 2: flowers
  for (let col = 0; col < 4; col++) {
    const fx = 110 + col * 120;
    if (col % 2 === 0) beeBalmFlower(doc, fx, startY + 290, 0.65);
    else simplFlower(doc, fx, startY + 280, 18, 0.9, 1.1);
  }
  divider(doc, startY + 390);
  // Row 3: birds again (mirrored)
  for (let col = 0; col < 3; col++) {
    const bx = 150 + col * 155;
    doc.save().translate(W, 0).scale(-1, 1, { origin: [0, 0] });
    drawBird(doc, W - bx, startY + 480, 0.52, col % 2 === 1 ? 'oval' : 'stripe');
    doc.restore();
  }

  factBox(doc, 'Gardening for Hummingbirds', [
    'Plant native tubular flowers in red, orange, and pink — hummingbirds see these colors well.',
    'Include a water feature: hummingbirds love to bathe in misters and gentle sprinklers.',
    'Avoid pesticides — hummingbirds also eat tiny insects and spiders for protein.',
    'Keep feeders clean: change nectar every 2–3 days in summer to prevent mold.',
  ]);
  footer(doc);

  doc.end();
  await p;
  console.log('  ✓ hummingbird-garden-scene.pdf');
}

// ═══════════════════════════════════════════════════════════════════════════════
// PDF #3 — Hummingbird Species Pack (12 pages)
// ═══════════════════════════════════════════════════════════════════════════════
async function genSpeciesPack() {
  const doc = createDoc();
  const p = writeDoc(doc, 'hummingbird-species-pack.pdf');

  // Page 1: Cover
  coverPage(doc,
    'Hummingbird Species Pack',
    '8 Species  •  12 Coloring Pages  •  All Levels',
    [
      '• Pages: 12 coloring pages',
      '• Species: 8 North American hummingbirds',
      '• Difficulty: All levels',
      '• Includes: Species info & color guides',
    ],
    []
  );

  // 8 species pages
  const species = [
    {
      name: 'Ruby-throated Hummingbird',
      sci: 'Archilochus colubris',
      range: 'Eastern North America',
      gorget: 'oval',
      facts: [
        'Only hummingbird species breeding east of the Mississippi.',
        'Males have a brilliant ruby-red gorget; females are white-throated.',
        'Wingspan: 3.1–4.3 inches; Weight: 0.1–0.2 oz.',
        'Winters in Central America; migrates 1,200+ miles twice a year.',
      ],
      colors: 'Back: emerald green | Throat: ruby red | Belly: grayish-white',
    },
    {
      name: "Anna's Hummingbird",
      sci: 'Calypte anna',
      range: 'Pacific Coast, year-round resident',
      gorget: 'patch',
      facts: [
        "Anna's is one of the few hummingbirds that stays year-round in the US.",
        'Males have a full rose-pink head and gorget — unique among North American hummers.',
        'Often sings complex buzzy songs — one of few hummingbird species to sing.',
        'Commonly seen in California, Oregon, and Washington gardens.',
      ],
      colors: 'Crown & gorget: iridescent rose-pink | Back: green | Belly: grayish',
    },
    {
      name: 'Rufous Hummingbird',
      sci: 'Selasphorus rufus',
      range: 'Western North America',
      gorget: 'oval',
      facts: [
        'Rufous hummingbirds have the longest migration of any hummingbird — up to 4,000 miles.',
        'Males are bright orange-rufous; females have rufous sides and green back.',
        'Extremely feisty — will chase other hummingbirds much larger than themselves.',
        'Migrates through mountain meadows up to 12,000 feet elevation.',
      ],
      colors: 'Back: bright orange-rufous | Gorget: iridescent red-orange | Belly: white',
    },
    {
      name: 'Calliope Hummingbird',
      sci: 'Selasphorus calliope',
      range: 'Rocky Mountain West',
      gorget: 'stripe',
      facts: [
        'Smallest bird in North America — weighs only 0.1 oz, lighter than a penny.',
        "Males' gorget is unique: magenta streaks (not a solid patch) on white throat.",
        'Despite its tiny size, it migrates from western US to Mexico each winter.',
        'Often found in mountain meadows above 4,000 feet elevation.',
      ],
      colors: 'Back: metallic green | Gorget: magenta streaks | Belly: whitish-buff',
    },
    {
      name: "Costa's Hummingbird",
      sci: 'Calypte costae',
      range: 'Sonoran Desert, California & Arizona',
      gorget: 'patch',
      facts: [
        "Costa's males have a brilliant purple crown and gorget that extends outward.",
        'Desert specialist — often active even in extreme summer heat.',
        "The extended purple gorget feathers give males a 'royal' mustached look.",
        'Arrives early — often nesting in February in the Sonoran Desert.',
      ],
      colors: 'Crown & gorget: brilliant violet-purple | Back: green | Belly: whitish',
    },
    {
      name: 'Broad-tailed Hummingbird',
      sci: 'Selasphorus platycercus',
      range: 'Rocky Mountains & Great Basin',
      gorget: 'oval',
      facts: [
        'Males produce a loud metallic trill with their wing feathers during flight.',
        'The wing trill helps males attract females and warn rival males.',
        'Can enter daily torpor (a sleep-like state) to conserve energy on cold nights.',
        'Regularly found at feeders in mountain communities from Colorado to Arizona.',
      ],
      colors: 'Gorget: rose-red | Back: iridescent green | Tail: broad, rufous-edged',
    },
    {
      name: "Allen's Hummingbird",
      sci: 'Selasphorus sasin',
      range: 'California coastal scrub',
      gorget: 'oval',
      facts: [
        "Allen's hummingbird looks nearly identical to Rufous but has a green back.",
        'Range restricted to coastal California and a small part of southern Oregon.',
        'Males arrive in late January — one of the earliest spring migrants.',
        'A resident subspecies lives year-round on the Channel Islands.',
      ],
      colors: 'Gorget: iridescent red-orange | Back: green | Sides: rufous',
    },
    {
      name: 'Black-chinned Hummingbird',
      sci: 'Archilochus alexandri',
      range: 'Western North America',
      gorget: 'stripe',
      facts: [
        "Males' black chin is bordered by a band of iridescent purple visible in good light.",
        'Western counterpart of the Ruby-throated Hummingbird — same genus.',
        'Extremely adaptable — nests from sea level to 8,000 feet in mountains.',
        'Females build walnut-sized nests held together with spider silk.',
      ],
      colors: 'Chin: black | Gorget band: purple | Back: green | Belly: grayish-white',
    },
  ];

  species.forEach((sp) => {
    doc.addPage();
    border(doc);
    title(doc, sp.name, M + 16);
    doc.font('Helvetica-Oblique').fontSize(10).fillColor('#444')
       .text(sp.sci + '  |  ' + sp.range, M + 12, M + 46, { width: W - 2 * M - 24, align: 'center' });
    coloringLine(doc, M + 62);
    divider(doc, M + 78);

    // Main bird
    drawBird(doc, 290, 350, 1.05, sp.gorget);
    // Some flowers for context
    simplFlower(doc, 495, 280, 22, 1.0, 1.3);
    simplFlower(doc, 490, 380, 18, 1.0, 1.2);
    leaf(doc, 492, 340, 520, 312, 13, 1.2);
    leaf(doc, 488, 420, 514, 396, 11, 1.2);

    // Color guide strip
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#000')
       .text('Color Guide:  ' + sp.colors, M + 14, H - M - 126, { width: W - 2 * M - 28 });

    factBox(doc, sp.name + ' Facts', sp.facts);
    footer(doc);
  });

  // Pages 10–11: Group design (all 8 species names)
  for (let grp = 0; grp < 2; grp++) {
    doc.addPage();
    border(doc);
    title(doc, grp === 0 ? 'Hummingbird Comparison Chart' : 'Hummingbird Size Comparison');
    subtitle(doc, grp === 0
      ? 'These 8 species live across North America — can you spot them in your yard?'
      : 'All hummingbirds are tiny — but some are tinier than others!');
    divider(doc, M + 76);

    // 4 small birds per group page
    const startIdx = grp * 4;
    for (let i = 0; i < 4; i++) {
      const sp = species[startIdx + i];
      if (!sp) continue;
      const col = i % 2, row = Math.floor(i / 2);
      const bx = 155 + col * 280;
      const by = 190 + row * 230;
      const sc = grp === 1 ? 0.42 - i * 0.03 : 0.44; // size comparison on page 2
      drawBird(doc, bx, by, sc, sp.gorget);
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#000')
         .text(sp.name, bx - 80, by + 80, { width: 160, align: 'center' });
      doc.font('Helvetica-Oblique').fontSize(7).fillColor('#555')
         .text(sp.sci, bx - 80, by + 92, { width: 160, align: 'center' });
    }

    factBox(doc, 'Did You Know?', [
      'There are about 360 species of hummingbirds worldwide — all found only in the Americas.',
      'North America has about 23 regularly occurring species, mostly in the West.',
      'Cuba’s Bee Hummingbird (Mellisuga helenae) is the world’s smallest bird at 2.4 inches.',
      'Hummingbirds are the only birds that can fly backwards, sideways, and hover in place.',
    ]);
    footer(doc);
  }

  // Page 12: Certificate
  doc.addPage();
  border(doc);

  doc.font('Helvetica-Bold').fontSize(11).fillColor('#888')
     .text('H U M M I N G B I R D  W A T C H E R', M + 12, M + 24,
           { width: W - 2 * M - 24, align: 'center' });
  doc.font('Helvetica-BoldOblique').fontSize(28).fillColor('#000')
     .text('Certificate of Coloring', M + 12, M + 50, { width: W - 2 * M - 24, align: 'center' });
  divider(doc, M + 96);
  doc.font('Helvetica').fontSize(13).fillColor('#333')
     .text('This certifies that', M + 12, M + 110, { width: W - 2 * M - 24, align: 'center' });

  // Name line
  doc.strokeColor('#000').lineWidth(1.2)
     .moveTo(W / 2 - 120, M + 150).lineTo(W / 2 + 120, M + 150).stroke();
  doc.font('Helvetica-Oblique').fontSize(9).fillColor('#888')
     .text('(your name)', M + 12, M + 154, { width: W - 2 * M - 24, align: 'center' });
  doc.font('Helvetica').fontSize(13).fillColor('#333')
     .text('has successfully colored all 8 North American Hummingbird species\nfrom the Hummingbird Species Coloring Pack.',
           M + 12, M + 174, { width: W - 2 * M - 24, align: 'center' });

  // Small bird drawings across center
  const certSpecies = species.slice(0, 4);
  certSpecies.forEach((sp, i) => {
    drawBird(doc, 110 + i * 115, 370, 0.38, sp.gorget);
  });
  const certSpecies2 = species.slice(4);
  certSpecies2.forEach((sp, i) => {
    drawBird(doc, 110 + i * 115, 470, 0.38, sp.gorget);
  });

  doc.font('Helvetica').fontSize(10).fillColor('#555')
     .text('Date: ____________________', M + 12, 540, { width: W / 2 - M - 12, align: 'center' })
     .text('Signed: ____________________', W / 2 + 12, 540, { width: W / 2 - M - 12, align: 'center' });

  footer(doc);

  doc.end();
  await p;
  console.log('  ✓ hummingbird-species-pack.pdf');
}

// ═══════════════════════════════════════════════════════════════════════════════
// PDF #4 — Hummingbird & Flowers Adult Coloring (6 pages)
// ═══════════════════════════════════════════════════════════════════════════════
async function genAdultColoring() {
  const doc = createDoc();
  const p = writeDoc(doc, 'hummingbird-flowers-adult-coloring.pdf');

  // Page 1: Cover
  coverPage(doc,
    'Hummingbird & Flowers',
    'Adult Coloring Book  •  6 Intricate Pages',
    [
      '• Pages: 6 intricate coloring pages',
      '• Difficulty: Advanced',
      '• Style: Mandala & botanical illustration',
      '• Best for: Stress relief & mindfulness coloring',
    ],
    []
  );

  // Pages 2–6: Mandala designs
  const mandalaTitles = [
    'Hummingbird Mandala I',
    'Hummingbird & Blossom Mandala',
    'Floral Medallion with Hummingbird',
    'Hummingbird Garden Mandala',
    'Radiant Hummingbird Mandala',
  ];

  mandalaTitles.forEach((ttl, idx) => {
    doc.addPage();
    border(doc);
    title(doc, ttl, M + 16);
    subtitle(doc, 'Intricate adult coloring design — take your time and enjoy the detail', M + 44);
    divider(doc, M + 62);

    const cx = W / 2, cy = 360;
    const variant = idx % 3; // 0, 1, or 2 for slightly different layouts

    // Outer ring of large petals
    petalRing(doc, cx, cy, 160, 210, 12, 18, 0.9, (idx * Math.PI) / 12);

    // Second ring of medium petals
    petalRing(doc, cx, cy, 115, 158, 16, 12, 0.85, ((idx + 0.5) * Math.PI) / 12);

    // Decorative circles between petal rings
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + (idx * Math.PI) / 12;
      const r = 138;
      doc.fillColor('#fff').strokeColor('#000').lineWidth(0.7)
         .circle(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 6).fillAndStroke();
    }

    // Inner petal ring
    petalRing(doc, cx, cy, 72, 112, 8, 15, 0.8, (idx * Math.PI) / 8);

    // Tiny dots at inner ring between petals
    for (let i = 0; i < 8; i++) {
      const a = ((i + 0.5) / 8) * Math.PI * 2 + (idx * Math.PI) / 8;
      doc.fillColor('#fff').strokeColor('#000').lineWidth(0.6)
         .circle(cx + Math.cos(a) * 92, cy + Math.sin(a) * 92, 4).fillAndStroke();
    }

    // Concentric circles
    [56, 40, 24].forEach((r, ri) => {
      doc.fillColor('#fff').strokeColor('#000').lineWidth(0.8)
         .circle(cx, cy, r).fillAndStroke();
    });

    // Draw hummingbird in center (small, detailed)
    drawBird(doc, cx + 14, cy + 4, 0.48, idx % 2 === 0 ? 'oval' : 'patch');

    // Extra decorative elements based on variant
    if (variant === 0) {
      // Small flowers at outer petal tips
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + (idx * Math.PI) / 6;
        const fx = cx + Math.cos(a) * 205;
        const fy = cy + Math.sin(a) * 205;
        doc.fillColor('#fff').strokeColor('#000').lineWidth(0.7)
           .circle(fx, fy, 8).fillAndStroke();
        for (let j = 0; j < 6; j++) {
          const pa = (j / 6) * Math.PI * 2;
          doc.ellipse(fx + Math.cos(pa) * 11, fy + Math.sin(pa) * 11, 3, 5).fillAndStroke();
        }
      }
    } else if (variant === 1) {
      // Radiating lines from center outward
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        doc.strokeColor('#000').lineWidth(0.5)
           .moveTo(cx + Math.cos(a) * 60, cy + Math.sin(a) * 60)
           .lineTo(cx + Math.cos(a) * 115, cy + Math.sin(a) * 115).stroke();
      }
    } else {
      // Leaf shapes around middle ring
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 16;
        const r1 = 118, r2 = 155;
        leaf(doc,
          cx + Math.cos(a) * r1, cy + Math.sin(a) * r1,
          cx + Math.cos(a) * r2, cy + Math.sin(a) * r2,
          9, 0.75
        );
      }
    }

    // Corner decorations
    const corners = [[M + 30, M + 90], [W - M - 30, M + 90], [M + 30, H - M - 120], [W - M - 30, H - M - 120]];
    corners.forEach(([cornX, cornY]) => {
      doc.fillColor('#fff').strokeColor('#000').lineWidth(0.7);
      petalRing(doc, cornX, cornY, 10, 22, 6, 4, 0.7);
      doc.circle(cornX, cornY, 6).fillAndStroke();
    });

    footer(doc);
  });

  doc.end();
  await p;
  console.log('  ✓ hummingbird-flowers-adult-coloring.pdf');
}

// ═══════════════════════════════════════════════════════════════════════════════
// PDF #5 — Kids Hummingbird Coloring Pack (8 pages)
// ═══════════════════════════════════════════════════════════════════════════════
async function genKidsColoring() {
  const doc = createDoc();
  const p = writeDoc(doc, 'kids-hummingbird-coloring-pack.pdf');

  // Page 1: Cover (kids style)
  doc.addPage();
  border(doc);
  doc.font('Helvetica-Bold').fontSize(30).fillColor('#000')
     .text('Hummingbird', M + 12, M + 22, { width: W - 2 * M - 24, align: 'center' });
  doc.font('Helvetica-Bold').fontSize(22).fillColor('#000')
     .text('Coloring Adventures!', M + 12, M + 66, { width: W - 2 * M - 24, align: 'center' });
  doc.font('Helvetica').fontSize(12).fillColor('#444')
     .text('8 fun pages for ages 3–8', M + 12, M + 102, { width: W - 2 * M - 24, align: 'center' });
  divider(doc, M + 120);

  // Big kids bird on cover
  drawKidsBird(doc, W / 2 + 30, 380, 0.95);
  simplFlower(doc, W / 2 + 210, 320, 28, 1.1, 1.8);
  simplFlower(doc, W / 2 + 220, 420, 22, 1.0, 1.6);
  leaf(doc, W / 2 + 210, 400, W / 2 + 245, 370, 18, 1.6);

  // Fun intro text
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#000')
     .text('Did you know?', M + 30, 540);
  doc.font('Helvetica').fontSize(11).fillColor('#222')
     .text('Hummingbirds are the ONLY birds that can fly backwards! They flap their wings 50 times every second. Use your brightest colors to bring these tiny birds to life!',
           M + 30, 562, { width: W - 2 * M - 60 });
  footer(doc);

  // Pages 2-8: 7 coloring pages with big kids birds
  const kidsPages = [
    {
      title: 'My Hummingbird Friend',
      fact: "Hummingbirds are the world's smallest birds! The Ruby-throated Hummingbird weighs less than a penny.",
      flowers: 'bee-balm',
    },
    {
      title: 'Hummingbird at the Feeder',
      fact: "Hummingbirds need to eat EVERY 10-15 minutes! That's like having 50 snacks a day!",
      flowers: 'simple',
    },
    {
      title: 'Hummingbird Flying High',
      fact: 'A hummingbird’s heart beats 1,200 times per minute when flying. Your heart beats about 100 times a minute!',
      flowers: 'bee-balm',
    },
    {
      title: 'Hummingbird in the Garden',
      fact: 'Hummingbirds can remember every single flower in their neighborhood and when each one will have nectar!',
      flowers: 'trumpet',
    },
    {
      title: 'Baby Hummingbirds',
      fact: "A hummingbird's nest is only the size of a walnut! It's made of spider webs and plant fluff.",
      flowers: 'simple',
    },
    {
      title: 'Hummingbird Colors',
      fact: 'Hummingbird feathers are iridescent — they change color in the light, like a rainbow or a soap bubble!',
      flowers: 'bee-balm',
    },
    {
      title: 'Hummingbird Migration',
      fact: 'Some hummingbirds fly 500 miles across the Gulf of Mexico in ONE NIGHT without stopping!',
      flowers: 'trumpet',
    },
  ];

  kidsPages.forEach((kp, idx) => {
    doc.addPage();
    border(doc);

    doc.font('Helvetica-Bold').fontSize(24).fillColor('#000')
       .text(kp.title, M + 12, M + 18, { width: W - 2 * M - 24, align: 'center' });
    divider(doc, M + 58);

    // Big kids bird, slightly different position each time
    const bx = idx % 2 === 0 ? W / 2 : W / 2 - 10;
    const by = 340 + (idx % 3) * 10;
    drawKidsBird(doc, bx, by, 0.88);

    // Flowers
    if (kp.flowers === 'bee-balm') {
      beeBalmFlower(doc, bx + 210, by - 70, 0.82);
      simplFlower(doc, bx + 200, by + 50, 18, 0.9, 1.5);
    } else if (kp.flowers === 'simple') {
      simplFlower(doc, bx + 200, by - 50, 26, 1.0, 1.8);
      simplFlower(doc, bx + 215, by + 60, 20, 0.9, 1.5);
    } else if (kp.flowers === 'trumpet') {
      trumpetVine(doc, bx + 200, by - 100, 0.8);
    }

    // Big fun fact box for kids
    const fby = H - M - 130;
    doc.save().fillColor('#f9f9f9').strokeColor('#000').lineWidth(1.2)
       .roundedRect(M + 14, fby, W - 2 * M - 28, 122, 8).fillAndStroke().restore();
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#000')
       .text('⭐ Did You Know?', M + 24, fby + 8);
    doc.font('Helvetica').fontSize(10.5).fillColor('#222')
       .text(kp.fact, M + 24, fby + 28, { width: W - 2 * M - 48 });

    // Coloring prompt
    doc.font('Helvetica-BoldOblique').fontSize(9).fillColor('#666')
       .text('Color the hummingbird →  Use RED for the throat, GREEN for the back, and WHITE for the tummy!',
             M + 24, fby + 90, { width: W - 2 * M - 48 });

    footer(doc);
  });

  doc.end();
  await p;
  console.log('  ✓ kids-hummingbird-coloring-pack.pdf');
}

// ═══════════════════════════════════════════════════════════════════════════════
// PDF #6 — Migration Map Coloring Page (2 pages)
// ═══════════════════════════════════════════════════════════════════════════════
async function genMigrationMap() {
  const doc = createDoc();
  const p = writeDoc(doc, 'migration-map-coloring-page.pdf');

  // Page 1: Ruby-throated migration (Eastern US)
  doc.addPage();
  border(doc);
  title(doc, 'Ruby-throated Hummingbird Migration Map');
  subtitle(doc, 'Color the migration routes and mark the cities on the map');
  coloringLine(doc, M + 64);
  divider(doc, M + 80);

  const mapX = M + 12, mapY = M + 92;
  const mapW = W - 2 * M - 24, mapH = H - 2 * M - 220;
  const { x, y } = drawNAMap(doc, mapX, mapY, mapW, mapH);

  // Ruby-throated spring migration route (south to north)
  // Main eastern flyway
  doc.save().strokeColor('#000').lineWidth(2).dash(8, { space: 5 });
  // Gulf crossing path
  doc.moveTo(x(-90), y(21))
     .bezierCurveTo(x(-88), y(24), x(-85), y(27), x(-82), y(30)).stroke();
  // Eastern US migration corridor
  doc.moveTo(x(-82), y(30))
     .bezierCurveTo(x(-80), y(33), x(-78), y(37), x(-76), y(40))
     .bezierCurveTo(x(-75), y(43), x(-74), y(45), x(-73), y(48)).stroke();
  // Interior route
  doc.moveTo(x(-90), y(30))
     .bezierCurveTo(x(-90), y(35), x(-89), y(40), x(-88), y(45))
     .bezierCurveTo(x(-87), y(48), x(-86), y(50), x(-84), y(52)).stroke();
  // Western edge of eastern flyway
  doc.moveTo(x(-98), y(26))
     .bezierCurveTo(x(-96), y(30), x(-94), y(35), x(-92), y(40))
     .bezierCurveTo(x(-90), y(45), x(-89), y(49), x(-87), y(52)).stroke();
  doc.undash().restore();

  // Wintering area shading (Mexico / Central America) - hatching lines
  doc.save().strokeColor('#888').lineWidth(0.5);
  for (let i = 0; i < 8; i++) {
    const lat = 15 + i * 1.2;
    doc.moveTo(x(-90), y(lat)).lineTo(x(-82), y(lat)).stroke();
  }
  doc.restore();

  // City dots
  const cities = [
    { lon: -80, lat: 25.8, label: 'Miami, FL', side: 'right' },
    { lon: -82.5, lat: 28, label: 'Tampa, FL', side: 'left' },
    { lon: -90, lat: 29.9, label: 'New Orleans', side: 'left' },
    { lon: -95, lat: 30, label: 'Houston, TX', side: 'left' },
    { lon: -84.4, lat: 33.8, label: 'Atlanta, GA', side: 'right' },
    { lon: -74, lat: 40.7, label: 'New York', side: 'right' },
    { lon: -77, lat: 38.9, label: 'Washington DC', side: 'right' },
    { lon: -87.6, lat: 41.8, label: 'Chicago', side: 'left' },
    { lon: -93.3, lat: 44.9, label: 'Minneapolis', side: 'left' },
    { lon: -79.4, lat: 43.7, label: 'Toronto', side: 'right' },
    { lon: -89, y: 21, lat: 21, label: 'Yucatan', side: 'right' },
  ];

  cities.forEach(({ lon, lat, label, side }) => {
    mapDot(doc, x(lon), y(lat), label, side);
  });

  // Legend
  const legX = mapX + mapW - 150, legY = mapY + mapH - 100;
  doc.save().fillColor('#fff').strokeColor('#000').lineWidth(0.8)
     .roundedRect(legX, legY, 145, 95, 4).fillAndStroke().restore();
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#000')
     .text('Map Legend', legX + 6, legY + 6);
  doc.save().strokeColor('#000').lineWidth(2).dash(6, { space: 4 })
     .moveTo(legX + 6, legY + 22).lineTo(legX + 40, legY + 22).stroke().undash().restore();
  doc.font('Helvetica').fontSize(7).fillColor('#000')
     .text('Migration route', legX + 44, legY + 18);
  doc.fillColor('#888').circle(legX + 20, legY + 38, 3).fill();
  doc.font('Helvetica').fontSize(7).fillColor('#000').text('City stop', legX + 44, legY + 34);
  doc.save().fillColor('#f0f0f0').strokeColor('#888').lineWidth(0.5)
     .rect(legX + 8, legY + 50, 28, 10).fillAndStroke().restore();
  doc.font('Helvetica').fontSize(7).fillColor('#000').text('Wintering area', legX + 44, legY + 50);

  // Compass rose
  const cmpX = mapX + 40, cmpY = mapY + mapH - 50;
  doc.save().strokeColor('#000').lineWidth(1.2);
  doc.moveTo(cmpX, cmpY - 18).lineTo(cmpX, cmpY + 18).stroke();
  doc.moveTo(cmpX - 18, cmpY).lineTo(cmpX + 18, cmpY).stroke();
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#000')
     .text('N', cmpX - 3, cmpY - 26)
     .text('S', cmpX - 3, cmpY + 20)
     .text('W', cmpX - 26, cmpY - 4)
     .text('E', cmpX + 20, cmpY - 4);
  doc.restore();

  factBox(doc, 'Ruby-throated Migration Facts', [
    'The Ruby-throated Hummingbird migrates up to 1,200 miles between wintering and breeding grounds.',
    'Many birds fly non-stop across the 500-mile Gulf of Mexico — a journey of 18–22 hours.',
    'Spring migration begins in Mexico in late January; birds reach Canada by May–June.',
    'Fall migration starts mid-July for adults; immature birds migrate separately in August–October.',
  ]);
  footer(doc);

  // Page 2: Western species migration
  doc.addPage();
  border(doc);
  title(doc, 'Western Hummingbird Migration Routes');
  subtitle(doc, 'Rufous, Anna’s, Calliope & more — color each route a different color');
  coloringLine(doc, M + 64);
  divider(doc, M + 80);

  const { x: x2, y: y2 } = drawNAMap(doc, mapX, mapY, mapW, mapH);

  // Rufous route (Pacific coast and mountain interior)
  doc.save().strokeColor('#000').lineWidth(2.2).dash(10, { space: 4 });
  doc.moveTo(x2(-104), y2(19))   // Mexico wintering
     .bezierCurveTo(x2(-110), y2(28), x2(-117), y2(35), x2(-122), y2(40))
     .bezierCurveTo(x2(-124), y2(46), x2(-124), y2(50), x2(-128), y2(55)).stroke();
  doc.undash();
  // Rufous fall (interior mountains)
  doc.dash(10, { space: 4 });
  doc.moveTo(x2(-128), y2(55))
     .bezierCurveTo(x2(-118), y2(50), x2(-112), y2(44), x2(-110), y2(38))
     .bezierCurveTo(x2(-107), y2(32), x2(-106), y2(26), x2(-104), y2(19)).stroke();
  doc.undash().restore();

  // Calliope (Rocky Mountains)
  doc.save().strokeColor('#555').lineWidth(1.5).dash(6, { space: 6 });
  doc.moveTo(x2(-106), y2(20))
     .bezierCurveTo(x2(-109), y2(30), x2(-112), y2(40), x2(-115), y2(48))
     .bezierCurveTo(x2(-116), y2(52), x2(-118), y2(56), x2(-120), y2(58)).stroke();
  doc.undash().restore();

  // Black-chinned (desert SW)
  doc.save().strokeColor('#333').lineWidth(1.5).dash(4, { space: 8 });
  doc.moveTo(x2(-104), y2(22))
     .bezierCurveTo(x2(-106), y2(30), x2(-107), y2(36), x2(-108), y2(42))
     .bezierCurveTo(x2(-109), y2(46), x2(-110), y2(50), x2(-110), y2(54)).stroke();
  doc.undash().restore();

  // City dots western
  const westCities = [
    { lon: -122.4, lat: 37.8, label: 'San Francisco', side: 'left' },
    { lon: -118.2, lat: 34.1, label: 'Los Angeles', side: 'left' },
    { lon: -117.2, lat: 32.7, label: 'San Diego', side: 'left' },
    { lon: -112, lat: 33.4, label: 'Phoenix, AZ', side: 'right' },
    { lon: -106.6, lat: 35.1, label: 'Albuquerque', side: 'right' },
    { lon: -104.9, lat: 39.7, label: 'Denver, CO', side: 'right' },
    { lon: -122.3, lat: 47.6, label: 'Seattle, WA', side: 'left' },
    { lon: -122.7, lat: 45.5, label: 'Portland, OR', side: 'left' },
    { lon: -110, lat: 46.9, label: 'Billings, MT', side: 'right' },
  ];
  westCities.forEach(({ lon, lat, label, side }) => {
    mapDot(doc, x2(lon), y2(lat), label, side);
  });

  // Legend
  const leg2X = mapX + mapW - 185, leg2Y = mapY + mapH - 130;
  doc.save().fillColor('#fff').strokeColor('#000').lineWidth(0.8)
     .roundedRect(leg2X, leg2Y, 178, 125, 4).fillAndStroke().restore();
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#000')
     .text('Migration Route Legend', leg2X + 6, leg2Y + 6);

  const legendLines = [
    { dash: [10, 4], lw: 2.2, label: 'Rufous Hummingbird' },
    { dash: [6, 6], lw: 1.5, label: 'Calliope Hummingbird' },
    { dash: [4, 8], lw: 1.5, label: 'Black-chinned Hummingbird' },
  ];
  legendLines.forEach((ll, i) => {
    const ly = leg2Y + 22 + i * 30;
    doc.save().strokeColor('#000').lineWidth(ll.lw).dash(ll.dash[0], { space: ll.dash[1] })
       .moveTo(leg2X + 8, ly).lineTo(leg2X + 46, ly).stroke().undash().restore();
    doc.font('Helvetica').fontSize(7).fillColor('#000')
       .text('Color: ________', leg2X + 50, ly - 4)
       .text(ll.label, leg2X + 50, ly + 5);
  });

  // Compass
  doc.save().strokeColor('#000').lineWidth(1.2);
  doc.moveTo(cmpX, cmpY - 18).lineTo(cmpX, cmpY + 18).stroke();
  doc.moveTo(cmpX - 18, cmpY).lineTo(cmpX + 18, cmpY).stroke();
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#000')
     .text('N', cmpX - 3, cmpY - 26)
     .text('S', cmpX - 3, cmpY + 20)
     .text('W', cmpX - 26, cmpY - 4)
     .text('E', cmpX + 20, cmpY - 4);
  doc.restore();

  factBox(doc, 'Western Migration Facts', [
    'The Rufous Hummingbird has the longest migration of any hummingbird — up to 4,000 miles round trip.',
    'Most western hummingbirds winter in Mexico; some Anna’s Hummingbirds stay year-round on the Pacific Coast.',
    'Calliope Hummingbirds migrate through mountain meadows at elevations up to 12,000 feet.',
    "Hummingbirds use the sun, Earth's magnetic field, and landmarks to navigate during migration.",
  ]);
  footer(doc);

  doc.end();
  await p;
  console.log('  ✓ migration-map-coloring-page.pdf');
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Generating hummingbird coloring page PDFs...');
  console.log(`Output directory: ${OUT}\n`);

  await genRubyThroated();
  await genGardenScene();
  await genSpeciesPack();
  await genAdultColoring();
  await genKidsColoring();
  await genMigrationMap();

  console.log('\nAll PDFs generated successfully!');
}

main().catch((err) => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
