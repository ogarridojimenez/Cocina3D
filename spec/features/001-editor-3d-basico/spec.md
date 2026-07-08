# 001 · Editor 3D Básico

**Estado:** [propuesta | en curso | implementado ✅]

---

## Qué hace

El usuario ve una escena 3D vacía con un suelo cuadriculado. Puede mover la cámara libremente (orbitar, hacer zoom, paneo) para inspeccionar el espacio de diseño desde cualquier ángulo. La escena cuenta con iluminación básica que permite ver los objetos con claridad. Es la base sobre la que se construirán todas las demás features.

## Por qué

Sin una escena 3D funcional no se puede empezar a diseñar nada. Esta feature establece el esqueleto técnico del editor: canvas R3F, cámara, luces, render loop y controls. Todo lo demás (paredes, objetos, física) se montará sobre esto.

## Requisitos funcionales (EARS)

- CUANDO el usuario carga la página del editor, EL SISTEMA DEBE mostrar un canvas 3D ocupando todo el viewport
- CUANDO el usuario hace clic y arrastra con el botón izquierdo, EL SISTEMA DEBE orbitar la cámara alrededor del centro de la escena
- CUANDO el usuario usa la rueda del ratón, EL SISTEMA DEBE hacer zoom hacia/desde el centro de la escena
- CUANDO el usuario hace clic y arrastra con el botón derecho, EL SISTEMA DEBE panear la cámara horizontal/verticalmente
- MIENTRAS la escena está visible, EL SISTEMA DEBE mostrar una malla de suelo (grid) que indique el plano de trabajo
- MIENTRAS la escena está visible, EL SISTEMA DEBE aplicar iluminación ambiente suave + una luz direccional que proyecte sombras básicas
- CUANDO el usuario redimensiona la ventana del navegador, EL SISTEMA DEBE ajustar el canvas 3D automáticamente
- EL SISTEMA DEBE renderizar a 60fps en un equipo moderno con GPU integrada

## Requisitos no funcionales

- **Rendimiento:** 60fps estables en escena vacía. Máximo 30ms por frame (GPU integrada)
- **Precisión:** La cámara no debe permitir atravesar el suelo (límite inferior en Y)
- **Responsive:** Canvas 3D debe ocupar 100% del viewport en cualquier resolución (1920x1080 mínimo, 375x667 móvil)
- **Carga inicial:** El bundle principal del editor debe ser < 500KB (gzip)

## Criterios de aceptación

- [ ] El canvas 3D ocupa todo el viewport sin scrollbars
- [ ] OrbitControls: órbita, zoom y paneo funcionan correctamente
- [ ] Malla de suelo visible con líneas de cuadrícula (tamaño 20x20, celdas de 1m)
- [ ] Iluminación: ambiente (0.5 intensidad) + directional (sombra) perceptible
- [ ] El canvas se redimensiona correctamente al cambiar tamaño de ventana
- [ ] No hay errores en consola del navegador
- [ ] FPS > 55 en escena vacía (medido con Chrome DevTools)
- [ ] La cámara no baja del plano del suelo (eje Y >= 0)

## Clarify (edge cases)

| # | Pregunta | Respuesta |
|---|----------|-----------|
| 1 | ¿Qué pasa si el navegador no soporta WebGL? | Mostrar mensaje "Tu navegador no soporta WebGL. Actualiza a un navegador moderno (Chrome, Firefox, Edge)" |
| 2 | ¿Zoom mínimo/máximo? | Min: 0.5m del centro. Max: 50m del centro |
| 3 | ¿Color del grid? | Gris claro (#ccc) sobre fondo gris oscuro (#1a1a2e) |
| 4 | ¿WebGPU en lugar de WebGL? | De momento WebGL. WebGPU como mejora futura |
| 5 | ¿Soporte táctil (móvil/tablet)? | Sí: 1 dedo = orbitar, 2 dedos = zoom/pinch, 3 dedos = paneo |
| 6 | **¿Layout del editor?** | Grid: sidebar izquierda (tools) + canvas central + panel derecho (propiedades) cuando existan. Por ahora, canvas con espacio reservado |
| 7 | **¿Framework frontend?** | Next.js App Router |
| 8 | **¿Hardware mínimo?** | GPU integrada funcional, GPU dedicada para experiencia óptima |
| 9 | **¿Fondo 3D?** | #1a1a2e gris oscuro mate, sin skybox ni entorno |

## Fuera de alcance

- No hay objetos 3D en la escena (paredes, muebles) — eso es feature 002+
- No hay física ni colisiones
- No hay UI de herramientas laterales ni menús (solo el canvas 3D)
- No hay selección ni interacción con objetos
- No hay guardado de escena
