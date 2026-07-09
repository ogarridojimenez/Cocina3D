"use client";

import { useRef, useEffect } from "react";
import { useWallStore, type Wall, type FurnitureObject } from "@/lib/store";
import { getCatalogItem } from "@/data/catalog";

const SCALE = 50; // 1 unidad 3D = 50 píxeles

/** Convierte coordenadas 3D (x, z) a coordenadas canvas 2D */
function toCanvas(
  x: number,
  z: number,
  cx: number,
  cy: number
): [number, number] {
  return [cx + x * SCALE, cy - z * SCALE];
}

/** Dibuja la cuadrícula de fondo */
function drawGrid(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  W: number,
  H: number
) {
  const gridSize = 20; // unidades totales desde el centro
  const majorEvery = 5;

  for (let i = -gridSize; i <= gridSize; i++) {
    const isMajor = i % majorEvery === 0;
    ctx.strokeStyle = isMajor
      ? "rgba(100, 116, 139, 0.30)"
      : "rgba(100, 116, 139, 0.10)";
    ctx.lineWidth = isMajor ? 1 : 0.5;

    // Línea vertical (x constante)
    const vx = cx + i * SCALE;
    ctx.beginPath();
    ctx.moveTo(vx, 0);
    ctx.lineTo(vx, H);
    ctx.stroke();

    // Línea horizontal (z constante)
    const hz = cy - i * SCALE;
    ctx.beginPath();
    ctx.moveTo(0, hz);
    ctx.lineTo(W, hz);
    ctx.stroke();
  }

  // Marcador del origen (0,0)
  ctx.fillStyle = "#3b82f6";
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();

  // Etiqueta del origen
  ctx.fillStyle = "rgba(59, 130, 246, 0.6)";
  ctx.font = "10px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.fillText("(0,0)", cx + 5, cy - 5);
}

/** Dibuja una pared en vista planta (rectángulo rotado) */
function drawWall(
  ctx: CanvasRenderingContext2D,
  wall: Wall,
  cx: number,
  cy: number,
  selected: boolean
) {
  const dx = wall.end.x - wall.start.x;
  const dz = wall.end.z - wall.start.z;
  const length = Math.sqrt(dx * dx + dz * dz);
  if (length < 0.001) return;

  const angle = Math.atan2(dz, dx);
  const midX = (wall.start.x + wall.end.x) / 2;
  const midZ = (wall.start.z + wall.end.z) / 2;

  const [px, py] = toCanvas(midX, midZ, cx, cy);

  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(-angle);

  const w = length * SCALE;
  const h = wall.thickness * SCALE;

  // Relleno
  ctx.fillStyle = selected ? "#3b82f6" : wall.color;
  ctx.fillRect(-w / 2, -h / 2, w, h);

  // Borde
  ctx.strokeStyle = selected ? "#60a5fa" : "rgba(0, 0, 0, 0.35)";
  ctx.lineWidth = selected ? 2 : 1;
  ctx.strokeRect(-w / 2, -h / 2, w, h);

  ctx.restore();
}

/** Dibuja un objeto mueble en vista planta (rectángulo con etiqueta) */
function drawObject(
  ctx: CanvasRenderingContext2D,
  obj: FurnitureObject,
  cx: number,
  cy: number,
  selected: boolean
) {
  const [px, py] = toCanvas(obj.position.x, obj.position.z, cx, cy);

  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(-obj.rotation);

  const w = obj.width * SCALE;
  const d = obj.depth * SCALE;

  // Sombra ligera
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(-w / 2 + 2, -d / 2 + 2, w, d);

  // Relleno
  ctx.fillStyle = selected ? "#3b82f6" : obj.color;
  ctx.fillRect(-w / 2, -d / 2, w, d);

  // Borde
  ctx.strokeStyle = selected ? "#60a5fa" : "rgba(0, 0, 0, 0.4)";
  ctx.lineWidth = selected ? 2 : 1;
  ctx.strokeRect(-w / 2, -d / 2, w, d);

  // --- Dibujar extensiones en L (mesetas) ---
  if (obj.lWidthX > 0 || obj.lWidthZ > 0) {
    const lw = obj.lWidthX > 0 ? obj.lWidthX : 0;
    const lz = obj.lWidthZ > 0 ? obj.lWidthZ : 0;

    ctx.fillStyle = selected ? "#60a5fa" : "rgba(255, 255, 255, 0.15)";

    if (lw > 0) {
      // Extensión en X (derecha)
      const extW = lw * SCALE;
      ctx.fillRect(w / 2, -d / 2, extW, d);
      ctx.strokeRect(w / 2, -d / 2, extW, d);
    }
    if (lz > 0) {
      // Extensión en Z (adelante)
      const extD = lz * SCALE;
      ctx.fillRect(-w / 2, d / 2, w, extD);
      ctx.strokeRect(-w / 2, d / 2, w, extD);
    }
  }

  // --- Etiqueta del objeto ---
  ctx.fillStyle = selected
    ? "#ffffff"
    : "rgba(255, 255, 255, 0.85)";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
  ctx.lineWidth = 2;
  ctx.font = "bold 10px 'Inter', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Nombre legible del catálogo
  let label: string = obj.type;
  try {
    const cat = getCatalogItem(obj.type);
    if (cat) label = cat.name;
  } catch {
    // fallback al type
  }

  // Si es muy largo, acortar
  if (label.length > 14) label = label.slice(0, 12) + "…";

  ctx.strokeText(label, 0, 0);
  ctx.fillText(label, 0, 0);

  ctx.restore();
}

// ─── Componente principal ────────────────────────────

export function PlantView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const walls = useWallStore((s) => s.walls);
  const objects = useWallStore((s) => s.objects);
  const selectedWallId = useWallStore((s) => s.selectedWallId);
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const render = () => {
      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      const dpr = devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fondo
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      // 1. Grid
      drawGrid(ctx, cx, cy, W, H);

      // 2. Paredes (debajo de los objetos)
      for (const wall of walls) {
        drawWall(ctx, wall, cx, cy, wall.id === selectedWallId);
      }

      // 3. Objetos (encima de las paredes)
      for (const obj of objects) {
        drawObject(ctx, obj, cx, cy, obj.id === selectedObjectId);
      }
    };

    render();

    const observer = new ResizeObserver(render);
    observer.observe(container);
    return () => observer.disconnect();
  }, [walls, objects, selectedWallId, selectedObjectId]);

  return (
    <div
      ref={containerRef}
      className="flex-1 relative overflow-hidden"
      style={{ background: "#0f172a" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ display: "block" }}
      />
    </div>
  );
}
