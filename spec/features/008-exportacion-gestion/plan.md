# Plan Técnico — 008 Exportación y Gestión de Escenas

## Arquitectura
La funcionalidad se distribuye en dos capas: un módulo utilitario (`export.ts`) y un componente React interno del Canvas (`ExportManager.tsx`).

```
EditorLayout.tsx (UI - botones en header)
  └── dispatch CustomEvent("cocina3d-export", { type })
        └── ExportManager.tsx (dentro del Canvas, usa useThree)
              ├── gltf: exportGLTF(scene)
              ├── screenshot: render(scene,camera) → toDataURL
              ├── save: saveSceneFile(walls, objects)
              ├── load: loadSceneFile() → loadFullState(data)
              └── new: confirm → clearScene()
                    └── store.ts: clearScene() + localStorage.removeItem()
```

## Componentes

### `export.ts` (utilidad, fuera del Canvas)
- `exportGLTF(scene, filename)` — GLTFExporter → Blob → download
- `screenshotCanvas(canvas)` — (deprecado, ahora se usa desde ExportManager)
- `saveSceneFile(walls, objects)` — JSON.stringify → Blob → download
- `loadSceneFile()` — File input → FileReader → JSON.parse → resolve(data)

### `ExportManager.tsx` (dentro del Canvas)
- Usa `useThree()` para acceder a scene, gl, camera
- Escucha CustomEvent en window
- Para captura: llama `gl.render(scene, camera)` antes de `toDataURL`
- Para GLTF: pasa la escena de R3F directamente

### `EditorLayout.tsx` (UI)
- Botones en header: Nuevo | Guardar | Abrir | Export GLTF 📥 | Captura 📷

## Flujo de datos
```
[Botón] → dispatchEvent CustomEvent → ExportManager recibe
    ↓
ExportManager ejecuta acción
    ↓
Para Guardar: lee walls/objects del store → saveSceneFile()
Para Abrir:  loadSceneFile() → promesa → loadFullState()
Para Nuevo:  clearScene() [store] + localStorage.removeItem()
Para GLTF:   exportGLTF(scene)
Para Captura: gl.render(scene,camera) → toDataURL() → download
```

## Decisiones y alternativas descartadas
| Decisión | Alternativa | Razón |
|----------|------------|-------|
| CustomEvent para comunicación UI→Canvas | Ref forwarding, Context | CustomEvent no requiere conectar árboles de componentes |
| ExportManager dentro del Canvas | Fuera del Canvas con useThree() | `useThree` solo funciona dentro de `<Canvas>` |
| `preserveDrawingBuffer: true` | Captura post-render | Doble seguridad: preserve buffer + render forzado |
| JSON para guardar/abrir | localStorage | Archivos portátiles, compartibles, respaldables |

## Riesgos y mitigaciones
| Riesgo | Mitigación |
|--------|-----------|
| GLTFExporter no exporta texturas | Usar `{trs: true, onlyVisible: true}`. Exportar assets embedded |
| Captura negra si preserveDrawingBuffer falla | Forzar render + gl.finish() antes de toDataURL |
| JSON corrupto al cargar | try/catch con alert() de error |
