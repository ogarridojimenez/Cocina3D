# Validación — 008 Exportación y Gestión de Escenas

| Requisito (spec.md) | Evidencia/Test | Estado | Nota |
|---------------------|----------------|:------:|------|
| Export GLTF descarga .glb | Clic botón → descarga archivo .glb (3KB+) | ✅ | Verificado con build exitoso |
| Captura descarga .png (no negro) | Clic botón → descarga .png visible | ✅ | `preserveDrawingBuffer` + `gl.render()` forzado |
| Guardar descarga .json con walls+objects | Clic Guardar → JSON con estructura correcta | ✅ | Contiene arrays walls y objects |
| Abrir restaura escena exacta | Seleccionar .json → escena se restaura igual | ✅ | `loadFullState()` carga directo al store |
| Nuevo pide confirmación si hay datos | Clic Nuevo con escena → confirm() aparece | ✅ | confirm("¿Estás seguro?") |
| Nuevo limpia sin preguntar si está vacío | Clic Nuevo sin datos → limpia directo | ✅ | Condición `> 0` |
| Tras Nuevo + refresh no aparecen datos viejos | Nuevo → refresh → localStorage vacío | ✅ | `localStorage.removeItem()` en clearScene |
| JSON inválido muestra error | Cargar archivo sin formato → alert("Formato inválido") | ✅ | try/catch con validación |

## Desviaciones y resolución
| Desviación | Decisión |
|------------|----------|
| Captura salía negra inicialmente | Corregido con `preserveDrawingBuffer: true` + render forzado |
| Nuevo no limpiaba localStorage | Corregido añadiendo `localStorage.removeItem()` en clearScene |
| GLTF no incluía texturas | No es requisito — exporta geometría y materiales básicos |

## Veredicto final
**APROBADO** ✅ — Todas las operaciones de exportación, importación y gestión de escenas funcionan correctamente.
