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
  swingSide?: "left" | "right"; // Lado de apertura para puertas en pared
  shelves?: number;   // Nº baldas (armario-modular)
  doorType?: "closed" | "glass" | "open"; // Tipo puerta (armario-modular)
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

    // ── Open Shelf ──────────────────────────────────
    case "open-shelf": {
      const osMat = mat();
      const shelfMesh = new THREE.Mesh(new THREE.BoxGeometry(W, 0.03, D), osMat);
      shelfMesh.position.y = H;
      group.add(shelfMesh);
      const brackets = [
        [-W / 2 + 0.02, H, -D / 2 + 0.03],
        [W / 2 - 0.02, H, -D / 2 + 0.03],
      ];
      for (const p of brackets) {
        const b = new THREE.Mesh(
          new THREE.BoxGeometry(0.015, 0.15, 0.015),
          osMat
        );
        b.position.set(p[0], p[1] - 0.075, p[2]);
        group.add(b);
      }
      break;
    }

    // ── Vitrina ────────────────────────────────────
    case "vitrina": {
      const vitMat = mat();
      const vitBody = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.9, D * 0.85),
        vitMat
      );
      vitBody.position.set(0, H * 0.45, -D * 0.05);
      group.add(vitBody);
      // Glass door
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        metalness: 0.0,
      });
      const glassDoor = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.85, H * 0.85, 0.015),
        glassMat
      );
      const gd = new THREE.Group();
      gd.position.set(W * 0.425, H * 0.45, D * 0.4);
      glassDoor.position.set(-W * 0.425, 0, 0);
      gd.add(glassDoor);
      doorGroup = gd;
      group.add(gd);
      // Frame border
      const frameMat = mat(lightColor.getHexString());
      const frameBorder = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.87, H * 0.02, 0.018),
        frameMat
      );
      frameBorder.position.set(0, H * 0.87, D * 0.4);
      group.add(frameBorder);
      break;
    }

    // ── Columna despensa ──────────────────────────
    case "columna-despensa": {
      const cdMat = mat();
      const cdBody = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.95, D * 0.9),
        cdMat
      );
      cdBody.position.set(0, H * 0.475, -D * 0.03);
      group.add(cdBody);
      const cdDoor = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.9, H * 0.92, 0.03),
        mat(lightColor.getHexString())
      );
      const cdd = new THREE.Group();
      cdd.position.set(W * 0.45, H * 0.475, D * 0.43);
      cdDoor.position.set(-W * 0.45, 0, 0);
      cdd.add(cdDoor);
      doorGroup = cdd;
      group.add(cdd);
      break;
    }

    // ── Freezer ────────────────────────────────────
    case "freezer": {
      const fzMat = mat();
      const fzBody = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.95, D * 0.9),
        fzMat
      );
      fzBody.position.set(0, H * 0.475, -D * 0.03);
      group.add(fzBody);
      const fzDoor = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.9, H * 0.9, 0.04),
        mat(lightColor.getHexString())
      );
      const fzd = new THREE.Group();
      fzd.position.set(W * 0.45, H * 0.475, D * 0.43);
      fzDoor.position.set(-W * 0.45, 0, 0);
      fzd.add(fzDoor);
      doorGroup = fzd;
      group.add(fzd);
      break;
    }

    // ── Washing machine ─────────────────────────────
    case "washing-machine": {
      const wMat = mat();
      const wBody = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.9, D * 0.9),
        wMat
      );
      wBody.position.set(0, H * 0.45, -D * 0.03);
      group.add(wBody);
      const wDoor = new THREE.Mesh(
        new THREE.CylinderGeometry(D * 0.25, D * 0.25, 0.03, 16),
        new THREE.MeshPhysicalMaterial({ color: 0xcccccc, transparent: true, opacity: 0.5 })
      );
      wDoor.rotation.x = Math.PI / 2;
      wDoor.position.set(0, H * 0.45, D * 0.45);
      group.add(wDoor);
      const dial = new THREE.Mesh(
        new THREE.CircleGeometry(0.02, 12),
        solidMat(0x666666)
      );
      dial.position.set(W * 0.2, H * 0.3, D * 0.44);
      group.add(dial);
      break;
    }

    // ── Placa ──────────────────────────────────────
    case "placa": {
      const pMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.3, roughness: 0.5 });
      const placa = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), pMat);
      placa.position.y = H / 2;
      group.add(placa);
      // 4 burner circles
      const burnerMat = new THREE.MeshStandardMaterial({ color: 0x333333, emissive: 0x111111, emissiveIntensity: 0.5 });
      const positions = [[-0.15, 0.012, -0.1], [0.15, 0.012, -0.1], [-0.1, 0.012, 0.12], [0.1, 0.012, 0.12]];
      for (const p of positions) {
        const burner = new THREE.Mesh(
          new THREE.CircleGeometry(0.05, 12),
          burnerMat
        );
        burner.rotation.x = -Math.PI / 2;
        burner.position.set(p[0], p[1], p[2]);
        group.add(burner);
      }
      break;
    }

    // ── Robot Cocina ─────────────────────────────
    case "robot-cocina": {
      const rcMat = mat();
      const rcBase = new THREE.Mesh(new THREE.BoxGeometry(W, H * 0.4, D), rcMat);
      rcBase.position.y = H * 0.2;
      group.add(rcBase);
      const rcGlass = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.7, H * 0.55, D * 0.7),
        new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, roughness: 0.1 })
      );
      rcGlass.position.y = H * 0.65;
      group.add(rcGlass);
      const lid = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.65, 0.02, D * 0.65),
        solidMat(0x333333)
      );
      lid.position.y = H * 0.9;
      group.add(lid);
      break;
    }

    // ── Warm Drawer ────────────────────────────────
    case "warm-drawer": {
      const wdMat = mat();
      const wdBody = new THREE.Mesh(
        new THREE.BoxGeometry(W, H * 0.9, D * 0.85),
        wdMat
      );
      wdBody.position.set(0, H * 0.45, -D * 0.05);
      group.add(wdBody);
      const wdFront = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.85, H * 0.85, 0.02),
        mat(lightColor.getHexString())
      );
      const wdG = new THREE.Group();
      wdG.position.set(0, H * 0.45, D * 0.42);
      wdFront.position.set(0, 0, 0);
      wdG.add(wdFront);
      doorGroup = wdG;
      group.add(wdG);
      const wdHandle = new THREE.Mesh(
        new THREE.BoxGeometry(W * 0.15, 0.015, 0.015),
        solidMat(0x888888)
      );
      wdHandle.position.set(0, H * 0.45, D * 0.43);
      group.add(wdHandle);
      break;
    }

    // ── Range Hood Built-in ──────────────────────
    case "range-hood-builtin": {
      const rhbMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        metalness: 0.5,
        roughness: 0.2,
      });
      const rhbBody = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), rhbMat);
      rhbBody.position.y = H / 2;
      group.add(rhbBody);
      break;
    }

    // ── Mesa Comedor ────────────────────────────
    case "mesa-comedor": {
      const mcMat = mat();
      const top = new THREE.Mesh(new THREE.BoxGeometry(W, 0.04, D), mcMat);
      top.position.y = H;
      group.add(top);
      const legPos = [
        [-W / 2 + 0.04, 0.02, -D / 2 + 0.04],
        [W / 2 - 0.04, 0.02, -D / 2 + 0.04],
        [-W / 2 + 0.04, 0.02, D / 2 - 0.04],
        [W / 2 - 0.04, 0.02, D / 2 - 0.04],
      ];
      const mLeg = new THREE.CylinderGeometry(0.025, 0.025, H, 8);
      for (const p of legPos) {
        const leg = new THREE.Mesh(mLeg, mcMat);
        leg.position.set(p[0], H - 0.04 + p[1], p[2]);
        group.add(leg);
      }
      break;
    }

    // ── Taburete ────────────────────────────────
    case "taburete": {
      const tMat = mat();
      const seat = new THREE.Mesh(
        new THREE.CylinderGeometry(W * 0.4, W * 0.45, 0.04, 12),
        tMat
      );
      seat.position.y = H;
      group.add(seat);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(W * 0.15, W * 0.18, 8),
        materialId ? mat() : new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5 })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = H * 0.15;
      group.add(ring);
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.015, 0.015, H * 0.8, 6),
          tMat
        );
        leg.position.set(
          Math.cos(angle) * W * 0.25,
          H * 0.15,
          Math.sin(angle) * W * 0.25
        );
        group.add(leg);
      }
      break;
    }

    // ── Planta decorativa ────────────────────────
    case "planta": {
      const potMat = materialId ? mat() : new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8 });
      const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(W * 0.3, W * 0.4, H * 0.3, 8),
        potMat
      );
      pot.position.y = H * 0.15;
      group.add(pot);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x2E7D32 });
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.01, H * 0.5, 6),
        stemMat
      );
      stem.position.y = H * 0.4;
      group.add(stem);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(W * 0.2, 6, 6),
        leafMat
      );
      leaf.position.set(0, H * 0.68, 0);
      leaf.scale.y = 1.3;
      group.add(leaf);
      const leaf2 = leaf.clone();
      leaf2.position.set(W * 0.15, H * 0.6, 0.1);
      leaf2.scale.set(0.8, 0.9, 0.8);
      group.add(leaf2);
      break;
    }

    // ── Cuadro pared ────────────────────────────
    case "cuadro": {
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
      const canvasMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.6,
      });
      const canvas2 = new THREE.Mesh(
        new THREE.PlaneGeometry(W * 0.85, H * 0.85),
        canvasMat
      );
      canvas2.position.z = 0.005;
      group.add(canvas2);
      const frame2 = new THREE.Mesh(
        new THREE.BoxGeometry(W, H, D),
        frameMat
      );
      group.add(frame2);
      // Art
      const artMat = new THREE.MeshStandardMaterial({ color: 0x4A90D9 });
      const art = new THREE.Mesh(
        new THREE.CircleGeometry(W * 0.25, 16),
        artMat
      );
      art.position.z = 0.012;
      group.add(art);
      break;
    }

    // ── Lámpara colgante ────────────────────────
    case "lamp-colgante": {
      const lampMat2 = new THREE.MeshStandardMaterial({
        color: mainColor,
        metalness: 0.6,
        roughness: 0.2,
        emissive: new THREE.Color(0xFFD700),
        emissiveIntensity: 0.1,
      });
      const lampBody2 = new THREE.Mesh(
        new THREE.ConeGeometry(W * 0.4, H, 12),
        lampMat2
      );
      lampBody2.position.y = H / 2;
      group.add(lampBody2);
      const cableMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
      const cable = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.5, 4),
        cableMat
      );
      cable.position.y = H + 0.25;
      group.add(cable);
      break;
    }

    // ── Lámpara techo ──────────────────────────────
    case "lamp-techo": {
      const lampMat3 = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 0.2,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.05,
      });
      const lampBody3 = new THREE.Mesh(
        new THREE.CylinderGeometry(W * 0.4, W * 0.5, H, 12),
        lampMat3
      );
      lampBody3.position.y = H / 2;
      group.add(lampBody3);
      break;
    }

    // ── Armario modular configurable ───────────────
    case "armario-modular": {
      const bodyMat = mat();
      const amBody = new THREE.Mesh(new THREE.BoxGeometry(W, H * 0.9, D * 0.85), bodyMat);
      amBody.position.y = H * 0.45;
      amBody.position.z = -D * 0.05;
      group.add(amBody);

      // Baldas configurables
      const shelfMat2 = new THREE.MeshStandardMaterial({ color: 0x6B5B3E });
      const numShelves = opts.shelves ?? 2;
      for (let i = 0; i < numShelves; i++) {
        const shelf = new THREE.Mesh(new THREE.BoxGeometry(W * 0.8, 0.02, D * 0.7), shelfMat2);
        shelf.position.set(0, H * 0.15 + i * (H * 0.6 / Math.max(numShelves, 1)), -D * 0.05);
        group.add(shelf);
      }

      // Puerta según doorType
      const dt = opts.doorType ?? "glass";
      if (dt === "glass") {
        const glassMat2 = new THREE.MeshStandardMaterial({
          color: lightColor,
          transparent: true,
          opacity: 0.4,
          roughness: 0.1,
          metalness: 0.1,
        });
        const doorGl2 = new THREE.Mesh(new THREE.BoxGeometry(W * 0.85, H * 0.85, 0.03), glassMat2);
        doorGroup = new THREE.Group();
        doorGroup.position.set(W * 0.425, H * 0.45, D * 0.4);
        doorGl2.position.set(-W * 0.425, 0, 0);
        doorGroup.add(doorGl2);
        group.add(doorGroup);
      } else if (dt === "closed") {
        const doorSol = new THREE.Mesh(new THREE.BoxGeometry(W * 0.85, H * 0.85, 0.03), mat(lightColor.getHexString()));
        doorGroup = new THREE.Group();
        doorGroup.position.set(W * 0.425, H * 0.45, D * 0.4);
        doorSol.position.set(-W * 0.425, 0, 0);
        doorGroup.add(doorSol);
        group.add(doorGroup);
      }
      // "open" → sin puerta, solo baldas visibles
      break;
    }

    // ── Columna fontanería ─────────────────────────
    case "columna-fontaneria": {
      const pipeMat = buildPBRMaterial(null, "#C0C0C0");
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, H, 12), pipeMat);
      pipe.position.y = H / 2;
      group.add(pipe);
      // segunda tubería
      const pipe2 = pipe.clone();
      pipe2.position.x = 0.05;
      group.add(pipe2);
      break;
    }

    // ── Tubería horizontal ─────────────────────────
    case "tuberia-horizontal": {
      const matTH = buildPBRMaterial(null, "#C0C0C0");
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, W, 8), matTH);
      tube.rotation.z = Math.PI / 2;
      group.add(tube);
      break;
    }

    // ── Sifón decorativo ──────────────────────────
    case "sifon-decorativo": {
      const matSif = buildPBRMaterial(null, "#B0B0B0");
      const u1 = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.025, 8, 12, Math.PI), matSif);
      u1.position.set(0, 0.1, 0);
      u1.rotation.x = Math.PI;
      group.add(u1);
      const down = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.1, 8), matSif);
      down.position.y = 0.05;
      group.add(down);
      break;
    }

    // ── Encimera L ─────────────────────────────────
    case "countertop-l": {
      const ctMat = mat();
      // Main rectangle
      const main = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), ctMat);
      main.position.set(W / 2 - 0.1, H / 2, 0);
      group.add(main);
      // L extension (if lWidthX/lWidthZ provided via opts)
      if ((opts.lWidthX ?? 0) > 0 || (opts.lWidthZ ?? 0) > 0) {
        const lx = opts.lWidthX ?? 0.8;
        const lz = opts.lWidthZ ?? 0.8;
        const ext = new THREE.Mesh(new THREE.BoxGeometry(lx, H, lz), ctMat);
        ext.position.set(W + lx / 2 - 0.1, H / 2, -D / 2 - lz / 2);
        group.add(ext);
      }
      break;
    }

    // ── Puerta en pared (marco + hoja pivotante) ──
    case "door": {
      const frameThick = 0.06;
      const frameDepth = 0.08;
      const doorThick = 0.035;
      const doorH = H;
      const doorW = W;
      const frameMat = mat(darkColor.getHexString());
      const doorMat = mat(lightColor.getHexString());

      // Marco: montante izquierdo
      const leftStile = new THREE.Mesh(
        new THREE.BoxGeometry(frameThick, doorH, frameDepth),
        frameMat
      );
      leftStile.position.set(-doorW / 2 + frameThick / 2, doorH / 2, 0);
      group.add(leftStile);

      // Marco: montante derecho
      const rightStile = new THREE.Mesh(
        new THREE.BoxGeometry(frameThick, doorH, frameDepth),
        frameMat
      );
      rightStile.position.set(doorW / 2 - frameThick / 2, doorH / 2, 0);
      group.add(rightStile);

      // Marco: travesaño superior
      const topRail = new THREE.Mesh(
        new THREE.BoxGeometry(doorW, frameThick, frameDepth),
        frameMat
      );
      topRail.position.set(0, doorH - frameThick / 2, 0);
      group.add(topRail);

      // Marco: travesaño inferior
      const bottomRail = new THREE.Mesh(
        new THREE.BoxGeometry(doorW, frameThick, frameDepth),
        frameMat
      );
      bottomRail.position.set(0, frameThick / 2, 0);
      group.add(bottomRail);

      // Hoja de la puerta (panel)
      const panelW = doorW - frameThick * 2 - 0.01;
      const panelH = doorH - frameThick * 2 - 0.01;
      const doorLeaf = new THREE.Mesh(
        new THREE.BoxGeometry(panelW, panelH, doorThick),
        doorMat
      );
      // Panel decorativo (relieve central)
      const panelDetail = new THREE.Mesh(
        new THREE.BoxGeometry(panelW * 0.7, panelH * 0.7, doorThick * 0.3),
        mat(mainColor.clone().multiplyScalar(0.85).getHexString())
      );
      panelDetail.position.z = doorThick / 2 + 0.001;

      // Grupo pivote para animación de apertura
      doorGroup = new THREE.Group();
      // Pivot en el borde izquierdo o derecho según swingSide
      // (por defecto usamos "left" = bisagra a la izquierda, apertura a la derecha)
      const isLeftSwing = opts.swingSide !== "right";
      const pivotX = isLeftSwing ? -doorW / 2 + frameThick + 0.005 : doorW / 2 - frameThick - 0.005;
      doorGroup.position.set(pivotX, doorH / 2, 0);
      // Hoja offset desde el pivote
      const leafOffsetX = isLeftSwing ? panelW / 2 : -panelW / 2;
      doorLeaf.position.set(leafOffsetX, 0, frameDepth / 2 + doorThick / 2);
      panelDetail.position.x = leafOffsetX;
      panelDetail.position.y = 0;
      panelDetail.position.z = frameDepth / 2 + doorThick / 2 + doorThick * 0.3 / 2 + 0.001;
      doorGroup.add(doorLeaf);
      doorGroup.add(panelDetail);
      group.add(doorGroup);

      // Tirador (manilla)
      const handleMat = solidMat(0x888888);
      const handleBar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.12, 8),
        handleMat
      );
      handleBar.rotation.z = Math.PI / 2;
      const handleX = isLeftSwing
        ? pivotX + panelW / 2 - 0.06
        : pivotX - panelW / 2 + 0.06;
      handleBar.position.set(handleX, doorH * 0.5, frameDepth / 2 + doorThick + 0.005);
      group.add(handleBar);

      const handleKnob = new THREE.Mesh(
        new THREE.SphereGeometry(0.012, 8, 8),
        handleMat
      );
      handleKnob.position.set(handleX, doorH * 0.5, frameDepth / 2 + doorThick + 0.02);
      group.add(handleKnob);
      break;
    }

    // ── Ventana en pared (marco + cristal) ────────────
    case "window": {
      const frameThick = 0.05;
      const frameDepth = 0.06;
      const glassThick = 0.02;
      const windowW = W;
      const windowH = H;

      // Frame material (darker than main color)
      const frameMat = mat(darkColor.getHexString());
      // Glass material (semi-transparent blueish)
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.35,
        metalness: 0.0,
        roughness: 0.05,
        envMapIntensity: 1.0,
        side: THREE.DoubleSide,
      });
      // Glass frame border (slightly reflective)
      const glassBorderMat = new THREE.MeshPhysicalMaterial({
        color: 0xADD8E6,
        transparent: true,
        opacity: 0.5,
        metalness: 0.1,
        roughness: 0.1,
        side: THREE.DoubleSide,
      });

      // Marco: montante izquierdo
      const leftStile = new THREE.Mesh(
        new THREE.BoxGeometry(frameThick, windowH, frameDepth),
        frameMat
      );
      leftStile.position.set(-windowW / 2 + frameThick / 2, windowH / 2, 0);
      group.add(leftStile);

      // Marco: montante derecho
      const rightStile = new THREE.Mesh(
        new THREE.BoxGeometry(frameThick, windowH, frameDepth),
        frameMat
      );
      rightStile.position.set(windowW / 2 - frameThick / 2, windowH / 2, 0);
      group.add(rightStile);

      // Marco: travesaño superior
      const topRail = new THREE.Mesh(
        new THREE.BoxGeometry(windowW, frameThick, frameDepth),
        frameMat
      );
      topRail.position.set(0, windowH - frameThick / 2, 0);
      group.add(topRail);

      // Marco: travesaño inferior
      const bottomRail = new THREE.Mesh(
        new THREE.BoxGeometry(windowW, frameThick, frameDepth),
        frameMat
      );
      bottomRail.position.set(0, frameThick / 2, 0);
      group.add(bottomRail);

      // Panel de vidrio principal (ocupa todo el hueco interior del marco)
      const glassW = windowW - frameThick * 2 - 0.01;
      const glassH = windowH - frameThick * 2 - 0.01;
      const glass = new THREE.Mesh(
        new THREE.BoxGeometry(glassW, glassH, glassThick),
        glassMat
      );
      glass.position.set(0, windowH / 2, frameDepth / 2 + glassThick / 2);
      group.add(glass);

      // Segundo panel de vidrio (sutil separación para efecto doble acristalamiento)
      const glass2 = new THREE.Mesh(
        new THREE.BoxGeometry(glassW * 0.98, glassH * 0.98, glassThick * 0.5),
        glassBorderMat
      );
      glass2.position.set(0, windowH / 2, frameDepth / 2 - glassThick * 0.3);
      group.add(glass2);

      // Cruz interior (parteluz) — montante vertical central
      const mullionW = 0.03;
      const mullionDepth = frameDepth * 0.8;
      const mullionMat = frameMat;
      const mullionVert = new THREE.Mesh(
        new THREE.BoxGeometry(mullionW, glassH * 0.9, mullionDepth),
        mullionMat
      );
      mullionVert.position.set(0, windowH / 2, frameDepth / 2 + glassThick / 2);
      group.add(mullionVert);

      // Cruz interior (parteluz) — travesaño horizontal central
      const mullionHoriz = new THREE.Mesh(
        new THREE.BoxGeometry(glassW * 0.9, mullionW, mullionDepth),
        mullionMat
      );
      mullionHoriz.position.set(0, windowH / 2, frameDepth / 2 + glassThick / 2);
      group.add(mullionHoriz);

      break;
    }

    // ── End switch (original floor default) ──────
  }

  return { group, doorGroup };
}