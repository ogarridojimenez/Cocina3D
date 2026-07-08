# Plan técnico — 002 · Creación de Paredes

## Arquitectura

```
┌───────────────────────────────────────────────────────────────┐
│                       EditorLayout                            │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Top Menu Bar: [C] Cocina3D · Archivo Editar Ver Ayuda  │  │
│  │                           Undo/Redo     1 seleccionado  │  │
│  ├──────────┬──────────────────────────┬────────────────────┤  │
│  │ Toolbar  │     Canvas 3D            │ Properties Panel   │  │
│  │ 🏔       │  ┌────────────────────┐  │ ┌──────────────┐  │  │
│  │ ───      │  │ WallManager        │  │ │ Dimensiones  │  │  │
│  │ 🧱       │  │ └─ Wall[0] (mesh)  │  │ │ Apariencia   │  │  │
│  │          │  │ └─ Wall[1] (mesh)  │  │ │ Eliminar     │  │  │
│  │          │  │ CameraController   │  │ └──────────────┘  │  │
│  │          │  │ WallDrawMode       │  │                   │  │
│  │          │  │ GridFloor/Lighting │  │                   │  │
│  │          │  └────────────────────┘  │                   │  │
│  └──────────┴──────────────────────────┴────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

## Capas del sistema

| Capa | Responsabilidad | Componentes/Archivos |
|------|----------------|---------------------|
| **Store** | Estado global, CRUD paredes, undo/redo | `src/lib/store.ts` — Zustand + zundo |
| **Layout** | Grid layout, menu bar, integración | `EditorLayout.tsx` |
| **3D Scene** | Renderizado Three.js, grid, luces, cámara | `Scene.tsx`, `GridFloor.tsx`, `Lighting.tsx`, `CameraController.tsx` |
| **Paredes 3D** | Geometría, selección, transformación | `Wall.tsx`, `WallManager.tsx` |
| **Dibujo** | Interacción usuario para crear paredes | `WallDrawMode.tsx` — preview, snapping, intersecciones |
| **UI** | Menús, modales, paneles de propiedades | `WallMenu.tsx`, `WallProperties.tsx` |

## Datos

### Wall

```ts
interface Wall {
  id: string;       // "wall-1", "wall-2", ...
  start: Point2D;   // { x, z } punto inicial
  end: Point2D;     // { x, z } punto final
  height: number;   // metros, defecto 2.4
  thickness: number; // metros, defecto 0.1 (10cm)
  color: string;    // hex, defecto "#e0e0e0"
}
```

### Store (Zustand + zundo)

```ts
interface WallStore {
  walls: Wall[];
  selectedWallId: string | null;
  drawMode: 'none' | 'point' | 'drag';
  drawState: { start?: Point2D; current?: Point2D };
  isTransforming: boolean;  // bloquea cámara durante transformación

  addWall(start, end, height, thickness, color?): void;
  updateWall(id, partial): void;
  removeWall(id): void;
  selectWall(id | null): void;
  setIsTransforming(v): void;
  /* draw mode actions */
  setDrawMode(mode): void;
  setDrawStart(p): void;
  setDrawCurrent(p?): void;
  clearDraw(): void;
}
```

## Flujos

### Crear pared (arrastre)
1. Usuario click 🧱 → abre `WallMenu` (modal)
2. Configura altura, largo, grosor, modo "arrastre"
3. Click "Dibujar" → `setDrawMode("drag")` → cursor crosshair, cámara bloqueada
4. `pointerdown` en canvas guarda `drawState.start`
5. `pointermove` (vía `useFrame`) muestra preview con snapping 90° y snap a extremos
6. `pointerup` → `addWall(start, snappedEnd)` → cámara desbloqueada

### Crear pared (punto a punto)
1. Similar, modo "punto a punto"
2. Cada click añade punto a `pointsRef[]`
3. Con 2+ puntos, crea segmento entre últimos dos
4. Enter → conecta último con primero (cierra polígono)

### Mover pared (gizmo)
1. Click en pared → `selectedWallId = wall.id` → TransformControls aparece
2. `onMouseDown` → `isTransforming = true` → OrbitControls desactivado
3. Arrastre de flecha (X/Z) mueve mesh via Three.js
4. `onMouseUp` → calcula delta → `updateWall(start+delta, end+delta)` → `isTransforming = false`

### Editar propiedades
1. Click en pared → panel derecho muestra dimensiones, apariencia, eliminar
2. Cambiar input → `updateWall(id, field)` → geometría se actualiza reactivamente

## Cambios sobre la especificación original

| Cambio | Razón |
|--------|-------|
| Geometría extendida (`length + thickness`) | Esquinas 90° sin huecos visuales |
| `isTransforming` + `drawMode` en CameraController | Competencia entre OrbitControls y TransformControls/WallDrawMode |
| Rediseño UI con menu bar | Solicitud del usuario — UI "fea" |
| Iconos SVG en toolbar | Sin dependencias externas de iconos |
| TransformControls en vez de drag manual | Gizmo profesional para movimiento por eje |

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|-----------|
| TransformControls sobrescribe posición del mesh durante arrastre | `onMouseUp` lee posición final y persiste en store. React no sobrescribe durante drag |
| React re-render durante transformación | TransformControls opera fuera del ciclo de React. Solo se lee posición al soltar |
| Conflicto entre eventos R3F y DOM | Selección vía `onClick` de R3F (stopPropagation). Deselección vía Escape |
