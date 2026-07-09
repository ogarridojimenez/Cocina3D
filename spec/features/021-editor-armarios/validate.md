# Validación — 021 Editor de armarios configurable

| Requisito | Evidencia | Estado | Nota |
|-----------|-----------|--------|------|
| Objeto "Armario modular" en catálogo | `catalog.ts` armario-modular | ✅ | Montado en suelo |
| Nº baldas configurable (0-6) | `ObjectProperties.tsx` slider + `proceduralGeometry.ts` | ✅ | Distribución uniforme |
| Tipo puerta: acristalada | `proceduralGeometry.ts` doorType="glass" | ✅ | 40% opacidad |
| Tipo puerta: cerrada | `proceduralGeometry.ts` doorType="closed" | ✅ | Sólida color cuerpo |
| Tipo puerta: abierta | `proceduralGeometry.ts` doorType="open" | ✅ | Sin puerta, baldas visibles |
| shelves + doorType en store | `store.ts` FurnitureObject | ✅ | |

**Veredicto: ✅ APROBADO**
