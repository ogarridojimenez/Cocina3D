"use client";

import { useRef, useCallback, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWallStore, type Point2D } from "@/lib/store";

// ── Helpers ────────────────────────────────────────

const SNAP_THRESHOLD = 15 * (Math.PI / 180); // 15° en radianes
const ENDPOINT_SNAP_DIST = 0.3; // metros

function snapAngle(dx: number, dz: number): { dx: number; dz: number } {
  const angle = Math.atan2(dz, dx);
  const snapped = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
  if (Math.abs(angle - snapped) < SNAP_THRESHOLD) {
    const len = Math.sqrt(dx * dx + dz * dz);
    return { dx: Math.cos(snapped) * len, dz: Math.sin(snapped) * len };
  }
  return { dx, dz };
}

function segmentsIntersect(a: Point2D, b: Point2D, c: Point2D, d: Point2D): boolean {
  const det = (b.x - a.x) * (d.z - c.z) - (b.z - a.z) * (d.x - c.x);
  if (Math.abs(det) < 1e-10) return false;
  const t = ((c.x - a.x) * (d.z - c.z) - (c.z - a.z) * (d.x - c.x)) / det;
  const u = ((c.x - a.x) * (b.z - a.z) - (c.z - a.z) * (b.x - a.x)) / det;
  return t > 0 && t < 1 && u > 0 && u < 1;
}

function wouldIntersect(newStart: Point2D, newEnd: Point2D): boolean {
  const walls = useWallStore.getState().walls;
  for (const w of walls) {
    if (segmentsIntersect(newStart, newEnd, w.start, w.end)) return true;
  }
  return false;
}

function snapToEndpoint(p: Point2D): Point2D | null {
  const walls = useWallStore.getState().walls;
  for (const w of walls) {
    for (const ep of [w.start, w.end]) {
      const dist = Math.sqrt((p.x - ep.x) ** 2 + (p.z - ep.z) ** 2);
      if (dist < ENDPOINT_SNAP_DIST) return ep;
    }
  }
  return null;
}

// ── Component ──────────────────────────────────────

