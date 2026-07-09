# Validación — 018 Puertas en paredes

| Requisito | Evidencia | Estado | Nota |
|-----------|-----------|--------|------|
| Objeto "Puerta" en catálogo | `catalog.ts` línea 518 | ✅ | Categoría Pared, 0.9×2.1m |
| Geometría marco + hoja | `proceduralGeometry.ts` case "door" | ✅ | Marco 4 lados + panel decorativo |
| Animación apertura | `doorGroup` con pivot lateral | ✅ | Doble clic rota 81° |
| Lado configurable | `swingSide` en store + swingSide en opts | ✅ | Izquierda/derecha via store |
| Tirador | Barra + pomo lado opuesto bisagras | ✅ | |

**Veredicto: ✅ APROBADO**
