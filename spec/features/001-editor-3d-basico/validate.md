# Validación — 001 · Editor 3D Básico

> Verificación de que la implementación cumple la especificación.

## Trazabilidad requisitos → evidencia

| # | Requisito (spec.md) | Evidencia / Test | Estado | Nota |
|---|---------------------|------------------|:------:|------|
| R1 | CUANDO carga la página del editor, EL SISTEMA DEBE mostrar un canvas 3D ocupando todo el viewport | Test visual: navegar a `/editor`. El canvas 3D ocupa el centro del viewport | ⏳ | |
| R2 | CUANDO clic+arrastra botón izquierdo, EL SISTEMA DEBE orbitar la cámara | Test manual: arrastrar con clic izq → la escena rota alrededor del centro | ⏳ | |
| R3 | CUANDO usa la rueda del ratón, EL SISTEMA DEBE hacer zoom | Test manual: scroll up/down → zoom in/out | ⏳ | |
| R4 | CUANDO clic+arrastra botón derecho, EL SISTEMA DEBE panear | Test manual: arrastrar con clic der → la vista se desplaza | ⏳ | |
| R5 | MIENTRAS la escena está visible, mostrar malla de suelo (grid) | Test visual: debe verse una cuadrícula 20×20 bajo la escena | ⏳ | |
| R6 | MIENTRAS la escena está visible, aplicar iluminación ambiente + direccional con sombras | Test visual: añadir un objeto de prueba (ej: cubo) y verificar que proyecta sombra | ⏳ | |
| R7 | CUANDO se redimensiona la ventana, ajustar canvas automáticamente | Test manual: cambiar tamaño de ventana → el canvas se adapta sin deformaciones | ⏳ | |
| R8 | Renderizar a 60fps en GPU integrada | Chrome DevTools > Rendimiento > FPS meter > debe mostrar >55 FPS | ⏳ | |
| N1 | **Rendimiento:** 60fps, máx 30ms/frame en escena vacía | `performance.now()` + DevTools: frame time < 30ms | ⏳ | |
| N2 | **Cámara:** no atravesar el suelo (límite Y) | Test manual: orbitar bajo el suelo → la cámara se detiene en Y=0 | ⏳ | |
| N3 | **Responsive:** canvas 100% viewport sin scroll | Test visual: 1920×1080, 1280×720, 375×667 → sin scrollbars | ⏳ | |
| N4 | **Carga:** bundle < 500KB gzip | `next/bundle-analyzer` o DevTools > Network > gzip size | ⏳ | |
| C1 | **Clarify #6:** Layout grid con espacio para sidebar/properties | Inspector CSS: sidebar y properties columnas existen (aunque 0fr) | ⏳ | |
| C2 | **Clarify #7:** Next.js App Router | Verificar `app/editor/page.tsx` usa App Router | ⏳ | |
| C3 | **Clarify #8:** Funcional en GPU integrada | Testear en portátil con Intel UHD (o similar) → >30fps aceptable | ⏳ | |
| C4 | **Clarify #9:** Fondo #1a1a2e mate, sin skybox | Inspector CSS: background-color del canvas = #1a1a2e | ⏳ | |

### Criterios de aceptación

| # | Criterio | Evidencia | Estado |
|---|---------|-----------|:------:|
| A1 | Canvas 3D ocupa todo el viewport sin scrollbars | Captura de pantalla en 1920×1080 y 375×667 | ⏳ |
| A2 | OrbitControls: órbita, zoom y paneo funcionan | Video de 10s probando los 3 controles | ⏳ |
| A3 | Malla de suelo visible (20×20, celdas 1m) | Captura de pantalla con grid visible | ⏳ |
| A4 | Iluminación: ambiente + direccional perceptible | Captura con cubo de prueba proyectando sombra | ⏳ |
| A5 | Canvas se redimensiona al cambiar ventana | Video 5s redimensionando | ⏳ |
| A6 | Sin errores en consola del navegador | DevTools > Console: 0 errores | ⏳ |
| A7 | FPS > 55 en escena vacía | DevTools > FPS meter: valor capturado | ⏳ |
| A8 | Cámara no baja del suelo | Video 5s intentando orbitar bajo Y=0 | ⏳ |

### Tareas de implementación

| # | Tarea | Estado |
|---|-------|:------:|
| 1 | Inicializar Next.js + deps | ✅ |
| 2 | CSS global | ✅ |
| 3 | Zustand store | ✅ |
| 4 | Lighting | ✅ |
| 5 | GridFloor | ✅ |
| 6 | CameraController | ✅ |
| 7 | Scene (agrupa) | ✅ |
| 8 | WebGLFallback | ✅ |
| 9 | EditorLayout | ✅ |
| 10 | Página /editor | ✅ |

### Tareas de verificación

| # | Tarea | Estado |
| V5 | Build exitoso (`npm run build`) | ✅ |
| V1 | FPS > 55 | ⏳ |
| V2 | Redimensionado correcto | ⏳ |
| V3 | Límites de cámara | ⏳ |
| V4 | Consola sin errores | ⏳ |
| V5 | Build exitoso (`npm run build`) | ⏳ |

## Desviaciones y resolución

> _Se rellena durante/después de la implementación._

| Desviación | Decisión | Estado |
|-----------|----------|:------:|
| _(ej: "El grid no se ve en móvil")_ | _(¿se arregla código o se actualiza spec?)_ | ⏳ |

## Veredicto final

- [ ] **Aprobado** ✅ — Todos los requisitos cumplidos
- [ ] **Aprobado con observaciones** ⚠️ — Requisitos críticos cumplidos, algunos menores pendientes
- [ ] **Rechazado** ❌ — Requisitos críticos no cumplidos
