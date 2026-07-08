# Especificación — 003 · Catálogo de Objetos

## Objetivo

Proporcionar un catálogo de muebles y electrodomésticos 3D que el usuario pueda arrastrar a la escena, posicionar, animar y editar. Los objetos son procedurales (geometrías básicas con colores) pero preparados para ser reemplazados por modelos GLTF reales sin cambiar la lógica de interacción.

## Actores

- **Diseñador** — Usuario que diseña la cocina arrastrando objetos desde el catálogo

## Historias de usuario

- Como diseñador, quiero ver un catálogo de objetos agrupados por categorías para elegir qué poner en la cocina
- Como diseñador, quiero arrastrar un objeto desde el catálogo a la escena para colocarlo en la posición que deseo
- Como diseñador, quiero seleccionar un objeto colocado para ver/editar sus propiedades
- Como diseñador, quiero mover objetos por la escena con un gizmo como el de las paredes
- Como diseñador, quiero hacer clic en puertas/cajones para abrirlos/cerrarlos con animación
- Como diseñador, quiero eliminar objetos con Delete/Supr

## Requisitos funcionales (EARS)

### Catálogo UI

- CUANDO el usuario abre el editor, EL SISTEMA DEBE mostrar un panel lateral izquierdo con el catálogo de objetos
- CUANDO el usuario ve el catálogo, EL SISTEMA DEBE agrupar los objetos en categorías colapsables (Muebles, Electrodomésticos, Encimera, Accesorios)
- CUANDO el usuario pasa el ratón sobre un objeto del catálogo, EL SISTEMA DEBE mostrar su nombre y una vista previa
- CUANDO el usuario hace clic en un objeto del catálogo, EL SISTEMA DEBE crear una instancia del objeto en el centro de la escena y seleccionarla automáticamente

### Objetos en escena

- CUANDO un objeto se añade a la escena, EL SISTEMA DEBE renderizarlo con geometría procedural (caja/cilindro con color distintivo) y escala realista
- CUANDO el usuario tiene un objeto seleccionado, EL SISTEMA DEBE mostrar un gizmo TransformControls con modo alternable entre mover (ejes X/Z) y rotar (eje Y)
- CUANDO el usuario tiene un objeto seleccionado, EL SISTEMA DEBE mostrar sus propiedades en el panel derecho (posición, rotación, dimensiones)
- CUANDO el usuario modifica una propiedad en el panel, EL SISTEMA DEBE actualizar el objeto en tiempo real
- CUANDO el usuario presiona Delete/Supr con un objeto seleccionado, EL SISTEMA DEBE eliminarlo
- CUANDO el usuario hace doble clic en un objeto con partes móviles (puerta, cajón), EL SISTEMA DEBE animar la apertura/cierre

### Animaciones

- CUANDO un objeto tiene puertas, EL SISTEMA DEBE rotar la puerta 90° alrededor de su bisagra al activar la animación
- CUANDO un objeto tiene cajones, EL SISTEMA DEBE trasladar el cajón 0.3m hacia fuera al activar la animación
- CUANDO la animación está activa y se vuelve a hacer clic, EL SISTEMA DEBE revertir la animación (cerrar)
- CUANDO se inicia una animación, EL SISTEMA DEBE completarla suavemente en 300ms con easing

### Gestión de estado

- CUANDO el usuario crea/modifica/elimina un objeto, EL SISTEMA DEBE registrarlo en el historial de Undo/Redo (Ctrl+Z/Y)
- CUANDO el usuario carga el editor, EL SISTEMA DEBE restaurar los objetos guardados en localStorage

## Catálogo inicial de objetos

| Objeto | Categoría | Geometría | Color | Dimensiones (m) | Animación |
|--------|-----------|-----------|-------|-----------------|-----------|
| Armario base | Muebles | Caja | #8B7355 (madera) | 0.6 × 0.85 × 0.5 | Puertas (2) |
| Armario alto | Muebles | Caja | #8B7355 | 0.6 × 0.6 × 0.35 | Puertas (2) |
| Cajones 3 | Muebles | Caja segmentada | #A0522D | 0.6 × 0.8 × 0.5 | Cajones |
| Estantería | Muebles | Caja abierta | #D2B48C | 0.8 × 1.8 × 0.35 | Ninguna |
| Mesa | Muebles | Tablero + patas | #DEB887 | 1.2 × 0.75 × 0.8 | Ninguna |
| Silla | Accesorios | Asiento + respaldo | #4A4A4A | 0.45 × 0.85 × 0.45 | Ninguna |
| Nevera | Electrodomésticos | Caja vertical | #F5F5F5 | 0.7 × 1.8 × 0.7 | Puerta (1) |
| Horno | Electrodomésticos | Caja | #2C2C2C | 0.6 × 0.6 × 0.6 | Puerta (1) |
| Microondas | Electrodomésticos | Caja pequeña | #C0C0C0 | 0.5 × 0.35 × 0.4 | Puerta (1) |
| Encimera | Encimera | Caja alargada | #B8A88A | 1.2 × 0.04 × 0.6 | Ninguna |
| Fregadero | Encimera | Caja hundida | #A0A0A0 | 0.8 × 0.15 × 0.5 | Ninguna |

## Requisitos no funcionales

- **Rendimiento:** 50 objetos deben mantener 30+ fps
- **Persistencia:** Objetos en la escena se guardan en localStorage (misma estrategia que paredes)
- **Undo/Redo:** Cada acción de objeto (añadir, mover, eliminar, animar) es deshacible
- **Animaciones:** 300ms, easing suave (ease-in-out), no bloqueantes
- **Preparado para GLTF:** La interfaz `FurnitureObject` debe permitir reemplazar geometría procedural por modelo externo sin cambiar la lógica

## Non-goals (fuera de alcance)

- ❌ No se implementa física (colisiones entre objetos o con paredes) — será feature 005
- ❌ No se cargan modelos GLTF reales — solo geometría procedural
- ❌ No hay snapping a paredes o entre objetos
- ❌ No hay catálogo de texturas/materials
- ❌ No hay renderizado fotorrealista

## Criterios de aceptación

1. Panel catálogo visible con 4 categorías colapsables
2. Cada categoría muestra sus objetos con icono y nombre
3. Click en objeto del catálogo → aparece en escena + se selecciona
4. Objeto seleccionable por clic → gizmo move X/Z
5. Doble clic en puerta/cajón → animación apertura/cierre
6. Panel propiedades muestra posición, rotación, dimensiones
7. Delete/Supr elimina objeto seleccionado
8. Ctrl+Z deshace creación/movimiento/eliminación de objeto
9. Los objetos persisten tras recargar página (localStorage)
10. 50 objetos mantienen rendimiento aceptable
