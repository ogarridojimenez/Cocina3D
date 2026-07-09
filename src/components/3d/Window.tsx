"use client";

import { useRef, useMemo, useCallback } from "react";
import { TransformControls as DreiTransformControls } from "@react-three/drei";
import * as THREE from "three";
import { useWallStore, type FurnitureObject } from "@/lib/store";
import { buildGeometry } from "@/components/editor/proceduralGeometry";

interface Props {
  object: FurnitureObject;
}

/**
 * Renderiza una ventana en una pared.
 * La ventana se posiciona sobre la superficie de la pared con marco + cristal.
 * Se puede mover a lo largo de la pared usando el gizmo de transformación.
 */
export function Window({ object }: Props) {
  const groupRef = useRef<THREE.Group>(null);

  const selectObject = useWallStore((s) => s.selectObject);
  const setIsTransforming = useWallStore((s) => s.setIsTransforming);
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);
  const gizmoMode = useWallStore((s) => s.gizmoMode);
  const updateObject = useWallStore((s) => s.updateObject);
  const walls = useWallStore((s) => s.walls);

  const isSelected = selectedObjectId === object.id;

  // Build window geometry (frame + glass)
  const { group } = useMemo(
    () => buildGeometry(object.type, object.color, object.width, object.height, object.depth, object.materialId),
    [object.type, object.color, object.width, object.height, object.depth, object.materialId]
  );

  // Find the wall this window belongs to, and calculate correct position
  const wallTransform = useMemo(() => {
    if (!object.wallId) return null;
    const wall = walls.find((w) => w.id === object.wallId);
    if (!wall) return null;
    const dx = wall.end.x - wall.start.x;
    const dz = wall.end.z - wall.start.z;
    const length = Math.sqrt(dx * dx + dz * dz);
    if (length < 0.001) return null;
    const angle = Math.atan2(dz, dx);
    // The wall's front face in local Z is at +thickness/2
    // Window sits on the wall surface (local Z = wall.thickness / 2 + depth / 2)
    return { wall, dx, dz, length, angle };
  }, [object.wallId, walls]);

  // Position: along the wall on its surface
  const posX = useMemo(() => {
    if (!wallTransform) return object.position.x;
    const t = object.wallOffset ?? 0.5;
    return wallTransform.wall.start.x + t * wallTransform.dx;
  }, [wallTransform, object.position.x, object.wallOffset]);

  const posZ = useMemo(() => {
    if (!wallTransform) return object.position.z;
    const t = object.wallOffset ?? 0.5;
    return wallTransform.wall.start.z + t * wallTransform.dz;
  }, [wallTransform, object.position.z, object.wallOffset]);

  // Rotation to match wall angle
  const rotationY = useMemo(() => {
    if (!wallTransform) return object.rotation;
    return -wallTransform.angle; // Negative because Three.js uses counter-clockwise
  }, [wallTransform, object.rotation]);

  // Handle gizmo transformation to allow moving along the wall
  const handleMouseDownTransform = useCallback(() => {
    setIsTransforming(true);
  }, [setIsTransforming]);

  const handleMouseUpTransform = useCallback(() => {
    setIsTransforming(false);
    if (!groupRef.current || !wallTransform) return;
    const newX = groupRef.current.position.x;
    const newZ = groupRef.current.position.z;
    const dx = newX - wallTransform.wall.start.x;
    const dz = newZ - wallTransform.wall.start.z;
    const newOffset = Math.max(0, Math.min(1,
      (dx * wallTransform.dx + dz * wallTransform.dz) / (wallTransform.length * wallTransform.length)
    ));
    // Snap back to wall line
    const snappedX = wallTransform.wall.start.x + newOffset * wallTransform.dx;
    const snappedZ = wallTransform.wall.start.z + newOffset * wallTransform.dz;
    updateObject(object.id, {
      wallOffset: newOffset,
      position: { x: snappedX, z: snappedZ },
      rotation: -wallTransform.angle,
    });
    // Update actual group position
    if (groupRef.current) {
      groupRef.current.position.x = snappedX;
      groupRef.current.position.z = snappedZ;
    }
  }, [object.id, updateObject, setIsTransforming, wallTransform]);

  // Select on pointer down
  const handlePointerDown = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      selectObject(object.id);
    },
    [object.id, selectObject]
  );

  // Window sits on the wall surface: thickness/2 + depth/2 offset in local Z
  const wallThickness = wallTransform?.wall.thickness ?? 0.15;
  const zOffset = wallThickness / 2 + object.depth / 2;

  return (
    <>
      {isSelected && groupRef.current && (
        <DreiTransformControls
          object={groupRef.current}
          mode={gizmoMode}
          size={0.5}
          showX={true}
          showY={gizmoMode === "translate" ? false : true}
          showZ={gizmoMode === "rotate" ? false : true}
          onMouseDown={handleMouseDownTransform}
          onMouseUp={handleMouseUpTransform}
        />
      )}

      <group
        ref={groupRef}
        position={[
          posX,
          object.posY + object.height / 2,
          posZ + zOffset,
        ]}
        rotation={[0, rotationY, 0]}
        scale={object.scale}
      >
        {/* Window frame + glass geometry from proceduralGeometry */}
        <primitive object={group} />

        {/* Invisible clickable volume */}
        <mesh
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[object.width * 1.2, object.height * 1.2, object.depth * 1.2]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </>
  );
}
