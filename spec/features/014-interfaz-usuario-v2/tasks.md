# 014 · Interfaz Usuario V2 — Tareas

| # | Tarea | Depende de | Criterio de aceptación |
|---|-------|-----------|------------------------|
| 1 | `StatusBar.tsx` — mostrar nombre objeto, coordenadas X/Z, zoom | — | Barra visible en footer con datos del store |
| 2 | `TabPanel.tsx` — wrapper genérico de tabs | — | Tabs funcionales con contenido dinámico |
| 3 | `CatalogPanel.tsx` — refactor a grid visual con thumbnails por objeto | — | Grid de 4 columnas con canvas de 64x64, categorías expandibles |
| 4 | `ObjectOutliner.tsx` — árbol jerárquico con iconos visibilidad/bloqueo | — | Paredes listadas, objetos listados, toggle visibilidad oculta/muestra en escena |
| 5 | `ObjectProperties.tsx` — dividir en tabs (Dimensiones/Acabados/Iluminación) usando TabPanel | 2 | Cada tab muestra solo sus campos; sin pérdida de funcionalidad |
| 6 | `EditorLayout.tsx` — reorganizar layout grid, integrar todos los paneles | 1,3,4,5 | Layout coincide con mockup del spec |
| 7 | Toolbar — iconos mejorados + tooltips con atajos | — | Cada botón tiene SVG + tooltip con shortcut |
| 8 | Build + verificar persistencia y undo/redo | 6,7 | `npx next build` pasa, datos en localStorage correctos |
| 9 | Commit + push + roadmap | 8 | `git commit -m "feat: UI V2"`, roadmap actualizado |