import * as THREE from "three";
import { getCatalogItem, type ObjectType } from "@/data/catalog";
import { buildPBRMaterial } from "@/lib/materials";

interface BuildResult {
  group: THREE.Group;
  doorGroup: THREE.Group | null;
}

interface BuildOptions {
  materialId?: string | null;
  lWidthX?: number;   // Extensión L en eje +X
  lWidthZ?: number;   // Extensión L en eje +Z
  lWidth?: number;    // Legacy - se usa como lWidthZ si existe
  hasSink?: boolean;
}

export function buildGeometry(
  type: ObjectType,
  color: string,
  width: number,
  height: number,
  depth: number,
  materialId: string | null = null,
  opts: BuildOptions = {}
): BuildResult {
  const cat = getCatalogItem(type);
  const mainColor = new THREE.Color(color);
  const darkColor = mainColor.clone().multiplyScalar(0.7);
  const lightColor = mainColor.clone().multiplyScalar(1.3);
  const group = new THREE.Group();
  let doorGroup: THREE.Group | null = null;

  const W = width;
  const H = height;
  const D = depth;

  // Helper: build PBR material with fallback to solid color
  const mat = (tint?: string) =>
    materialId
      ? buildPBRMaterial(materialId, tint ?? color)
      : new THREE.MeshStandardMaterial({ color: tint ?? color });

  // Helper: solid color variant (for handles, details, panels)
  const solidMat = (c: string | number) =>
    new THREE.MeshStandardMaterial({ color: c as any });

  switch (type) {
    // ── Cabinet Base ────────────────────────────────
    case "cabinet-base": {
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.9, D * 0.85),
        mat()
      );
      body.position.y = H * 0.45;
      body.position.z = -D * 0.05;
      group.add(body);

      const doorGeo = new THREE.BoxGeometry(W * 0.85, H * 0.85, 0.03);
      const door = new THREE.Mesh(doorGeo, mat(lightColor.getHexString()));
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
        mat()
      );
      body.position.y = H * 0.45;
      body.position.z = -D * 0.05;
      group.add(body);

      const door = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.85, H * 0.85, 0.03),
        mat(lightColor.getHexString())
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
        mat()
      );
      body.position.y = H * 0.45;
      body.position.z = -D * 0.05;
      group.add(body);

      const drawerGroup = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const dh = H * 0.25;
        const front = new THREE.Mesh(
          new THREE.BoxGeometry(W * 0.8, dh, 0.03),
          mat(lightColor.getHexString())
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
      const frameMat = mat();
      group.add(new THREE.Mesh(new THREE.BoxGeometry(0.03, H, D), frameMat).translateX(-W / 2 + 0.015).translateY(H / 2));
      group.add(new THREE.Mesh(new THREE.BoxGeometry(0.03, H, D), frameMat).translateX(W / 2 - 0.015).translateY(H / 2));
      for (let i = 0; i < 4; i++) {
        const sh = H / 4;
        const shelf = new THREE.Mesh(
          new THREE.BoxGeometry(W - 0.06, 0.02, D),
          mat()
        );
        shelf.position.set(0, sh * i, 0);
        group.add(shelf);
      }
      break;
    }

    // ── Table ────────────────────────────────────────
    case "table": {
      const tableMat = mat();
      group.add(
        new THREE.Mesh(new THREE.BoxGeometry(W, 0.04, D), mat()).translateY(H)
      );
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
      const chairMat = mat();
      group.add(new THREE.Mesh(new THREE.BoxGeometry(W * 0.8, 0.04, D * 0.8), chairMat).translateY(H * 0.5));
      group.add(new THREE.Mesh(new THREE.BoxGeometry(W * 0.8, H * 0.5, 0.03), chairMat).translateY(H * 0.85).translateZ(-D * 0.38));
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
      const bodyMat = mat();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.95, D * 0.9),
        bodyMat
      );
      body.position.y = H * 0.475;
      body.position.z = -D * 0.03;
      group.add(body);

      const doorMat2 = materialId
        ? mat()
        : new THREE.MeshStandardMaterial({
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

      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, W * 0.3, 8),
        solidMat(0x888888)
      );
      handle.rotation.z = Math.PI / 2;
      handle.position.set(0, H * 0.45, D * 0.44);
      group.add(handle);
      break;
    }

    // ── Oven ────────────────────────────────────────
    case "oven": {
      const bodyMat = mat();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.9, D * 0.9),
        bodyMat
      );
      body.position.y = H * 0.45;
      body.position.z = -D * 0.03;
      group.add(body);

      const doorMat3 = materialId
        ? mat(0x111111 as any)
        : new THREE.MeshStandardMaterial({
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

      const handle2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, W * 0.3, 8),
        solidMat(0xcccccc)
      );
      handle2.rotation.z = Math.PI / 2;
      handle2.position.set(0, H * 0.45, D * 0.44);
      group.add(handle2);
      break;
    }

    // ── Microwave ───────────────────────────────────
    case "microwave": {
      const bodyMat = mat();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(W, H, D),
        bodyMat
      );
      body.position.y = H / 2;
      group.add(body);

      const doorMat4 = materialId ? mat(0x333333 as any) : solidMat(0x333333);
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
      group.add(new THREE.Mesh(new THREE.BoxGeometry(W, H, D), mat()).translateY(H / 2));
      break;
    }

    // ── Sink ────────────────────────────────────────
    case "sink": {
      const sinkMat = materialId ? mat() : new THREE.MeshStandardMaterial({
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

    // ── Dishwasher ─────────────────────────────────
    case "dishwasher": {
      const dwMat = mat();
      const body = new THREE.Mesh(new THREE.BoxGeometry(W, H * 0.85, D * 0.9), dwMat);
      body.position.y = H * 0.425;
      group.add(body);

      const doorDw = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.8, H * 0.8, 0.03),
        mat(lightColor.getHexString())
      );
      doorGroup = new THREE.Group();
      doorGroup.position.set(W * 0.4, H * 0.425, D * 0.44);
      doorDw.position.set(-W * 0.4, 0, 0);
      doorGroup.add(doorDw);
      group.add(doorGroup);

      const h3 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, W * 0.3, 8),
        solidMat(0xcccccc));
      h3.rotation.z = Math.PI / 2;
      h3.position.set(0, H * 0.25, D * 0.45);
      group.add(h3);
      break;
    }

    // ── Range Hood ──────────────────────────────────
    case "range-hood": {
      const hoodMat = materialId ? mat() : new THREE.MeshStandardMaterial({
        color: mainColor, metalness: 0.4, roughness: 0.3
      });
      const hood = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), hoodMat);
      hood.position.y = H / 2;
      group.add(hood);
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
      const cmMat = mat();
      const body = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), cmMat);
      body.position.y = H / 2;
      group.add(body);
      const top = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.6, 0.02, D * 0.5),
        solidMat(0x333333)
      );
      top.position.set(0, H + 0.01, D * 0.1);
      group.add(top);
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.4, H * 0.2, 0.01),
        solidMat(0x111111)
      );
      panel.position.set(0, H * 0.5, D / 2 + 0.005);
      group.add(panel);
      break;
    }

    // ── Toaster ────────────────────────────────────
    case "toaster": {
      const tMat = materialId ? mat() : new THREE.MeshStandardMaterial({
        color: mainColor, metalness: 0.6, roughness: 0.2
      });
      const body = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), tMat);
      body.position.y = H / 2;
      group.add(body);
      const slot = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.6, 0.01, D * 0.3),
        solidMat(0x222222)
      );
      slot.position.set(0, H + 0.005, 0);
      group.add(slot);
      break;
    }

    // ── Dish Rack ──────────────────────────────────
    case "dish-rack": {
      const rMat = materialId ? mat() : new THREE.MeshStandardMaterial({
        color: mainColor, metalness: 0.5
      });
      const base = new THREE.Mesh(new THREE.BoxGeometry(W, 0.02, D), rMat);
      base.position.y = 0.01;
      group.add(base);
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
      const islandMat = mat();
      const cabW = W * 0.3;
      const cabD = D * 0.45;
      const cabH = H * 0.85;
      for (const side of [-1, 1]) {
        const cab = new THREE.Mesh(new THREE.BoxGeometry(cabW, cabH, cabD), islandMat);
        cab.position.set(side * (W / 2 - cabW / 2), cabH / 2, -D / 4);
        group.add(cab);
      }
      const top2 = new THREE.Mesh(
        new THREE.BoxGeometry(W, 0.04, D),
        mat(lightColor.getHexString())
      );
      top2.position.y = H;
      group.add(top2);
      const lip = new THREE.Mesh(
        new THREE.BoxGeometry(W + 0.05, 0.02, D + 0.05),
        mat(lightColor.getHexString())
      );
      lip.position.y = H - 0.02;
      group.add(lip);
      break;
    }

    // ── Counter (Meseta) ─────────────────────────
    case "counter": {
      const lW = (opts?.lWidth ?? 0);
      const lX = (opts?.lWidthX ?? 0);
      const lZ = (opts?.lWidthZ ?? lW);
      const sink = opts?.hasSink ?? false;

      // Base cabinets with doors
      const cabH = H * 0.8;
      const cabD = D;
      const cabMat = mat();

      // Main linear section
      const numCabs = Math.max(1, Math.floor(W / 0.6));
      const cabWidth = W / numCabs;
      for (let i = 0; i < numCabs; i++) {
        const cx = -W / 2 + cabWidth * i + cabWidth / 2;
        const body = new THREE.Mesh(
          new THREE.BoxGeometry(cabWidth * 0.95, cabH * 0.9, cabD * 0.85),
          cabMat
        );
        body.position.set(cx, cabH * 0.45, -cabD * 0.05);
        group.add(body);

        // Puerta con pivote CORRECTO en el borde derecho de cada módulo
        const door = new THREE.Mesh(
          new THREE.BoxGeometry(cabWidth * 0.85, cabH * 0.85, 0.03),
          mat(lightColor.getHexString())
        );
        const dg = new THREE.Group();
        // Pivote en el borde +X del armario (bisagra)
        dg.position.set(cx + cabWidth * 0.475, cabH * 0.45, cabD * 0.4);
        // Puerta offset hacia la izquierda desde el pivote
        door.position.set(-cabWidth * 0.475, 0, 0);
        dg.add(door);
        group.add(dg);
        if (doorGroup === null && i === 0) {
          doorGroup = dg;
        }
      }

      // Countertop slab
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(W, 0.04, D + 0.05),
        mat(lightColor.getHexString())
      );
      slab.position.set(0, cabH, 0);
      group.add(slab);

      // L extension en +X (hacia la derecha)
      if (lX > 0) {
        const segCountX = Math.max(1, Math.floor(D / 0.6));
        const segX = D / segCountX;
        for (let i = 0; i < segCountX; i++) {
          const body = new THREE.Mesh(
            new THREE.BoxGeometry((lX / segCountX) * 0.85, cabH * 0.9, segX * 0.85),
            cabMat
          );
          body.position.set(
            W / 2 + (lX / segCountX) * i + (lX / segCountX) / 2,
            cabH * 0.45,
            -D / 2 + segX * i + segX / 2
          );
          group.add(body);
        }
        const lTopX = new THREE.Mesh(
          new THREE.BoxGeometry(lX, 0.04, D + 0.05),
          mat(lightColor.getHexString())
        );
        lTopX.position.set(W / 2 + lX / 2, cabH, 0);
        group.add(lTopX);
      }

      // L extension en +Z — sale desde la esquina de la L (donde termina la X)
      if (lZ > 0) {
        const zWingX = lX > 0 ? W / 2 + lX - D / 2 : W / 2 - D / 2; // centro de la Z en la esquina
        const segCountZ = Math.max(1, Math.floor(D / 0.6));
        for (let i = 0; i < segCountZ; i++) {
          const body = new THREE.Mesh(
            new THREE.BoxGeometry(D * 0.85, cabH * 0.9, (lZ / segCountZ) * 0.85),
            cabMat
          );
          body.position.set(
            zWingX,
            cabH * 0.45,
            D / 2 + (lZ / segCountZ) * i + (lZ / segCountZ) / 2
          );
          group.add(body);
        }
        const lTopZ = new THREE.Mesh(
          new THREE.BoxGeometry(D + 0.05, 0.04, lZ + 0.05),
          mat(lightColor.getHexString())
        );
        lTopZ.position.set(zWingX, cabH, D / 2 + lZ / 2);
        group.add(lTopZ);
      }

      // Fregadero integrado
      if (sink) {
        const sinkBody = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.15, 0.4),
          new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.4, roughness: 0.3 })
        );
        sinkBody.position.set(0, cabH + 0.02, 0);
        group.add(sinkBody);
        const basin = new THREE.Mesh(
          new THREE.BoxGeometry(0.35, 0.08, 0.25),
          new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.6, roughness: 0.2 })
        );
        basin.position.set(0, cabH - 0.02, 0);
        group.add(basin);
        const tap = new THREE.Mesh(
          new THREE.BoxGeometry(0.02, 0.2, 0.02),
          new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2 })
        );
        tap.position.set(0, cabH + 0.12, 0.1);
        group.add(tap);
      }
      break;
    }

    // ── TV ────────────────────────────────────────
    case "tv": {
      const tvMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.1, roughness: 0.8 });
      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.95, H * 0.95, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x000020, emissiveIntensity: 0.3 })
      );
      screen.position.z = 0.02;
      group.add(screen);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), tvMat);
      frame.position.z = 0;
      group.add(frame);
      const mount = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.2, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x666666 })
      );
      mount.position.z = -D / 2 - 0.025;
      group.add(mount);
      break;
    }
  }

  return { group, doorGroup };
}