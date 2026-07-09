# Tareas — 010 Materiales PBR

| # | Tarea | Depende de | Criterio de aceptación | Paral. |
|---|-------|-----------|-------------------------|:------:|
| 1 | Crear `src/data/materials.ts` con catálogo de 5 materiales | — | Define MaterialDef con id, name, category, baseColor, generate() | ✅ |
| 2 | Implementar generación procedural Canvas para cada material (albedo) | 1 | Cada material produce un canvas 256×256 con patrón visual reconocible | ❌ |
| 3 | Implementar generación de normal map vía derivadas parciales (Sobel) | 2 | Normal map gris/morado derivado del albedo | ❌ |
| 4 | Implementar `buildPBRMaterial()` en `src/lib/materials.ts` | 1,2,3 | Devuelve `MeshStandardMaterial` con mapas cargados + cache | ❌ |
| 5 | Añadir `materialId: string | null` a `FurnitureObject` en store | — | Campo opcional, null = color sólido | ❌ |
| 6 | Añadir `setMaterial` action al store | 5 | `setMaterial(id, materialId)` actualiza objeto | ❌ |
| 7 | Modificar `proceduralGeometry.ts` para aceptar materialId opcional | 4,6 | Si materialId presente, usa buildPBRMaterial en vez de color sólido | ❌ |
| 8 | Persistir `materialId` en `persist.ts` (save + load) | 5 | Se guarda y restaura en localStorage | ❌ |
| 9 | Añadir selector de material en `ObjectProperties.tsx` | 4,6 | Dropdown con lista de materiales + preview de color | ❌ |
| 10 | Build + test en navegador: cambiar material se ve en tiempo real | 7,8,9 | Al seleccionar "Nogal" el objeto se oscurece y aparecen vetas | ❌ |
| 11 | Commit y documentación (validate.md + Obsidian) | 10 | — | ❌ |

**Notas:** Tareas 2 y 3 pueden hacerse en serie (normal map deriva de albedo). Tareas 5, 7, 8, 9 pueden paralelizarse tras completar 4 y 6.