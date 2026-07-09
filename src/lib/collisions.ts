import * as THREE from "three";
import type { FurnitureObject, Wall } from "./store";

/** Compute world-space AABB corners for an object */
function getObjectBox(obj: FurnitureObject): THREE.Box3 {
  const box = new THREE.Box3();
  const halfW = (obj.width * obj.scale) / 2;
  const halfD = (obj.depth * obj.scale) / 2;
  const h = obj.height * obj.scale;

  // Local-space corners
  const localCorners = [
    new THREE.Vector3(-halfW, 0, -halfD),
    new THREE.Vector3(halfW, 0, -halfD),
    new THREE.Vector3(-halfW, 0, halfD),
    new THREE.Vector3(halfW, 0, halfD),
    new THREE.Vector3(-halfW, h, -halfD),
    new THREE.Vector3(halfW, h, -halfD),
    new THREE.Vector3(-halfW, h, halfD),
    new THREE.Vector3(halfW, h, halfD),
  ];

  const rot = obj.rotation;
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);

  const worldCorners = localCorners.map((c) => {
    return new THREE.Vector3(
      c.x * cos - c.z * sin + obj.position.x,
      c.y + obj.posY,
      c.x * sin + c.z * cos + obj.position.z
    );
  });

  box.setFromPoints(worldCorners);
  return box;
}

/** Compute world-space AABB for a wall */
function getWallBox(wall: Wall): THREE.Box3 {
  const dx = wall.end.x - wall.start.x;
  const dz = wall.end.z - wall.start.z;
  const length = Math.sqrt(dx * dx + dz * dz);
  if (length < 0.001) return new THREE.Box3();

  const midX = (wall.start.x + wall.end.x) / 2;
  const midZ = (wall.start.z + wall.end.z) / 2;
  const angle = Math.atan2(dz, dx);
  const extL = length + wall.thickness;

  // Local corners of the wall box
  const halfL = extL / 2;
  const halfT = wall.thickness / 2;
  const halfH = wall.height / 2;

  const localCorners = [
    new THREE.Vector3(-halfL, -halfH, -halfT),
    new THREE.Vector3(halfL, -halfH, -halfT),
    new THREE.Vector3(-halfL, -halfH, halfT),
    new THREE.Vector3(halfL, -halfH, halfT),
    new THREE.Vector3(-halfL, halfH, -halfT),
    new THREE.Vector3(halfL, halfH, -halfT),
    new THREE.Vector3(-halfL, halfH, halfT),
    new THREE.Vector3(halfL, halfH, halfT),
  ];

  const cos = Math.cos(-angle);
  const sin = Math.sin(-angle);

  const worldCorners = localCorners.map((c) => {
    return new THREE.Vector3(
      c.x * cos - c.z * sin + midX,
      c.y + halfH,
      c.x * sin + c.z * cos + midZ
    );
  });

  const box = new THREE.Box3();
  box.setFromPoints(worldCorners);
  return box;
}

/** Check if an object collides with any other object or wall */
export function checkObjectCollision(
  objId: string,
  objects: FurnitureObject[],
  walls: Wall[]
): { collides: boolean; withObjectId: string | null; withWallId: string | null } {
  const obj = objects.find((o) => o.id === objId);
  if (!obj) return { collides: false, withObjectId: null, withWallId: null };
  if (obj.type === "floor") return { collides: false, withObjectId: null, withWallId: null };

  const objBox = getObjectBox(obj);

  // Check against other objects (skip floors — everything sits on them)
  for (const other of objects) {
    if (other.id === objId) continue;
    if (other.type === "floor") continue;
    const otherBox = getObjectBox(other);
    if (objBox.intersectsBox(otherBox)) {
      return { collides: true, withObjectId: other.id, withWallId: null };
    }
  }

  // Check against walls
  for (const wall of walls) {
    const wallBox = getWallBox(wall);
    if (objBox.intersectsBox(wallBox)) {
      return { collides: true, withObjectId: null, withWallId: wall.id };
    }
  }

  return { collides: false, withObjectId: null, withWallId: null };
}
