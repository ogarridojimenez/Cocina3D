import * as THREE from "three";
import { getMaterial } from "@/data/materials";

// ── Cache de texturas ──────────────────────────────────
const textureCache = new Map<string, THREE.CanvasTexture>();

function generateAlbedo(materialId: string, baseColor: string): THREE.CanvasTexture {
  const cacheKey = `albedo-${materialId}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey)!;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const size = 256;

  const c = new THREE.Color(baseColor);

  switch (materialId) {
    // ── Madera: vetas sinusoidales ──────────────────────
    case "oak":
    case "walnut":
    case "pine":
    case "wenge":
    case "cherry": {
      const darkScale = materialId === "wenge" ? 0.15 : materialId === "cherry" ? 0.25 : 0.3;
      for (let y = 0; y < size; y++) {
        const v = Math.sin(y * 0.08 + Math.sin(y * 0.03) * 3) * 0.5 + 0.5;
        const grain = v * 0.3 + 0.7;
        const noise = (Math.random() - 0.5) * 0.05;
        const r = Math.round(c.r * 255 * grain + noise * 255);
        const g = Math.round(c.g * 255 * grain + noise * 255);
        const b = Math.round(c.b * 255 * grain + noise * 255);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, size, 1);
      }
      // Knot holes
      for (let i = 0; i < 3; i++) {
        const kx = Math.random() * size;
        const ky = Math.random() * size;
        ctx.fillStyle = `rgba(0,0,0,${0.15 + Math.random() * 0.15})`;
        ctx.beginPath();
        ctx.ellipse(kx, ky, 4 + Math.random() * 6, 2 + Math.random() * 3, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    // ── Mármol: veteado suave ───────────────────────────
    case "marble": {
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const v = Math.sin(x * 0.05 + y * 0.03 + Math.sin(x * 0.02 + y * 0.01) * 2) * 0.5 + 0.5;
          const vein = v * 0.08;
          const r = Math.min(255, c.r * 255 + vein * 255);
          const g = Math.min(255, c.g * 255 + vein * 255);
          const b = Math.min(255, c.b * 255 + vein * 255);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
      break;
    }

    // ── Granito: ruido de sal y pimienta ────────────────
    case "granite": {
      const imageData = ctx.createImageData(size, size);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise2 = (Math.random() - 0.5) * 0.3;
        imageData.data[i] = Math.round((c.r + noise2) * 255);
        imageData.data[i + 1] = Math.round((c.g + noise2) * 255);
        imageData.data[i + 2] = Math.round((c.b + noise2) * 255);
        imageData.data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      break;
    }

    // ── Pizarra: ruido oscuro con venas finas ───────────
    case "slate": {
      for (let y = 0; y < size; y++) {
        const vein = Math.sin(y * 0.1 + Math.sin(y * 0.05) * 5) * 0.5 + 0.5;
        const noise2 = (Math.random() - 0.5) * 0.1;
        const r = Math.max(0, Math.min(255, c.r * 255 + vein * 40 + noise2 * 255));
        const g = Math.max(0, Math.min(255, c.g * 255 + vein * 30 + noise2 * 255));
        const b = Math.max(0, Math.min(255, c.b * 255 + vein * 20 + noise2 * 255));
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, size, 1);
      }
      break;
    }

    // ── Acero: rayas de cepillado ──────────────────────
    case "steel": {
      for (let y = 0; y < size; y++) {
        const brush = Math.sin(y * 0.5 + Math.random() * 0.5) * 0.5 + 0.5;
        const noise = (Math.random() - 0.5) * 0.04;
        const r = Math.round((c.r + brush * 0.1 + noise) * 255);
        const g = Math.round((c.g + brush * 0.1 + noise) * 255);
        const b = Math.round((c.b + brush * 0.1 + noise) * 255);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, size, 1);
      }
      break;
    }

    // ── Latón ──────────────────────────────────────────
    case "brass": {
      for (let y = 0; y < size; y++) {
        const grain = Math.sin(y * 0.3 + Math.sin(y * 0.08) * 2) * 0.5 + 0.5;
        const noise = (Math.random() - 0.5) * 0.03;
        const r = Math.round((c.r + grain * 0.08 + noise) * 255);
        const g = Math.round((c.g + grain * 0.08 + noise) * 255);
        const b = Math.round((c.b + grain * 0.08 + noise) * 255);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, size, 1);
      }
      break;
    }

    default: {
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, size, size);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  textureCache.set(cacheKey, tex);
  return tex;
}

function generateNormalMap(materialId: string): THREE.CanvasTexture {
  const cacheKey = `normal-${materialId}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey)!;

  // Reuse the same generator for perceived similarity
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const imgData = ctx.createImageData(256, 256);

  // Generate height field
  const height = new Float32Array(256 * 256);
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      let h = 0;
      switch (materialId) {
        case "oak":
        case "walnut":
        case "pine":
        case "wenge":
        case "cherry":
          h = Math.sin(x * 0.15 + Math.sin(y * 0.03) * 3) * 0.3
            + Math.sin(x * 0.3 + y * 0.1) * 0.1
            + (Math.random() - 0.5) * 0.1;
          break;
        case "marble":
          h = Math.sin(x * 0.05 + y * 0.03 + Math.sin(x * 0.02 + y * 0.01) * 2) * 0.5
            + (Math.random() - 0.5) * 0.1;
          break;
        case "granite":
          h = (Math.random() - 0.5) * 0.4;
          break;
        case "slate":
          h = Math.sin(y * 0.1 + Math.sin(y * 0.05) * 5) * 0.3
            + (Math.random() - 0.5) * 0.15;
          break;
        case "steel":
          h = Math.sin(y * 0.5) * 0.15 + (Math.random() - 0.5) * 0.02;
          break;
        case "brass":
          h = Math.sin(y * 0.3 + Math.sin(y * 0.08) * 2) * 0.2
            + (Math.random() - 0.5) * 0.03;
          break;
        default:
          h = (Math.random() - 0.5) * 0.1;
      }
      height[y * 256 + x] = h;
    }
  }

  // Sobel filter → normal map
  for (let y = 1; y < 255; y++) {
    for (let x = 1; x < 255; x++) {
      const idx = y * 256 + x;
      const dx =
        (height[idx - 257] - height[idx - 255]) * 0.25 +
        (height[idx - 1] - height[idx + 1]) * 0.5 +
        (height[idx + 255] - height[idx + 257]) * 0.25;
      const dy =
        (height[idx - 257] - height[idx + 255]) * 0.25 +
        (height[idx - 256] - height[idx + 256]) * 0.5 +
        (height[idx - 255] - height[idx + 257]) * 0.25;

      const nx = -dx;
      const ny = -dy;
      const nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);

      const pi = idx * 4;
      imgData.data[pi] = Math.round((nx / len * 0.5 + 0.5) * 255);
      imgData.data[pi + 1] = Math.round((ny / len * 0.5 + 0.5) * 255);
      imgData.data[pi + 2] = Math.round((nz / len * 0.5 + 0.5) * 255);
      imgData.data[pi + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  textureCache.set(cacheKey, tex);
  return tex;
}

// ── Main builder ────────────────────────────────────────
export function buildPBRMaterial(
  materialId: string | null,
  baseColor: string
): THREE.MeshStandardMaterial {
  if (!materialId) {
    return new THREE.MeshStandardMaterial({ color: baseColor });
  }

  const def = getMaterial(materialId);
  if (!def) {
    return new THREE.MeshStandardMaterial({ color: baseColor });
  }

  const albedo = generateAlbedo(materialId, def.baseColor);
  const normal = generateNormalMap(materialId);

  const mat = new THREE.MeshStandardMaterial({
    map: albedo,
    normalMap: normal,
    roughness: def.roughness,
    metalness: def.metalness,
    color: 0xffffff,
    normalScale: new THREE.Vector2(1, 1),
  });

  return mat;
}

export function clearMaterialCache() {
  textureCache.clear();
}