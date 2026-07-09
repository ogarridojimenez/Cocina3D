# 014 · Interfaz Usuario V2

**Estado:** propuesta

## Qué hace

Rediseña el layout del editor para que se parezca a una app profesional de diseño de cocinas (IKEA Kreativ, Planner 5D, HomeByMe). Sin cambiar funcionalidad, solo reorganización visual y mejora de componentes UI.

## Layout objetivo

```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo] Nuevo | Guardar | Abrir                       ⬅ ➡ 🎬 📷  │ ← Header
├──────┬──────┬────────────────────────────┬────────────────────────┤
│      │      │                            │  Escena                │
│Catá- │  ❖  │                            │  ├ Pared 1            │
│logo  │  🔍 │       VISTA 3D              │  └ Objetos...          │
│grid  │  ➕  │                            ├────────────────────────┤
│iconos│ Wall│                            │ Propiedades [Tabs]     │
│      │      │                            │ [Dimensiones]          │
│      │      │                            │ [Acabados]             │
│      │      │                            │ [Iluminación]          │
├──────┴──────┴────────────────────────────┴────────────────────────┤
│ Objeto: Armario | X:2.5 Z:1.2 | Undo: Ctrl+Z | Zoom: 100%        │ ← Barra estado
└──────────────────────────────────────────────────────────────────┘
```

## Requisitos funcionales (EARS)

1. CUANDO el usuario abre el editor, EL SISTEMA DEBE mostrar el catálogo en un grid de iconos con thumbnails (categorías expandibles)
2. CUANDO el usuario selecciona un objeto en la escena, EL SISTEMA DEBE mostrar sus propiedades en secciones con pestañas (Dimensiones / Acabados / Iluminación)
3. CUANDO el usuario abre el outliner, EL SISTEMA DEBE mostrar un árbol jerárquico (Paredes > Objetos) con toggle visibilidad y bloqueo
4. CUANDO el usuario tiene un objeto seleccionado, EL SISTEMA DEBE mostrar la toolbar contextual con Mover/Rotar/Eliminar en el header
5. CUANDO el usuario pasa el ratón sobre un icono de toolbar, EL SISTEMA DEBE mostrar tooltip con atajo de teclado
6. CUANDO el editor carga, EL SISTEMA DEBE mostrar una barra de estado inferior con: nombre objeto seleccionado, coordenadas X/Z, atajos, zoom
7. CUANDO el usuario arrastra un ítem del catálogo a la escena, EL SISTEMA DEBE añadir el objeto (funcionalidad actual drag-and-drop existe pero nunca se habilitó)
8. CUANDO el usuario selecciona un objeto en el outliner, EL SISTEMA DEBE seleccionarlo en escena y mostrar sus propiedades
9. CUANDO el usuario alterna visibilidad en el outliner, EL SISTEMA DEBE ocultar/mostrar el objeto en la escena 3D
10. MIENTRAS el panel propiedades está abierto sin selección, EL SISTEMA DEBE mostrar un mensaje "Selecciona un objeto para editar"
11. SI el catálogo tiene más de 20 objetos, ENTONCES EL SISTEMA DEBE mostrar un campo de búsqueda/filtro

## Criterios de aceptación

- [ ] Catálogo en grid visual con thumbnails y categorías expandibles
- [ ] Panel propiedades con tabs (Dimensiones, Acabados, Iluminación)
- [ ] Outliner jerárquico con visibilidad y bloqueo
- [ ] Toolbar con tooltips de atajos
- [ ] Barra de estado inferior
- [ ] Build pasa sin errores
- [ ] Persistencia y undo/redo siguen funcionando tras el refactor

## Fuera de alcance (ahora)

- Drag & drop real a escena (solo layout de catálogo, funcionalidad en otra feature)
- Nuevas propiedades funcionales (solo reorganizar las existentes en tabs)
- Temas / dark-light mode toggle