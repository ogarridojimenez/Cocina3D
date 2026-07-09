"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TransformControls as DreiTransformControls } from "@react-three/drei";
import * as THREE from "three";
import { useWallStore, type FurnitureObject } from "@/lib/store";
import { getCatalogItem } from "@/data/catalog";
import { buildGeometry } from "@/components/editor/proceduralGeometry";
import { buildPBRMaterial } from "@/lib/materials";
import { checkObjectCollision } from "@/lib/collisions";

interface Props {
  object: FurnitureObject;
}

export function FurnitureMesh({ object }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const doorRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);
  const animProgress = useRef(object.animated ? 1 : 0);

  const selectObject = useWallStore((s) => s.selectObject);
  const toggleAnimation = useWallStore((s) => s.toggleAnimation);
  const setIsTransforming = useWallStore((s) => s.setIsTransforming);
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);
  const gizmoMode = useWallStore((s) => s.gizmoMode);
  const updateObject = useWallStore((s) => s.updateObject);
  const objects = useWallStore((s) => s.objects);
  const walls = useWallStore((s) => s.walls);

  const isSelected = selectedObjectId === object.id;
  const catalogItem = getCatalogItem(object.type);

  // Collision detection (skip for floor — objects sit on top of it)
  const isColliding = useMemo(
    () => object.type === "floor" ? false : checkObjectCollision(object.id, objects, walls).collides,
    [object.id, object.type, object.position.x, object.position.z, object.width, object.height, object.depth, object.rotation, object.scale, objects, walls]
  );

  // Build geometry when type, color, dimensions, or material change
  const { group, doorGroup } = useMemo(
    () => object.type === "floor"
      ? { group: new THREE.Group(), doorGroup: null }
      : buildGeometry(object.type, object.color, object.width, object.height, object.depth, object.materialId, { lWidthX: object.lWidthX, lWidthZ: object.lWidthZ, hasSink: object.hasSink }),
    [object.type, object.color, object.width, object.height, object.depth, object.materialId, object.lWidthX, object.lWidthZ, object.hasSink]
  );

  // Floor material (PBR or plain color)
  const floorMaterial = useMemo(
    () => object.type === "floor" && object.materialId
      ? buildPBRMaterial(object.materialId, object.color)
      : null,
    [object.type, object.materialId, object.color]
  );

  // Tint material red when colliding (must be AFTER group is created)
  useEffect(() => {
    group.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (isColliding) {
          mat.color.setHex(0xff4444);
          mat.emissive.setHex(0xff0000);
          mat.emissiveIntensity = 0.3;
        } else {
          mat.color.set(object.color);
          mat.emissive.setHex(0x000000);
          mat.emissiveIntensity = 0;
        }
      }
    });
  }, [group, isColliding, object.color]);

  // Animation interpolation with spring-like smoothing
  useFrame((_, delta) => {
    const hasDoor = catalogItem.animationType !== "none";

    if (hasDoor) {
      const target = object.animated ? 1 : 0;
      const speed = delta * 8;
      animProgress.current += (target - animProgress.current) * Math.min(speed, 1);

      if (doorRef.current) {
        const t = animProgress.current;
        const eased = t * t * (3 - 2 * t);

        if (catalogItem.animationType === "door") {
          doorRef.current.rotation.y = eased * Math.PI * 0.45;
        } else if (catalogItem.animationType === "drawer") {
          doorRef.current.position.z = eased * 0.3;
        }
      }
    }

    // Appliance lights: respond to lightOn toggle (user control)
    // Direct setting via useEffect below, useFrame only for door animation
  });

  // Direct light control via useEffect (reliable, no frame-timing issues)
  const lightType =
    object.type === "oven" || object.type === "fridge" || object.type === "microwave" || object.type === "dishwasher"
      ? "point"
      : object.type === "range-hood" ? "spot" : "none";

  useEffect(() => {
    if (lightType === "point" && lightRef.current) {
      const targetLight = object.lightOn ? 1 : (object.animated ? 0.8 : 0);
      const intensity = object.type === "dishwasher" ? targetLight * 0.15 : targetLight;
      lightRef.current.intensity = intensity;
    }
    if (lightType === "spot" && spotRef.current) {
      spotRef.current.intensity = object.lightOn ? 1.0 : 0;
    }
  }, [lightType, object.lightOn, object.animated]);

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
        position={[object.position.x, object.posY, object.position.z]}
        rotation={[0, object.rotation, 0]}
        scale={object.scale}
      >
        {/* Procedural geometry */}
        <primitive object={group} />

        {/* Floor plane for floor objects */}
        {object.type === "floor" && (
          <mesh
            position={[0, 0, 0]}
            onPointerDown={handlePointerDown}
            onDoubleClick={handleDoubleClick}
          >
            <planeGeometry args={[object.width, object.depth]} />
            {floorMaterial ? (
              <primitive object={floorMaterial} attach="material" />
            ) : (
              <meshStandardMaterial
                color={object.color}
                roughness={0.8}
                metalness={0}
              />
            )}
          </mesh>
        )}

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

        {/* Point light inside oven/fridge/microwave (linked to door) */}
        {(object.type === "oven" || object.type === "fridge" || object.type === "microwave" || object.type === "dishwasher") && (
          <pointLight
            ref={lightRef}
            position={[0, object.height * 0.4, -object.depth * 0.3]}
            intensity={0}
            distance={1.5}
            decay={1}
            color={
              object.type === "fridge" ? "#E8F4FF" :
              object.type === "microwave" ? "#FFEEDD" :
              object.type === "dishwasher" ? "#00FF44" :
              "#FFE0B0"
            }
          />
        )}

        {/* Spot light from range hood pointing down */}
        {object.type === "range-hood" && (
          <spotLight
            ref={spotRef}
            position={[0, -0.05, -0.1]}
            angle={0.6}
            penumbra={0.5}
            distance={2.5}
            decay={1}
            intensity={0}
            color="#FFFFFF"
            target-position={[0, -1.5, 0]}
          />
        )}
      </group>
    </>
  );
}