export function WallDrawMode() {
  const { camera, pointer, raycaster } = useThree();
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const previewRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<Point2D[]>([]);

  const drawMode = useWallStore((s) => s.drawMode);
  const addWall = useWallStore((s) => s.addWall);
  const setDrawMode = useWallStore((s) => s.setDrawMode);
  const selectWall = useWallStore((s) => s.selectWall);

  const getConfig = useCallback(() => {
    const raw = sessionStorage.getItem("wallConfig");
    if (!raw) return { altura: 2.4, largo: 2, grosor: 0.1, modoDibujo: "drag" as const };
    return JSON.parse(raw) as { altura: number; largo: number; grosor: number; modoDibujo: "point" | "drag" };
  }, []);

  const getGroundPoint = useCallback((): Point2D | null => {
    raycaster.setFromCamera(pointer, camera);
    const intersect = new THREE.Vector3();
    raycaster.ray.intersectPlane(planeRef.current, intersect);
    if (!intersect) return null;
    return { x: intersect.x, z: intersect.z };
  }, [camera, pointer, raycaster]);

  // ── Mousedown ──
  const handleDown = useCallback(() => {
    if (drawMode === "none") return;
    const p = getGroundPoint();
    if (!p) return;
    const config = getConfig();

    if (drawMode === "drag") {
      useWallStore.getState().setDrawStart(p);
    } else if (drawMode === "point") {
      pointsRef.current.push(p);
      if (pointsRef.current.length >= 2) {
        const prev = pointsRef.current[pointsRef.current.length - 2];
        const curr = pointsRef.current[pointsRef.current.length - 1];
        if (!wouldIntersect(prev, curr)) {
          addWall(prev, curr, config.altura, config.grosor);
        }
      }
    }
  }, [drawMode, getGroundPoint, getConfig, addWall]);

  // ── Mouseup ──
  const handleUp = useCallback(() => {
    if (drawMode !== "drag") return;
    const store = useWallStore.getState();
    const start = store.drawState.start;
    if (!start) return;
    const p = getGroundPoint();
    if (!p) return;
    const config = getConfig();

    if (wouldIntersect(start, p)) return;
    addWall(start, p, config.altura, config.grosor);
    store.clearDraw();
  }, [drawMode, getGroundPoint, getConfig, addWall]);

  // ── Keyboard handlers (siempre activos) ──
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Enter → cerrar perímetro (modo punto a punto)
      if (e.key === "Enter" && drawMode === "point") {
        e.preventDefault();
        const pts = pointsRef.current;
        if (pts.length >= 3) {
          const last = pts[pts.length - 1];
          if (!wouldIntersect(last, pts[0])) {
            const config = getConfig();
            addWall(last, pts[0], config.altura, config.grosor);
          }
        }
        pointsRef.current = [];
        setDrawMode("none");
        useWallStore.getState().clearDraw();
        document.body.style.cursor = "default";
      }

      // Escape → cancelar dibujo o deseleccionar
      if (e.key === "Escape") {
        if (drawMode !== "none") {
          pointsRef.current = [];
          setDrawMode("none");
          useWallStore.getState().clearDraw();
          document.body.style.cursor = "default";
        } else {
          selectWall(null); // Deseleccionar pared
        }
      }

      // Undo/Redo
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        useWallStore.temporal.getState().undo();
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        useWallStore.temporal.getState().redo();
      }
    },
    [drawMode, getConfig, addWall, setDrawMode, selectWall]
  );

  // ── Delete wall handler (siempre activo) ──
  const handleDelete = useCallback((e: KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const selected = useWallStore.getState().selectedWallId;
      if (selected) {
        e.preventDefault();
        useWallStore.getState().removeWall(selected);
      }
    }
  }, []);

  // ── Eventos ──
  useEffect(() => {
    if (drawMode === "none") {
      document.body.style.cursor = "default";
    } else {
      document.body.style.cursor = "crosshair";
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawMode]);

  useEffect(() => {
    if (drawMode === "none") return;
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    canvas.addEventListener("pointerdown", handleDown);
    canvas.addEventListener("pointerup", handleUp);
    return () => {
      canvas.removeEventListener("pointerdown", handleDown);
      canvas.removeEventListener("pointerup", handleUp);
    };
  }, [drawMode, handleDown, handleUp]);

  // Keyboard handlers SIEMPRE activos
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleDelete);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleDelete);
    };
  }, [handleKeyDown, handleDelete]);

  // ── Preview ──
  useFrame(() => {
    const store = useWallStore.getState();
    if (store.drawMode !== "drag" || !store.drawState.start) {
      if (previewRef.current) previewRef.current.visible = false;
      return;
    }

    const p = getGroundPoint();
    if (!p) return;

    const start = store.drawState.start;
    let dx = p.x - start.x;
    let dz = p.z - start.z;
    const snapped = snapAngle(dx, dz);
    const endSnapped: Point2D = { x: start.x + snapped.dx, z: start.z + snapped.dz };

    const ep = snapToEndpoint(endSnapped);
    const finalEnd = ep || endSnapped;

    if (previewRef.current) {
      const len = Math.sqrt((finalEnd.x - start.x) ** 2 + (finalEnd.z - start.z) ** 2);
      const midX = (start.x + finalEnd.x) / 2;
      const midZ = (start.z + finalEnd.z) / 2;
      const angle = Math.atan2(finalEnd.z - start.z, finalEnd.x - start.x);
      const config = getConfig();
      previewRef.current.position.set(midX, config.altura / 2, midZ);
      previewRef.current.rotation.set(0, -angle, 0);
      previewRef.current.scale.set(len, config.altura, config.grosor);
      previewRef.current.visible = true;
    }

    store.setDrawCurrent(finalEnd);
  });

  return (
    <group>
      <mesh ref={previewRef} visible={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3B82F6" transparent opacity={0.4} roughness={0.8} />
      </mesh>
    </group>
  );
}
