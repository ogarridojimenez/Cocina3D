# Tareas — 002 · Creación de Paredes

| # | Tarea | Depende de | Criterio de aceptación | Estado |
|---|-------|-----------|--------------------------|:------:|
| 1 | Extender store Zustand con estado de paredes (walls, selectedWallId, drawMode, isTransforming, addWall, updateWall, removeWall, selectWall, setDrawMode) | — | Store tiene tipo Wall[] y acciones básicas CRUD + isTransforming | ✅ |
| 2 | Implementar Undo/Redo con zundo (temporal middleware) | 1 | Ctrl+Z deshace última acción, Ctrl+Y rehace. Límite 50 acciones | ✅ |
| 3 | Crear componente Wall (BoxGeometry rotada con posición start/end, altura y grosor) — geometría extendida para esquinas | 1 | Una pared 3D se renderiza correctamente entre dos puntos, con esquinas sin hueco | ✅ |
| 4 | Crear WallManager que renderiza todas las paredes del store | 3 | Al añadir pared al store, aparece en escena | ✅ |
| 5 | Crear WallMenu (diálogo de dimensiones: alto, largo, grosor, modo dibujo) — diseño profesional | 1 | Menú con campos y valores por defecto (alto 2.4m, largo 2m, grosor 10cm) | ✅ |
| 6 | Implementar WallDrawMode — arrastre con preview, snapping 90°, snap a extremos, intersecciones | 4, 5 | Click+arrastre dibuja pared con preview en tiempo real. Snap a 90° funciona. Snap a extremos. Intersecciones bloqueadas | ✅ |
| 7 | Implementar WallDrawMode — modo punto a punto con cierre de perímetro y Enter | 6 | Click en grid pone esquinas, Enter cierra perímetro | ✅ |
| 8 | Implementar selección de pared (click R3F) + panel WallProperties (largo, altura, grosor, color, eliminar) | 4 | Click en pared la selecciona (feedback visual). Panel muestra propiedades editables | ✅ |
| 9 | Implementar detección de intersecciones (no crear si cruza otra pared) + snap a extremos | 6, 7 | Intersección → bloquea y no crea. Cerca de extremo (<0.3m) → snap automático | ✅ |
| 10 | Implementar unión visual de esquinas (geometría extendida) | 8 | Dos paredes en esquina se ven conectadas sin separación | ✅ |
| 11 | Implementar TransformControls para mover pared seleccionada por eje (X/Z) | 8 | Al seleccionar pared, aparece gizmo de traslación. Arrastrar flecha mueve la pared | ✅ |
| 12 | Bloquear cámara durante interacciones (dibujo + transformación) | 6, 11 | OrbitControls se desactiva mientras se dibuja o arrastra gizmo | ✅ |
| 13 | Rediseño UI profesional (menu bar, toolbar con iconos SVG, modal, panel propiedades) | 5, 8 | Layout con barra superior (logo + menús + undo/redo), toolbar izquierda con iconos, properties con secciones | ✅ |

## Dependencias

```
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
      ↘                           ↗
        ├── 11 (paralelo a 9-10) ─┘
        ├── 12 (paralelo a 11)
        └── 13 (tras 5, 8)
```

Tareas paralelizables: 3-4, 11-12 con 9-10.
