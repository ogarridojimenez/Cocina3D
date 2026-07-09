# Validación — 017 Ventanas en paredes

| Requisito | Evidencia | Estado | Nota |
|-----------|-----------|--------|------|
| Objeto "Ventana" en catálogo | `catalog.ts` línea 531 | ✅ | Categoría Pared, 1.0×1.2m |
| Geometría marco + cristal | `proceduralGeometry.ts` case "window" | ✅ | 4 lados + cristal doble + parteluz |
| Hueco automático en pared | `Wall.tsx` buildWallGeometry() | ✅ | Shape + ExtrudeGeometry |
| Posicionamiento sobre pared | `Window.tsx` con wallOffset | ✅ | Snap a línea de pared |
| TransformControls | `FurnitureManager.tsx` ruteo | ✅ | Gizmo mover/rotar |

**Veredicto: ✅ APROBADO**
