"use client";

import { useRef, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { TransformControls as DreiTransformControls } from "@react-three/drei";
import * as THREE from "three";
import { useWallStore, type FurnitureObject } from "@/lib/store";
import { getCatalogItem } from "@/data/catalog";
import { buildGeometry } from "@/components/editor/proceduralGeometry";

interface Props {
  object: FurnitureObject;
}

export function FurnitureMesh({ object }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const doorRef = useRef<THREE.Group>(null);
  const animProgress = useRef(object.animated ? 1 : 0);

  const selectObject = useWallStore((s) => s.selectObject);
  const toggleAnimation = useWallStore((s) => s.toggleAnimation);
  const setIsTransforming = useWallStore((s) => s.setIsTransforming);
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);
  const gizmoMode = useWallStore((s) => s.gizmoMode);
  const updateObject = useWallStore((s) => s.updateObject);

  const isSelected = selectedObjectId === object.id;
  const catalogItem = getCatalogItem(object.type);

  // Build geometry when type, color, or dimensions change
  const { group, doorGroup } = useMemo(
    () => buildGeometry(object.type, object.color, object.width, object.height, object.depth),
    [object.type, object.color, object.width, object.height, object.depth]
  );

  // Animation interpolation
  useFrame((_, delta) => {
    if (catalogItem.animationType === "none") return;

    const target = object.animated ? 1 : 0;
    const speed = delta * (1 / 0.3);
    animProgress.current += (target - animProgress.current) * Math.min(speed, 1);

    if (doorRef.current) {
      const t = animProgress.current;
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      if (catalogItem.animationType === "door") {
        doorRef.current.rotation.y = eased * Math.PI * 0.45;
      } else if (catalogItem.animationType === "drawer") {
        doorRef.current.position.z = eased * 0.3;
      }
    }
  });

  // Select on pointer down (like walls)
  const handlePointerDown = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      selectObject(object.id);
    },
    [object.id, selectObject]
  );

  // Double click → animation
  const handleDoubleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      if (catalogItem.animationType !== "none") {
        toggleAnimation(object.id);
      }
    },
    [object.id, catalogItem.animationType, toggleAnimation]
  );

  // Transform gizmo events
  const handleMouseDownTransform = useCallback(() => {
    setIsTransforming(true);
  }, [setIsTransforming]);

  const handleMouseUpTransform = useCallback(() => {
    setIsTransforming(false);
    if (groupRef.current) {
      updateObject(object.id, {
        position: {
          x: groupRef.current.position.x,
          z: groupRef.current.position.z,
        },
        rotation: groupRef.current.rotation.y,
      });
    }
  }, [object.id, updateObject, setIsTransforming]);

  return (
    <>
      {/* Transform gizmo — sibling of group (same as Wall.tsx pattern) */}
      {isSelected && groupRef.current && (
        <DreiTransformControls
          object={groupRef.current}
          mode={gizmoMode}
          size={0.5}
          showX={gizmoMode === "rotate" ? false : true}
          showY={gizmoMode === "translate" ? false : true}
          showZ={gizmoMode === "rotate" ? false : true}
          onMouseDown={handleMouseDownTransform}
          onMouseUp={handleMouseUpTransform}
        />
      )}

      {/* Object group */}
      <group
        ref={groupRef}
        position={[object.position.x, 0, object.position.z]}
        rotation={[0, object.rotation, 0]}
        scale={object.scale}
      >
        {/* Procedural geometry */}
        <primitive object={group} />

        {/* Door group reference for animation */}
        {doorGroup && <primitive object={doorGroup} ref={doorRef as any} />}

        {/* Invisible clickable volume (select + double-click) */}
        <mesh
          onPointerDown={handlePointerDown}
          onDoubleClick={handleDoubleClick}
        >
          <boxGeometry
            args={[
              object.width * 1.2,
              object.height * 1.2,
              object.depth * 1.2,
            ]}
          />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </>
  );
}
