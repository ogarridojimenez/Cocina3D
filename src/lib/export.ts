import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import type { Wall, FurnitureObject } from "./store";

/** Export the Three.js scene to a GLTF file and trigger download */
export function exportGLTF(scene: THREE.Scene, filename = "cocina3d-diseno.glb") {
  const exporter = new GLTFExporter();

  exporter.parse(
    scene,
    (gltf) => {
      const blob = new Blob([gltf as ArrayBuffer], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    },
    (error) => console.error("GLTF export error:", error),
    { binary: true, trs: true, onlyVisible: true }
  );
}

/** Force render and take screenshot */
export function screenshotCanvas(canvas: HTMLCanvasElement) {
  // Force a render to ensure the framebuffer is up to date
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (gl) {
    gl.finish();
  }
  const dataUrl = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "cocina3d-captura.png";
  a.click();
}

/** Save current scene as a JSON file */
export function saveSceneFile(walls: Wall[], objects: FurnitureObject[]) {
  const data = { walls, objects };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cocina3d-escena.json";
  a.click();
  URL.revokeObjectURL(url);
}

/** Load a scene from a JSON file - returns parsed data or null */
export function loadSceneFile(): Promise<{ walls: Wall[]; objects: FurnitureObject[] } | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (data.walls && data.objects) {
            resolve(data);
          } else {
            alert("Formato de archivo inválido");
            resolve(null);
          }
        } catch {
          alert("Error al leer el archivo");
          resolve(null);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  });
}
