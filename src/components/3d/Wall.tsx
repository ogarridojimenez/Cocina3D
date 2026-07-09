"use client";

import { useRef, useMemo, useCallback } from "react";
import { Mesh, RepeatWrapping, Shape, Path, ExtrudeGeometry, BoxGeometry } from "three";
import {
  TransformControls as DreiTransformControls,
  useTexture,
} from "@react-three/drei";
import { useWallStore, type Wall as WallType, type FurnitureObject } from "@/lib/store";
import { getTextureDef, type TextureDef } from "@/data/textures";

function getWallTransform(wall: WallType) {
  const dx = wall.end.x - wall.start.x;
  const dz = wall.end.z - wall.start.z;
  const length = Math.sqrt(dx * dx + dz * dz);
  if (length < 0.001) return null;
  const midX = (wall.start.x + wall.end.x) / 2;
  const midZ = (wall.start.z + wall.end.z) / 2;
  const angle = Math.atan2(dz, dx);
  return {
    length,
    midX,
    midZ,
    angle,
    height: wall.height,
    thickness: wall.thickness,
  };
}

/**
 * Build wall geometry — with optional rectangular holes for windows.
 * Uses a custom Shape + ExtrudeGeometry when holes are present,
 * otherwise falls back to a simple BoxGeometry.
 */
function buildWallGeometry(
  length: number,
  height: number,
  thickness: number,
  holes: { x: number; y: number; w: number; h: number }[]
) {
  if (holes.length === 0) {
    // No holes → standard BoxGeometry
    return new BoxGeometry(length, height, thickness);
  }

  // Shape in the XY plane (wall front face), extruded along Z for thickness
  const shape = new Shape();
  const hw = length / 2;
  const hh = height / 2;
  shape.moveTo(-hw, -hh);
  shape.lineTo(hw, -hh);
  shape.lineTo(hw, hh);
  shape.lineTo(-hw, hh);
  shape.closePath();

  for (const hole of holes) {
    const path = new Path();
    const hx = hole.x - hw; // Convert from centered coords to shape-local
    const hy = hole.y - hh;
    path.moveTo(hx, hy);
    path.lineTo(hx + hole.w, hy);
    path.lineTo(hx + hole.w, hy + hole.h);
    path.lineTo(hx, hy + hole.h);
    path.closePath();
    shape.holes.push(path);
  }

  const extrudeSettings = {
    steps: 1,
    depth: thickness,
    bevelEnabled: false,
  };

  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  // Center the extrusion on Z axis
  geometry.translate(0, 0, -thickness / 2);
  return geometry;
}

/**
 * Get windows that belong to a specific wall, in wall-local coordinates.
 */
function getWindowsOnWall(wall: WallType, objects: FurnitureObject[]): { x: number; y: number; w: number; h: number }[] {
  const dx = wall.end.x - wall.start.x;
  const dz = wall.end.z - wall.start.z;
  const length = Math.sqrt(dx * dx + dz * dz);
  if (length < 0.001) return [];

  return objects
    .filter((o) => o.type === "window" && o.wallId === wall.id)
    .map((win) => {
      const offset = win.wallOffset ?? 0.5;
      // Wall-local X coordinate (centered)
      const localX = (offset - 0.5) * length;
      // Wall-local Y coordinate (centered): posY + height/2 is the center of the window
      // relative to floor. The wall center is at height/2.
      const localY = (win.posY + win.height / 2) - wall.height / 2;
      return {
        x: localX - win.width / 2,
        y: localY - win.height / 2,
        w: win.width,
        h: win.height,
      };
    });
}

