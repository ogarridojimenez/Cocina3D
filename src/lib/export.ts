import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

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

/** Take a screenshot of the canvas and download it */
export function screenshotCanvas(canvas: HTMLCanvasElement) {
  const dataUrl = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "cocina3d-captura.png";
  a.click();
}
