# Validación — 006 · Colisiones entre Objetos

**Estado:** ✅ Implementado — build exitoso

| Requisito (spec.md) | Evidencia | Estado |
|---------------------|-----------|--------|
| CUANDO usuario mueve objeto → detecta colisiones contra otros objetos | `collisions.ts` — AABB overlap check con `THREE.Box3` | ✅ |
| CUANDO usuario mueve objeto → detecta colisiones contra paredes | `collisions.ts` — `getWallBox()` calcula AABB de pared rotada | ✅ |
| CUANDO hay colisión → mostrar tinte rojo | `FurnitureObject.tsx` — `useEffect` tiñe materiales con `0xff4444` + emisivo rojo | ✅ |
| CUANDO no hay colisión → color normal | `useEffect` restaura `object.color` | ✅ |

## Veredicto: ✅ Aprobado