/** Subcomponente que aplica textura (useTexture solo se llama si hay textura) */
function TexturedWallMesh({
  wall,
  t,
  texDef,
  isSelected,
  holes,
}: {
  wall: WallType;
  t: NonNullable<ReturnType<typeof getWallTransform>>;
  texDef: TextureDef;
  isSelected: boolean;
  holes: { x: number; y: number; w: number; h: number }[];
}) {
  const meshRef = useRef<Mesh>(null);
  const selectWall = useWallStore((s) => s.selectWall);
  const drawMode = useWallStore((s) => s.drawMode);
  const updateWall = useWallStore((s) => s.updateWall);
  const setIsTransforming = useWallStore((s) => s.setIsTransforming);
  const selectedWallId = useWallStore((s) => s.selectedWallId);

  const [albedo, normal, roughness] = useTexture([
    texDef.maps.albedo,
    texDef.maps.normal!,
    texDef.maps.roughness!,
  ]);

  // Tilear texturas según dimensiones de la pared
  useMemo(() => {
    const scale = texDef.scale || 1;
    const repeatU = t.length / scale;
    const repeatV = t.height / scale;
    [albedo, normal, roughness].forEach((tex) => {
      if (tex) {
        tex.wrapS = tex.wrapT = RepeatWrapping;
        tex.repeat.set(repeatU, repeatV);
      }
    });
  }, [albedo, normal, roughness, t.length, t.height, texDef.scale]);

  const handleMouseDown = useCallback(
    () => setIsTransforming(true),
    [setIsTransforming]
  );
  const handleMouseUp = useCallback(() => {
    setIsTransforming(false);
    if (!meshRef.current) return;
    const newX = meshRef.current.position.x;
    const newZ = meshRef.current.position.z;
    const dx2 = newX - t.midX;
    const dz2 = newZ - t.midZ;
    if (Math.abs(dx2) > 0.001 || Math.abs(dz2) > 0.001) {
      updateWall(wall.id, {
        start: { x: wall.start.x + dx2, z: wall.start.z + dz2 },
        end: { x: wall.end.x + dx2, z: wall.end.z + dz2 },
      });
    }
  }, [t, wall.id, wall.start, wall.end, updateWall, setIsTransforming]);

  const extendedLength = t.length + wall.thickness;

  // Build geometry with or without holes
  const wallGeometry = useMemo(
    () => buildWallGeometry(extendedLength, t.height, t.thickness, holes),
    [extendedLength, t.height, t.thickness, holes]
  );

  return (
    <>
      {isSelected && meshRef.current && (
        <DreiTransformControls
          object={meshRef.current}
          mode="translate"
          size={0.5}
          showY={false}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      )}
      <mesh
        ref={meshRef}
        position={[t.midX, t.height / 2, t.midZ]}
        rotation={[0, -t.angle, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (drawMode === "none") selectWall(wall.id);
        }}
      >
        <primitive object={wallGeometry} attach="geometry" />
        <meshStandardMaterial
          color={isSelected ? "#3B82F6" : wall.color}
          map={albedo}
          normalMap={normal}
          roughnessMap={roughness}
          roughness={1}
          metalness={0}
          emissive={isSelected ? "#1E40AF" : "#000000"}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
    </>
  );
}

/** Pared sin textura (color sólido) */
function SolidWallMesh({
  wall,
  t,
  isSelected,
  holes,
}: {
  wall: WallType;
  t: NonNullable<ReturnType<typeof getWallTransform>>;
  isSelected: boolean;
  holes: { x: number; y: number; w: number; h: number }[];
}) {
  const meshRef = useRef<Mesh>(null);
  const selectWall = useWallStore((s) => s.selectWall);
  const drawMode = useWallStore((s) => s.drawMode);
  const updateWall = useWallStore((s) => s.updateWall);
  const setIsTransforming = useWallStore((s) => s.setIsTransforming);
  const selectedWallId = useWallStore((s) => s.selectedWallId);

  const handleMouseDown = useCallback(
    () => setIsTransforming(true),
    [setIsTransforming]
  );
  const handleMouseUp = useCallback(() => {
    setIsTransforming(false);
    if (!meshRef.current) return;
    const newX = meshRef.current.position.x;
    const newZ = meshRef.current.position.z;
    const dx2 = newX - t.midX;
    const dz2 = newZ - t.midZ;
    if (Math.abs(dx2) > 0.001 || Math.abs(dz2) > 0.001) {
      updateWall(wall.id, {
        start: { x: wall.start.x + dx2, z: wall.start.z + dz2 },
        end: { x: wall.end.x + dx2, z: wall.end.z + dz2 },
      });
    }
  }, [t, wall.id, wall.start, wall.end, updateWall, setIsTransforming]);

  const extendedLength = t.length + wall.thickness;

  // Build geometry with or without holes
  const wallGeometry = useMemo(
    () => buildWallGeometry(extendedLength, t.height, t.thickness, holes),
    [extendedLength, t.height, t.thickness, holes]
  );

  return (
    <>
      {isSelected && meshRef.current && (
        <DreiTransformControls
          object={meshRef.current}
          mode="translate"
          size={0.5}
          showY={false}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      )}
      <mesh
        ref={meshRef}
        position={[t.midX, t.height / 2, t.midZ]}
        rotation={[0, -t.angle, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (drawMode === "none") selectWall(wall.id);
        }}
      >
        <primitive object={wallGeometry} attach="geometry" />
        <meshStandardMaterial
          color={isSelected ? "#3B82F6" : wall.color}
          roughness={0.8}
          metalness={0.1}
          emissive={isSelected ? "#1E40AF" : "#000000"}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
    </>
  );
}

/** Componente principal — decide si usar textura o color sólido */
export function Wall({ wall }: { wall: WallType }) {
  const selectedWallId = useWallStore((s) => s.selectedWallId);
  const objects = useWallStore((s) => s.objects);
  const t = useMemo(() => getWallTransform(wall), [wall]);
  const isSelected = selectedWallId === wall.id;
  const texDef = useMemo(() => getTextureDef(wall.textureId), [wall.textureId]);

  // Compute holes for windows on this wall
  const holes = useMemo(() => getWindowsOnWall(wall, objects), [wall, objects]);

  if (!t) return null;

  if (texDef) {
    return (
      <TexturedWallMesh
        wall={wall}
        t={t}
        texDef={texDef}
        isSelected={isSelected}
        holes={holes}
      />
    );
  }

  return <SolidWallMesh wall={wall} t={t} isSelected={isSelected} holes={holes} />;
}
