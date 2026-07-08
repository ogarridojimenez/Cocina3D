# 002 · Creación de Paredes

**Estado:** propuesta

---

## Qué hace

El usuario puede dibujar paredes en la escena 3D mediante dos métodos: colocando puntos esquina sobre el grid, o arrastrando desde un punto hasta el largo deseado. Las paredes tienen grosor configurable, altura editable y snapping a 90°. Aparece un menú para configurar dimensiones iniciales antes de dibujar, con valores propuestos por defecto. Una vez colocadas, las paredes se pueden seleccionar y editar sus propiedades.

## Por qué

Las paredes definen el espacio de diseño de la cocina. Sin paredes, los muebles y electrodomésticos no tienen contexto espacial. Es la feature más importante después del editor base.

## Requisitos funcionales (EARS)

- CUANDO el usuario hace clic en el botón "Añadir pared" de la toolbar, EL SISTEMA DEBE mostrar un menú con campos para alto, largo y grosor de la pared, con valores propuestos por defecto (alto 2.4m, largo 2m, grosor 10cm)
- CUANDO el usuario confirma las dimensiones en el menú, EL SISTEMA DEBE activar el modo de dibujo de paredes
- MIENTRAS el modo de dibujo está activo, EL SISTEMA DEBE cambiar el cursor a una cruz o indicador visual
- CUANDO el usuario hace clic en el grid (modo punto a punto), EL SISTEMA DEBE colocar el primer punto esquina en esa posición
- CUANDO el usuario hace clic en otra posición del grid (modo punto a punto), EL SISTEMA DEBE crear un segmento de pared entre el punto anterior y el nuevo
- CUANDO el usuario presiona Enter o hace clic en el primer punto (modo punto a punto), EL SISTEMA DEBE cerrar el perímetro conectando el último punto con el primero
- CUANDO el usuario hace clic y arrastra desde una posición del grid (modo arrastre), EL SISTEMA DEBE mostrar un preview en tiempo real de la pared mientras se arrastra
- CUANDO el usuario suelta el ratón (modo arrastre), EL SISTEMA DEBE crear la pared entre el punto inicial y el punto final
- MIENTRAS el usuario arrastra, SI la dirección está a menos de 15° de un ángulo de 90°, EL SISTEMA DEBE snap (ajustar) la pared al ángulo exacto de 90° (snapping)
- CUANDO el usuario hace clic sobre una pared existente, EL SISTEMA DEBE seleccionarla y mostrar un panel de propiedades (alto, largo, grosor, posición)
- CUANDO el usuario modifica las propiedades de una pared seleccionada, EL SISTEMA DEBE actualizar la geometría en tiempo real
- CUANDO el usuario arrastra una pared seleccionada, EL SISTEMA DEBE mover la pared manteniendo su orientación
- CUANDO el usuario presiona Supr/Delete con una pared seleccionada, EL SISTEMA DEBE eliminar la pared
- CUANDO el usuario selecciona un grosor de pared (5cm, 10cm, 15cm, 20cm), EL SISTEMA DEBE regenerar la geometría con ese grosor
- CUANDO dos paredes se encuentran en un punto esquina, EL SISTEMA DEBE unirlas visualmente sin huecos ni solapamientos
- MIENTRAS no hay paredes en la escena, EL SISTEMA DEBE mostrar el grid limpio y el botón "Añadir pared" visible

## Requisitos no funcionales

- **Rendimiento:** Las paredes deben renderizarse a 60fps incluso con 50+ paredes en escena
- **Precisión:** Las medidas deben ser exactas en unidades de metro (1 unidad = 1 metro)
- **Snapping:** El ángulo de snapping debe ser 90° con un umbral de ±15°
- **Grosor:** Opciones disponibles: 5cm, 10cm, 15cm, 20cm. Default: 10cm
- **Altura por defecto:** 2.4m (estándar de construcción)

## Criterios de aceptación

- [ ] Se puede dibujar una pared con modo punto a punto
- [ ] Se puede dibujar una pared con modo arrastre
- [ ] El preview aparece durante el arrastre
- [ ] El snapping a 90° funciona durante el arrastre
- [ ] El botón "Añadir pared" muestra el menú de dimensiones
- [ ] Las paredes se pueden seleccionar con clic
- [ ] Las propiedades de la pared se pueden editar
- [ ] Las paredes se pueden eliminar con Supr/Delete
- [ ] Los grosores 5cm, 10cm, 15cm, 20cm funcionan
- [ ] Dos paredes se unen visualmente en las esquinas
- [ ] 50+ paredes mantienen 60fps
- [ ] No hay errores en consola
- [ ] Undo/Redo funcionan para todas las acciones de pared
- [ ] Al dibujar cerca de un extremo de pared existente, snap automático
- [ ] Si una pared nueva cruza otra existente, se muestra aviso y no se crea

## Clarify (edge cases)

| # | Pregunta | Respuesta |
|---|----------|-----------|
| 1 | ¿Intersección entre paredes? | Avisar al usuario y no crear la pared |
| 2 | ¿Undo/Redo? | Sí, para todas las acciones de pared (Ctrl+Z / Ctrl+Y) |
| 3 | ¿Color por defecto? | Gris claro #e0e0e0 |
| 4 | ¿Snap a extremos de otras paredes? | Sí, detectar extremo cercano y snap automático |

## Fuera de alcance

- Paredes curvas (solo rectas)
- Puertas y ventanas en paredes (feature futura)
- Texturas o materiales en paredes (solo color sólido)
- Colisiones con objetos (feature 005)
- Medición automática de áreas
