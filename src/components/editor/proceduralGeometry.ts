import * as THREE from "three";
import { getCatalogItem, type ObjectType } from "@/data/catalog";

interface BuildResult {
  group: THREE.Group;
  doorGroup: THREE.Group | null;
}

export function buildGeometry(type: ObjectType, color: string, width: number, height: number, depth: number): BuildResult {
  const cat = getCatalogItem(type);
  const mainColor = new THREE.Color(color);
  const darkColor = mainColor.clone().multiplyScalar(0.7);
  const lightColor = mainColor.clone().multiplyScalar(1.3);
  const group = new THREE.Group();
  let doorGroup: THREE.Group | null = null;

  const W = width;
  const H = height;
  const D = depth;

  switch (type) {
    // ── Cabinet Base ────────────────────────────────
    case "cabinet-base": {
      // Main body
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.9, D * 0.85),
        new THREE.MeshStandardMaterial({ color: mainColor })
      );
      body.position.y = H * 0.45;
      body.position.z = -D * 0.05;
      group.add(body);

      // Door (animated part)
      const doorGeo = new THREE.BoxGeometry(W * 0.85, H * 0.85, 0.03);
      const doorMat = new THREE.MeshStandardMaterial({ color: lightColor });
      const door = new THREE.Mesh(doorGeo, doorMat);
      door.position.set(0, H * 0.45, D * 0.4);
      doorGroup = new THREE.Group();
      doorGroup.position.set(W * 0.425, H * 0.45, D * 0.4);
      door.position.set(-W * 0.425, 0, 0);
      doorGroup.add(door);
      group.add(doorGroup);
      break;
    }

    // ── Cabinet Wall ─────────────────────────────────
    case "cabinet-wall": {
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.9, D * 0.85),
        new THREE.MeshStandardMaterial({ color: mainColor })
      );
      body.position.y = H * 0.45;
      body.position.z = -D * 0.05;
      group.add(body);

      const door = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.85, H * 0.85, 0.03),
        new THREE.MeshStandardMaterial({ color: lightColor })
      );
      doorGroup = new THREE.Group();
      doorGroup.position.set(W * 0.425, H * 0.45, D * 0.4);
      door.position.set(-W * 0.425, 0, 0);
      doorGroup.add(door);
      group.add(doorGroup);
      break;
    }

    // ── Drawers ─────────────────────────────────────
    case "cabinet-drawer": {
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.9, D * 0.85),
        new THREE.MeshStandardMaterial({ color: mainColor })
      );
      body.position.y = H * 0.45;
      body.position.z = -D * 0.05;
      group.add(body);

      // 3 drawer fronts
      const drawerGroup = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const dh = H * 0.25;
        const front = new THREE.Mesh(
          new THREE.BoxGeometry(W * 0.8, dh, 0.03),
          new THREE.MeshStandardMaterial({ color: lightColor })
        );
        front.position.set(0, H * 0.15 + i * dh * 1.1, D * 0.4);
        drawerGroup.add(front);
      }
      doorGroup = drawerGroup;
      group.add(drawerGroup);
      break;
    }

    // ── Shelf ───────────────────────────────────────
    case "shelf": {
      // Frame
      const frameMat = new THREE.MeshStandardMaterial({ color: mainColor });
      // Side left
      group.add(new THREE.Mesh(new THREE.BoxGeometry(0.03, H, D), frameMat).translateX(-W / 2 + 0.015).translateY(H / 2));
      // Side right
      group.add(new THREE.Mesh(new THREE.BoxGeometry(0.03, H, D), frameMat).translateX(W / 2 - 0.015).translateY(H / 2));
      // Shelves
      for (let i = 0; i < 4; i++) {
        const sh = H / 4;
        const shelf = new THREE.Mesh(
          new THREE.BoxGeometry(W - 0.06, 0.02, D),
          new THREE.MeshStandardMaterial({ color: mainColor })
        );
        shelf.position.set(0, sh * i, 0);
        group.add(shelf);
      }
      break;
    }

    // ── Table ────────────────────────────────────────
    case "table": {
      const tableMat = new THREE.MeshStandardMaterial({ color: mainColor });
      // Top
      group.add(
        new THREE.Mesh(new THREE.BoxGeometry(W, 0.04, D), tableMat).translateY(H)
      );
      // Legs
      const legPositions = [
        [-W / 2 + 0.03, -H / 2 + 0.02, -D / 2 + 0.03],
        [W / 2 - 0.03, -H / 2 + 0.02, -D / 2 + 0.03],
        [-W / 2 + 0.03, -H / 2 + 0.02, D / 2 - 0.03],
        [W / 2 - 0.03, -H / 2 + 0.02, D / 2 - 0.03],
      ] as const;
      const legGeo = new THREE.CylinderGeometry(0.025, 0.025, H, 8);
      for (const pos of legPositions) {
        const leg = new THREE.Mesh(legGeo, tableMat);
        leg.position.set(pos[0], H - 0.04 + pos[1], pos[2]);
        group.add(leg);
      }
      break;
    }

    // ── Chair ────────────────────────────────────────
    case "chair": {
      const chairMat = new THREE.MeshStandardMaterial({ color: mainColor });
      // Seat
      group.add(new THREE.Mesh(new THREE.BoxGeometry(W * 0.8, 0.04, D * 0.8), chairMat).translateY(H * 0.5));
      // Backrest
      group.add(new THREE.Mesh(new THREE.BoxGeometry(W * 0.8, H * 0.5, 0.03), chairMat).translateY(H * 0.85).translateZ(-D * 0.38));
      // 4 legs
      const cLegPos = [[-0.15, 0, -0.15], [0.15, 0, -0.15], [-0.15, 0, 0.15], [0.15, 0, 0.15]];
      const cLeg = new THREE.CylinderGeometry(0.015, 0.015, H * 0.45, 6);
      for (const pos of cLegPos) {
        const leg = new THREE.Mesh(cLeg, chairMat);
        leg.position.set(pos[0], H * 0.25, pos[1]);
        group.add(leg);
      }
      break;
    }

    // ── Fridge ──────────────────────────────────────
    case "fridge": {
      const bodyMat = new THREE.MeshStandardMaterial({ color: mainColor });
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.95, D * 0.9),
        bodyMat
      );
      body.position.y = H * 0.475;
      body.position.z = -D * 0.03;
      group.add(body);

      // Door
      const doorMat2 = new THREE.MeshStandardMaterial({
        color: mainColor,
        emissive: new THREE.Color(mainColor),
        emissiveIntensity: 0.05,
      });
      const door2 = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.9, H * 0.9, 0.04),
        doorMat2
      );
      doorGroup = new THREE.Group();
      doorGroup.position.set(W * 0.45, H * 0.475, D * 0.43);
      door2.position.set(-W * 0.45, 0, 0);
      doorGroup.add(door2);
      group.add(doorGroup);

      // Handle
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, W * 0.3, 8),
        new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5 })
      );
      handle.rotation.z = Math.PI / 2;
      handle.position.set(0, H * 0.45, D * 0.44);
      group.add(handle);
      break;
    }

    // ── Oven ────────────────────────────────────────
    case "oven": {
      const bodyMat = new THREE.MeshStandardMaterial({ color: mainColor });
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.9, D * 0.9),
        bodyMat
      );
      body.position.y = H * 0.45;
      body.position.z = -D * 0.03;
      group.add(body);

      // Door
      const doorMat3 = new THREE.MeshStandardMaterial({
        color: 0x111111,
        emissive: new THREE.Color(0x111111),
        emissiveIntensity: 0.1,
      });
      const door3 = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.8, H * 0.8, 0.04),
        doorMat3
      );
      doorGroup = new THREE.Group();
      doorGroup.position.set(W * 0.4, H * 0.45, D * 0.43);
      door3.position.set(-W * 0.4, 0, 0);
      doorGroup.add(door3);
      group.add(doorGroup);

      // Handle
      const handle2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, W * 0.3, 8),
        new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.7 })
      );
      handle2.rotation.z = Math.PI / 2;
      handle2.position.set(0, H * 0.45, D * 0.44);
      group.add(handle2);
      break;
    }

    // ── Microwave ───────────────────────────────────
    case "microwave": {
      const bodyMat = new THREE.MeshStandardMaterial({ color: mainColor });
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H, D),
        bodyMat
      );
      body.position.y = H / 2;
      group.add(body);

      // Door
      const doorMat4 = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const door4 = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.8, H * 0.8, 0.02),
        doorMat4
      );
      doorGroup = new THREE.Group();
      doorGroup.position.set(W * 0.4, H * 0.45, D * 0.5);
      door4.position.set(-W * 0.4, 0, 0);
      doorGroup.add(door4);
      group.add(doorGroup);
      break;
    }

    // ── Countertop ──────────────────────────────────
    case "countertop": {
      const topMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        roughness: 0.8,
      });
      group.add(new THREE.Mesh(new THREE.BoxGeometry(W, H, D), topMat).translateY(H / 2));
      break;
    }

    // ── Sink ────────────────────────────────────────
    case "sink": {
      const sinkMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        metalness: 0.3,
        roughness: 0.5,
      });
      const sinkBody = new THREE.Mesh(
        new THREE.BoxGeometry(W, H, D),
        sinkMat
      );
      sinkBody.position.y = H / 2;
      group.add(sinkBody);

      // Basin (depression)
      const basinMat2 = new THREE.MeshStandardMaterial({
        color: 0x555555,
        metalness: 0.7,
        roughness: 0.3,
      });
      const basin2 = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.7, H * 0.3, D * 0.6),
        basinMat2
      );
      basin2.position.set(0, H * 0.1, 0);
      group.add(basin2);
      break;
    }

    // ── Dishwasher ────────────────────────────────────
    case "dishwasher": {
      const dwMat = new THREE.MeshStandardMaterial({ color: mainColor });
      const body = new THREE.Mesh(new THREE.BoxGeometry(W, H * 0.85, D * 0.9), dwMat);
      body.position.y = H * 0.425;
      group.add(body);

      // Door
      const doorDw = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.8, H * 0.8, 0.03),
        new THREE.MeshStandardMaterial({ color: lightColor })
      );
      doorGroup = new THREE.Group();
      doorGroup.position.set(W * 0.4, H * 0.425, D * 0.44);
      doorDw.position.set(-W * 0.4, 0, 0);
      doorGroup.add(doorDw);
      group.add(doorGroup);

      // Handle
      const h3 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, W * 0.3, 8),
        new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.5 }));
      h3.rotation.z = Math.PI / 2;
      h3.position.set(0, H * 0.25, D * 0.45);
      group.add(h3);
      break;
    }

    // ── Range Hood ──────────────────────────────────
    case "range-hood": {
      const hoodMat = new THREE.MeshStandardMaterial({ color: mainColor, metalness: 0.4, roughness: 0.3 });
      // Main body
      const hood = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), hoodMat);
      hood.position.y = H / 2;
      group.add(hood);
      // Chimney
      const chimney = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.4, 0.4, D * 0.3),
        new THREE.MeshStandardMaterial({ color: darkColor, metalness: 0.3 })
      );
      chimney.position.set(0, H + 0.2, 0);
      group.add(chimney);
      break;
    }

    // ── Coffee Machine ─────────────────────────────
    case "coffee-machine": {
      const cmMat = new THREE.MeshStandardMaterial({ color: mainColor });
      const body = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), cmMat);
      body.position.y = H / 2;
      group.add(body);
      // Top detail
      const top = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.6, 0.02, D * 0.5),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
      );
      top.position.set(0, H + 0.01, D * 0.1);
      group.add(top);
      // Front panel (screen/buttons)
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.4, H * 0.2, 0.01),
        new THREE.MeshStandardMaterial({ color: 0x111111 })
      );
      panel.position.set(0, H * 0.5, D / 2 + 0.005);
      group.add(panel);
      break;
    }

    // ── Toaster ────────────────────────────────────
    case "toaster": {
      const tMat = new THREE.MeshStandardMaterial({ color: mainColor, metalness: 0.6, roughness: 0.2 });
      const body = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), tMat);
      body.position.y = H / 2;
      group.add(body);
      // Slot
      const slot = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.6, 0.01, D * 0.3),
        new THREE.MeshStandardMaterial({ color: 0x222222 })
      );
      slot.position.set(0, H + 0.005, 0);
      group.add(slot);
      break;
    }

    // ── Dish Rack ──────────────────────────────────
    case "dish-rack": {
      const rMat = new THREE.MeshStandardMaterial({ color: mainColor, metalness: 0.5 });
      // Base
      const base = new THREE.Mesh(new THREE.BoxGeometry(W, 0.02, D), rMat);
      base.position.y = 0.01;
      group.add(base);
      // Vertical bars
      for (let i = 0; i < 5; i++) {
        const bar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.008, 0.008, H, 6),
          rMat
        );
        bar.position.set(-W / 2 + 0.03 + i * (W / 4), H / 2, 0);
        group.add(bar);
      }
      break;
    }

    // ── Island ─────────────────────────────────────
    case "island": {
      const islandMat = new THREE.MeshStandardMaterial({ color: mainColor });
      // Base cabinets (two sides)
      const cabW = W * 0.3;
      const cabD = D * 0.45;
      const cabH = H * 0.85;
      for (const side of [-1, 1]) {
        const cab = new THREE.Mesh(new THREE.BoxGeometry(cabW, cabH, cabD), islandMat);
        cab.position.set(side * (W / 2 - cabW / 2), cabH / 2, -D / 4);
        group.add(cab);
      }
      // Top surface
      const top2 = new THREE.Mesh(
        new THREE.BoxGeometry(W, 0.04, D),
        new THREE.MeshStandardMaterial({ color: lightColor, roughness: 0.7 })
      );
      top2.position.y = H;
      group.add(top2);
      // Overhang lip
      const lip = new THREE.Mesh(
        new THREE.BoxGeometry(W + 0.05, 0.02, D + 0.05),
        new THREE.MeshStandardMaterial({ color: lightColor })
      );
      lip.position.y = H - 0.02;
      group.add(lip);
      break;
    }
  }

  return { group, doorGroup };
}
