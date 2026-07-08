# 001 · Editor 3D Básico — Tareas

> Checklist accionable. Cada tarea tiene criterio de aceptación claro. Ordenadas por dependencias.

## Tareas de implementación

| # | Tarea | Depende de | Criterio de aceptación | Paralelizable |
|---|-------|-----------|------------------------|:-------------:|
| 1 | **Inicializar proyecto Next.js** — `npx create-next-app@latest cocina3d --typescript --tailwind --app --src-dir` + instalar dependencias: `@react-three/fiber`, `@react-three/drei`, `three`, `@types/three`, `zustand` | — | `npm run dev` compila sin errores. `npm run build` pasa sin warnings. package.json tiene todas las deps | No |
| 2 | **Configurar CSS global** — `globals.css` con reset básico, variables de color (fondo `#1a1a2e`), body full-height sin scroll, fuente Inter/sans-serif | 1 | El fondo de la página es `#1a1a2e`, body ocupa 100vh, sin scrollbars ni márgenes | Sí |
| 3 | **Crear Zustand store** — `lib/store.ts` con interfaz `SceneState` (cameraPosition, cameraTarget, gridVisible, fps) y acciones básicas | 1 | Store importable sin errores. `useSceneStore.getState()` devuelve los valores por defecto | Sí |
| 4 | **Componente Lighting** — `components/3d/Lighting.tsx` con `<ambientLight intensity={0.5} />` + `<directionalLight position={[10,10,10]} intensity={1} castShadow shadow-mapSize={1024} />` | 1 | Renderiza sin errores en canvas R3F. Se ven sombras perceptibles en objetos si se añaden | Sí |
| 5 | **Componente GridFloor** — `components/3d/GridFloor.tsx` usando `<grid />` de Drei. Tamaño 20, divisiones 20, color #ccc. Props configurables | 1 | Aparece malla cuadriculada de 20×20m con celdas de 1m. Color gris claro (#ccc) | Sí (junto a 4) |
| 6 | **Componente CameraController** — `components/3d/CameraController.tsx` con OrbitControls. Límites: minDistance=0.5, maxDistance=50, minPolarAngle=0, maxPolarAngle=Math.PI/2.05 | 1 | Órbita con clic izquierdo, zoom con scroll, paneo con clic derecho. No se puede bajar del suelo | Sí (junto a 4,5) |
| 7 | **Componente Scene** — `components/3d/Scene.tsx` que agrupa `<GridFloor />`, `<Lighting />`, `<CameraController />` | 4, 5, 6 | Se renderiza sin errores. Grid + Luces + Cámara funcionan juntos en la misma escena | No |
| 8 | **Componente WebGLFallback** — `components/ui/WebGLFallback.tsx` con ErrorBoundary de R3F. Mensaje: "Tu navegador no soporta WebGL. Actualiza a Chrome, Firefox o Edge." | 1 | Si se desactiva WebGL en DevTools, se muestra el mensaje en lugar del canvas 3D | Sí |
| 9 | **Componente EditorLayout** — `components/editor/EditorLayout.tsx` con CSS Grid 3 columnas: sidebar (0fr por ahora) | canvas (1fr) | properties (0fr por ahora). Canvas monta `<Scene />` dentro de `<Canvas>` | 7, 8 | Canvas visible ocupando el centro. Sidebar y panel derecho son invisibles (0fr) pero el espacio está reservado | No |
| 10 | **Página /editor** — `app/editor/page.tsx` con `'use client'` que monta `<EditorLayout />`. Página principal `app/page.tsx` con landing simple y botón "Ir al editor" | 9 | Navegar a /editor muestra el editor 3D completo. Página principal tiene un enlace funcional | No |

## Tareas de verificación

| # | Tarea | Criterio de aceptación |
|---|-------|------------------------|
| V1 | **Verificar FPS** — Abrir Chrome DevTools > Rendimiento > FPS meter | FPS > 55 estables en escena vacía |
| V2 | **Verificar redimensionado** — Cambiar tamaño de ventana a 1920x1080, 1280x720, 375x667 | Canvas se ajusta sin deformaciones ni scroll |
| V3 | **Verificar límites cámara** — Intentar orbitar bajo el suelo | Cámara no baja de Y=0 |
| V4 | **Verificar consola** — Revisar consola del navegador | Sin errores ni warnings |
| V5 | **Verificar build** — `npm run build` | Build exitoso sin errores |

## Post-implementación

- [ ] Mover feature en `roadmap.md` a **Hecho ✅**
- [ ] Crear rama `feature/001-editor-3d-basico` (si aplica)
- [ ] Merge a main
