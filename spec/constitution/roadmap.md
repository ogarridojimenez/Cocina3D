# 🗺️ Roadmap — Cocina3D

> Proyecto: App web diseño 3D de cocinas B2B con React Three Fiber.
> Stack: Next.js 14 + R3F + TypeScript + Zustand + zundo (undo/redo).

## Leyenda
- ✅ Completado
- 🔜 Siguiente
- 📋 Backlog

---

## Features completadas ✅

| # | Feature | Archivos creados |
|:---:|---------|------------------|
| 001 | **Editor 3D básico** — Escena R3F, cámara orbitable, grid | `CameraController` |
| 002 | **Creación de paredes** — DrawWall, snapping, intersecciones | `Wall2D`, `Wall3D`, `WallProperties` |
| 003 | **Catálogo de objetos** — 17 objetos procedurales, gizmo, 5 categorías | `Catalog.ts`, `proceduralGeometry.ts`, `FurnitureManager` |
| 004 | **Texturas paredes** — Tiling proporcional, PBR | `Wall.tsx` texturas |
| 005 | **Parametrización** — Dimensiones editables dinámicas | `ObjectProperties.tsx` |
| 006 | **Colisiones AABB** | `collisions.ts` |
| 007 | **Animaciones** — SmoothStep + spring en puertas | `FurnitureObject.tsx` animations |
| 008 | **Exportación/Gestión** — GLTF, PNG, JSON, Nuevo | `ExportManager.tsx`, `persist.ts` |
| 009 | **Iluminación Avanzada** — HemisphereLight, PCFSoft, PointLights, SpotLights, calidad sombras | `Lighting.tsx`, toggleLight UI |
| 010 | **Materiales PBR** — 10 materiales procedurales con albedo + normal + roughness + metalness, selector por objeto | `materials.ts`, `lib/materials.ts`, selector en ObjectProperties |

## Siguiente 🔜

| # | Feature | Dependencias |
|:---:|---------|:------------:|
| 011 | **Interfaz Usuario V2** — Refactor catálogo y panel propiedades | 010 |

## Backlog 📋

| # | Feature | Descripción |
|:---:|---------|-------------|
| 012 | Multiusuario | Edición colaborativa en tiempo real |
| 013 | Render fotorrealista | Render cloud con Path Tracing / iluminación global |
| 014 | IA sugerencias | Distribución automática de mobiliario |
| 015 | Visor VR/AR | WebXR |
| 016 | Presupuesto | Generación automática de presupuesto desde objetos |

---

## Notas técnicas

- **Persistencia:** localStorage, clave `cocina3d-walls`
- **Gizmo:** TransformControls de drei (translate/rotate con R)
- **Materiales:** Canvas procedurales (sin dependencias externas)
- **Texturas paredes:** `/public/textures/{id}.jpg` (en repositorio)
- **Todo objeto tiene:** tipo, posición 2D + Y, rotación, escala, dimensiones, color, animación toggle, lightOn, materialId