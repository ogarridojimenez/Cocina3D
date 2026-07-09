import { useWallStore } from "./store";

const STORAGE_KEY = "cocina3d-walls";

interface PersistedState {
  walls: any[];
  objects: any[];
}

export function saveState() {
  const { walls, objects } = useWallStore.getState();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ walls, objects }));
  } catch {
    // Silently fail (quota exceeded etc.)
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data: PersistedState = JSON.parse(raw);
    const store = useWallStore.getState();

    // GUARD: skip if data already loaded (prevents React Strict Mode double-exec)
    if (store.walls.length > 0 || store.objects.length > 0) return;

    // Restore walls
    if (Array.isArray(data.walls)) {
      data.walls.forEach((w) => {
        store.addWall(w.start, w.end, w.height, w.thickness, w.color, w.textureId ?? null);
      });
    }

    // Restore objects
    if (Array.isArray(data.objects)) {
      data.objects.forEach((o) => {
        store.addObject(o.type, o.position, o.color);
        // The addObject generates a new id, so we need to update with saved state
        const lastObj = useWallStore.getState().objects.at(-1);
        if (lastObj) {
          store.updateObject(lastObj.id, {
            rotation: o.rotation ?? 0,
            scale: o.scale ?? 1,
            animated: o.animated ?? false,
            lightOn: o.lightOn ?? false,
            width: o.width ?? 0.6,
            height: o.height ?? 0.6,
            depth: o.depth ?? 0.6,
            posY: o.posY ?? 0,
            materialId: o.materialId ?? null,
            lWidth: o.lWidth ?? 0,
            hasSink: o.hasSink ?? false,
          });
        }
      });
    }
  } catch {
    // Corrupted storage, silently ignore
  }
}