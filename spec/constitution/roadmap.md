# 🗺️ Roadmap — Cocina3D

> Proyecto: App web diseño 3D de cocinas B2B con React Three Fiber.
> Stack: Next.js 14 + R3F + TypeScript + Zustand + zundo (undo/redo).

## Leyenda
- ✅ Completado
- 🔜 Siguiente
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

## Siguiente 🔜

| # | Feature | Dependencias |
|:---:|---------|:------------:|
| — | **Interfaz Usuario V2** — Refactor catálogo y panel propiedades | — |

## Backlog 📋

| # | Feature | Descripción |
|:---:|---------|-------------|
| — | Multiusuario | Edición colaborativa en tiempo real |
| — | Render fotorrealista | Render cloud con Path Tracing / IL global |
| — | IA sugerencias | Distribución automática de mobiliario |
| — | Visor VR/AR | WebXR |
| — | Presupuesto | Generación automática desde objetos |

---

## Notas técnicas

- **Persistencia:** localStorage, clave `cocina3d-walls`
- **Gizmo:** TransformControls de drei (translate/rotate con R)
- **Texturas:** PBR CC0 de Poly Haven en `public/textures/floor/` (7) y `public/textures/wall/` (8)
- **Suelo:** Seleccionable solo desde menú desplegable (sin click en escena)
- **Todo objeto tiene:** tipo, posición 2D + Y, rotación, escala, dimensiones, color, animación toggle, lightOn, materialId
