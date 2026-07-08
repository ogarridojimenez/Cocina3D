# Roadmap — Cocina3D

> Estado y orden de las features. Cada entrada apunta a su carpeta en `features/`.

## Hecho ✅

1. **001-editor-3d-basico** — Editor 3D con React Three Fiber: escena vacía, cámara orbitable, malla de suelo, iluminación básica ✅
2. **002-creacion-paredes** — Dibujo de paredes con medidas reales (click + arrastre), snapping a ángulos rectos, edición de largo/ancho/alto ✅
3. **003-catalogo-objetos** — Catálogo de muebles y electrodomésticos 3D, arrastrar y soltar en la escena ✅
4. **004-texturas-paredes** — Texturas PBR en paredes (yeso, ladrillo, azulejo, madera) con tileado proporcional ✅
5. **005-parametrizacion-objetos** — Dimensiones editables (ancho/alto/fondo) en objetos del catálogo ✅

## Siguiente 🔜

1. **005-parametrizacion-objetos** — Objetos paramétricos: cambiar dimensiones, materiales, colores en tiempo real
5. **005-colisiones-fisica** — Motor de física básico: objetos colisionan entre sí y con paredes, gravedad, snapping a superficies
6. **006-animacion-objetos** — Animación de puertas, cajones, electrodomésticos (abrir/cerrar/encender)
7. **007-exportacion-compartir** — Exportar diseño a GLTF, capturas de pantalla, enlace compartible

## Backlog 💡

- **008-multiusuario** — Edición colaborativa en tiempo real (WebSockets)
- **009-render-fotorrealista** — Render cloud fotorrealista con iluminación global
- **010-ia-sugerencias** — Sugerencias de distribución basadas en espacio y estilo
- **011-vr-ar** — Visor VR/AR con WebXR
- **012-presupuesto** — Generación de presupuesto desde los objetos colocados
