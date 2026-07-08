"use client";

import { useRef, useMemo, useCallback } from "react";
import { Mesh, RepeatWrapping } from "three";
import {
  TransformControls as DreiTransformControls,
  useTexture,
} from "@react-three/drei";
import { useWallStore, type Wall as WallType } from "@/lib/store";
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

/** Subcomponente que aplica textura (useTexture solo se llama si hay textura) */
function TexturedWallMesh({
  wall,
  t,
  texDef,
  isSelected,
}: {
  wall: WallType;
  t: NonNullable<ReturnType<typeof getWallTransform>>;
  texDef: TextureDef;
  isSelected: boolean;
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
    const dx = newX - t.midX;
    const dz = newZ - t.midZ;
    if (Math.abs(dx) > 0.001 || Math.abs(dz) > 0.001) {
      updateWall(wall.id, {
        start: { x: wall.start.x + dx, z: wall.start.z + dz },
        end: { x: wall.end.x + dx, z: wall.end.z + dz },
      });
    }
  }, [t, wall.id, wall.start, wall.end, updateWall, setIsTransforming]);

  const extendedLength = t.length + wall.thickness;

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
        <boxGeometry args={[extendedLength, t.height, t.thickness]} />
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
}: {
  wall: WallType;
  t: NonNullable<ReturnType<typeof getWallTransform>>;
  isSelected: boolean;
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
    const dx = newX - t.midX;
    const dz = newZ - t.midZ;
    if (Math.abs(dx) > 0.001 || Math.abs(dz) > 0.001) {
      updateWall(wall.id, {
        start: { x: wall.start.x + dx, z: wall.start.z + dz },
        end: { x: wall.end.x + dx, z: wall.end.z + dz },
      });
    }
  }, [t, wall.id, wall.start, wall.end, updateWall, setIsTransforming]);

  const extendedLength = t.length + wall.thickness;

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
        <boxGeometry args={[extendedLength, t.height, t.thickness]} />
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
  const t = useMemo(() => getWallTransform(wall), [wall]);
  const isSelected = selectedWallId === wall.id;
  const texDef = useMemo(() => getTextureDef(wall.textureId), [wall.textureId]);

  if (!t) return null;

  if (texDef) {
    return (
      <TexturedWallMesh
        wall={wall}
        t={t}
        texDef={texDef}
        isSelected={isSelected}
      />
    );
  }

  return <SolidWallMesh wall={wall} t={t} isSelected={isSelected} />;
}
