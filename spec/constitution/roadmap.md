# Roadmap — Cocina3D

> Estado y orden de las features. Cada entrada apunta a su carpeta en `features/`.

## Hecho ✅

1. **001-editor-3d-basico** — Editor 3D con React Three Fiber: escena vacía, cámara orbitable, malla de suelo, iluminación básica ✅
2. **002-creacion-paredes** — Dibujo de paredes con medidas reales (click + arrastre), snapping a ángulos rectos, edición de largo/ancho/alto ✅
3. **003-catalogo-objetos** — Catálogo de muebles y electrodomésticos 3D, arrastrar y soltar en la escena ✅
4. **004-texturas-paredes** — Texturas PBR en paredes (yeso, ladrillo, azulejo, madera) con tileado proporcional ✅
5. **005-parametrizacion-objetos** — Dimensiones editables (ancho/alto/fondo) en objetos del catálogo ✅
6. **006-colisiones-objetos** — Colisiones AABB entre objetos y paredes con feedback visual rojo ✅
7. **007-animaciones** — Animaciones suaves spring/smoothstep en puertas y cajones de muebles y electrodomésticos ✅
8. **008-exportacion-gestion** — Exportar GLTF, capturas PNG, Guardar/Abrir escenas (.json), Nuevo proyecto ✅

## Siguiente 🔜

1. **009-iluminacion-avanzada** — Luces puntuales, ambientales y sombras realistas
2. **010-materiales-avanzados** — Soporte para texturas PBR completas en muebles (mapas de normal, roughness, metalness)
3. **011-interfaz-usuario-v2** — Mejoras en el UX del catálogo y panel de propiedades

## Backlog 💡

- **012-multiusuario** — Edición colaborativa en tiempo real (WebSockets)
- **013-render-fotorrealista** — Render cloud fotorrealista con iluminación global
- **014-ia-sugerencias** — Sugerencias de distribución basadas en espacio y estilo
- **015-vr-ar** — Visor VR/AR con WebXR
- **016-presupuesto** — Generación de presupuesto desde los objetos colocados
