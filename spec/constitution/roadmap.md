# 🗺️ Roadmap — Cocina3D

> Proyecto: App web diseño 3D de cocinas B2B con React Three Fiber.
> Stack: Next.js 14 + R3F + TypeScript + Zustand + zundo (undo/redo).

## Leyenda
- ✅ Completado
- 🔜 En progreso
- 📋 Backlog

---

## Features completadas ✅

| # | Feature | Archivos clave |
|:---:|---------|----------------|
| 001 | **Editor 3D básico** — Escena R3F, cámara orbitable, grid | `CameraController` |
| 002 | **Creación de paredes** — DrawWall, snapping, intersecciones | `Wall2D`, `Wall3D`, `WallProperties` |
| 003 | **Catálogo de objetos** — 17 objetos procedurales, gizmo, 5 categorías | `Catalog.ts`, `proceduralGeometry.ts`, `FurnitureManager` |
| 004 | **Texturas paredes** — Tiling proporcional, PBR | `Wall.tsx` texturas |
| 005 | **Parametrización** — Dimensiones editables dinámicas | `ObjectProperties.tsx` |
| 006 | **Colisiones AABB** | `collisions.ts` |
| 007 | **Animaciones** — SmoothStep + spring en puertas | `FurnitureObject.tsx` animations |
| 008 | **Exportación/Gestión** — GLTF, PNG, JSON, Nuevo | `ExportManager.tsx`, `persist.ts` |
| 009 | **Iluminación Avanzada** — Hemi, PCFSoft, PointLights, SpotLights | `Lighting.tsx`, toggleLight UI |
| 010 | **Materiales PBR** — 10 materiales procedurales, selector por objeto | `materials.ts`, `lib/materials.ts` |
| 011 | **Catálogo Meseta + TV** — Meseta modular L, TV pared, fregadero | meseta L, TV, `FurnitureCatalog.tsx` |
| 012 | **Suelo catálogo** — Objeto suelo, texturas CC0, selección solo menú | `floorTextures.ts`, dropdown outliner |
| 013 | **Texturas Paredes CC0** — 8 texturas PBR Poly Haven para cocina | `textures.ts`, `public/textures/wall/` |
| 014 | **Interfaz Usuario V2** — Layout profesional: catálogo grid, toolbar tooltips, panel tabs, outliner jerárquico, status bar | `EditorLayout.tsx`, `CatalogPanel.tsx`, `ObjectProperties.tsx`, `ObjectOutliner.tsx`, `StatusBar.tsx`, `TabPanel.tsx` |
| 015 | **Catálogo Ampliado** — 15 objetos nuevos (vitrina, despensa, placa inducción, robot cocina, lámparas, etc.), nueva categoría Iluminación, 34 objetos total | `catalog.ts`, `proceduralGeometry.ts` |
| 016 | **Texturas CC0 objetos** — 10 materiales PBR reales (roble, nogal, pino, wengué, cerezo, mármol, granito, pizarra, acero, latón) desde Poly Haven | `materialTextures.ts`, `materials.ts`, `public/textures/materials/` |

## En desarrollo 🔜

| # | Feature | Archivos clave |
|:---:|---------|----------------|
| 017 | **Ventanas en paredes** — huecos con marco, posición/configurables, se renderizan como parte de la pared | `Wall.tsx`, `WindowProperties.tsx`, `store.ts` |
| 018 | **Puertas en paredes** — huecos con marco, apertura animada, lado apertura configurable | `Wall.tsx`, `DoorProperties.tsx`, `store.ts` |
| 019 | **Tuberías y fontanería** — columnas fontanería, tuberías vistas bajo fregadero | `catalog.ts`, `proceduralGeometry.ts` |
| 020 | **Encimeras configuradas** — encimeras de cuarzo/granito/madera con texturas CC0 propias, forma L/U | `proceduralGeometry.ts`, `catalog.ts`, `materials.ts` |
| 021 | **Editor armarios** — altura/anchura configurable, número de baldas, tipo de puertas | `proceduralGeometry.ts`, `ArmarioProperties.tsx` |
| 022 | **Modo Planta 2D** — vista cenital con layout, mediciones, grid | `PlantView.tsx`, `PlantToolbar.tsx` |
| 023 | **Generación presupuesto** — precios por objeto, total, exportable PDF | `BudgetPanel.tsx`, `prices.ts` |

## Backlog 📋

| # | Feature | Descripción |
|:---:|---------|-------------|
| 024 | **Multiusuario** | Edición colaborativa en tiempo real con WebSocket + CRDT |
| 025 | **Render fotorrealista** | Render cloud con Path Tracing / IL global |
| 026 | **IA sugerencias** | Distribución automática de mobiliario |
| 027 | **Visor VR/AR** | WebXR |
| 028 | **Texturas HD objetos** | Texturas 4K para materiales existentes |

---

## Notas técnicas

- **Persistencia:** localStorage, clave `cocina3d-walls`
- **Gizmo:** TransformControls de drei (translate/rotate con R)
- **Texturas:** PBR CC0 de Poly Haven en `public/textures/floor/` (7), `public/textures/wall/` (8), `public/textures/materials/` (10)
- **Suelo:** Seleccionable solo desde menú desplegable (sin click en escena)
- **Todo objeto tiene:** tipo, posición 2D + Y, rotación, escala, dimensiones, color, animación toggle, lightOn, materialId
