import { create } from "zustand";
import { temporal } from "zundo";
import type { ObjectType } from "@/data/catalog";
import { getCatalogItem } from "@/data/catalog";

// ── Types ──────────────────────────────────────────

export interface Point2D {
  x: number;
  z: number;
}

export interface Wall {
  id: string;
  start: Point2D;
  end: Point2D;
  height: number;
  thickness: number;
  color: string;
  textureId: string | null;
}

export type DrawMode = "none" | "point" | "drag";

interface DrawState {
  start?: Point2D;
  current?: Point2D;
}

export interface FurnitureObject {
  id: string;
  type: ObjectType;
  position: Point2D;
  posY: number;
  rotation: number;
  scale: number;
  animated: boolean;
  lightOn: boolean;
  color: string;
  width: number;
  height: number;
  depth: number;
}

// ── Scene store (original) ─────────────────────────

interface SceneState {
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  gridVisible: boolean;
  gridSize: number;
  gridDivisions: number;
  fps: number;

  setCameraPosition: (pos: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  toggleGrid: () => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  cameraPosition: [8, 6, 8],
  cameraTarget: [0, 0, 0],
  gridVisible: true,
  gridSize: 20,
  gridDivisions: 20,
  fps: 0,

  setCameraPosition: (cameraPosition) => set({ cameraPosition }),
  setCameraTarget: (cameraTarget) => set({ cameraTarget }),
  toggleGrid: () => set((s) => ({ gridVisible: !s.gridVisible })),
}));

// ── ID counters ────────────────────────────────────

let wallIdCounter = 0;
function nextWallId(): string {
  wallIdCounter += 1;
  return `wall-${wallIdCounter}`;
}

let objIdCounter = 0;
function nextObjId(): string {
  objIdCounter += 1;
  return `obj-${objIdCounter}`;
}

// ── Wall + Furniture store ─────────────────────────

interface WallStore {
  walls: Wall[];
  selectedWallId: string | null;
  drawMode: DrawMode;
  drawState: DrawState;
  isTransforming: boolean;
  objects: FurnitureObject[];
  selectedObjectId: string | null;
  gizmoMode: "translate" | "rotate";

  addWall: (start: Point2D, end: Point2D, height: number, thickness: number, color?: string, textureId?: string | null) => void;
  updateWall: (id: string, updates: Partial<Wall>) => void;
  removeWall: (id: string) => void;
  selectWall: (id: string | null) => void;
  setDrawMode: (mode: DrawMode) => void;
  setDrawStart: (p: Point2D) => void;
  setDrawCurrent: (p?: Point2D) => void;
  clearDraw: () => void;
  setIsTransforming: (v: boolean) => void;

  addObject: (type: ObjectType, position?: Point2D, color?: string) => void;
  updateObject: (id: string, updates: Partial<FurnitureObject>) => void;
  removeObject: (id: string) => void;
  selectObject: (id: string | null) => void;
  toggleAnimation: (id: string) => void;
  setGizmoMode: (mode: "translate" | "rotate") => void;
  toggleLight: (id: string) => void;
  shadowQuality: number;
  setShadowQuality: (size: number) => void;
  clearScene: () => void;
  loadFullState: (data: { walls: Wall[]; objects: FurnitureObject[] }) => void;
}

export const useWallStore = create<WallStore>()(
  temporal(
    (set, get) => ({
      walls: [],
      selectedWallId: null,
      drawMode: "none",
      drawState: {},
      isTransforming: false,
      objects: [],
      selectedObjectId: null,
      gizmoMode: "translate" as const,
      shadowQuality: 2048,

      // ── Wall actions ───────────────────────────────

      addWall: (start, end, height, thickness, color = "#e0e0e0", textureId = null) => {
        const wall: Wall = {
          id: nextWallId(),
          start,
          end,
          height,
          thickness,
          color,
          textureId,
        };
        set((s) => ({ walls: [...s.walls, wall] }));
      },

      updateWall: (id, updates) => {
        set((s) => ({
          walls: s.walls.map((w) => (w.id === id ? { ...w, ...updates } : w)),
        }));
      },

      removeWall: (id) => {
        set((s) => ({
          walls: s.walls.filter((w) => w.id !== id),
          selectedWallId: s.selectedWallId === id ? null : s.selectedWallId,
        }));
      },

      selectWall: (id) => set({ selectedWallId: id, selectedObjectId: null }),

      setDrawMode: (mode) => set({ drawMode: mode, drawState: {} }),

      setDrawStart: (p) =>
        set((s) => ({ drawState: { ...s.drawState, start: p } })),

      setDrawCurrent: (p) =>
        set((s) => ({ drawState: { ...s.drawState, current: p } })),

      clearDraw: () => set({ drawState: {} }),

      setIsTransforming: (v) => set({ isTransforming: v }),

      // ── Object actions ─────────────────────────────

      addObject: (type, position, color) => {
        const cat = getCatalogItem(type);
        const obj: FurnitureObject = {
          id: nextObjId(),
          type,
          position: position ?? { x: 0, z: 2 },
          posY: cat.mountType === "wall" ? cat.mountHeight : cat.mountType === "counter" ? 0.85 : 0,
          rotation: 0,
          scale: 1,
          animated: false,
          lightOn: false,
          color: color ?? cat.defaultColor,
          width: cat.defaultWidth,
          height: cat.defaultHeight,
          depth: cat.defaultDepth,
        };
        set((s) => ({
          objects: [...s.objects, obj],
          selectedWallId: null,
          selectedObjectId: obj.id,
        }));
      },

      updateObject: (id, updates) => {
        set((s) => ({
          objects: s.objects.map((o) =>
            o.id === id ? { ...o, ...updates } : o
          ),
        }));
      },

      removeObject: (id) => {
        set((s) => ({
          objects: s.objects.filter((o) => o.id !== id),
          selectedObjectId: s.selectedObjectId === id ? null : s.selectedObjectId,
        }));
      },

      selectObject: (id) =>
        set({ selectedObjectId: id, selectedWallId: id ? null : undefined }),

      toggleAnimation: (id) => {
        set((s) => ({
          objects: s.objects.map((o) =>
            o.id === id ? { ...o, animated: !o.animated } : o
          ),
        }));
      },

      setGizmoMode: (mode) => set({ gizmoMode: mode }),

      toggleLight: (id) =>
        set((s) => ({
          objects: s.objects.map((o) =>
            o.id === id ? { ...o, lightOn: !o.lightOn } : o
          ),
        })),

      setShadowQuality: (size) => set({ shadowQuality: size }),

      clearScene: () => {
        set({ walls: [], objects: [], selectedWallId: null, selectedObjectId: null });
        localStorage.removeItem("cocina3d-walls");
      },

      loadFullState: (data) => {
        set({ walls: data.walls, objects: data.objects });
      },
    }),
    { limit: 50 }
  )
);

// Re-export temporal for Undo/Redo access
export function undo() {
  useWallStore.temporal.getState().undo();
}
export function redo() {
  useWallStore.temporal.getState().redo();
}
