# Tareas — 004 · Texturas en Paredes

| # | Tarea | Depende de | Criterio de aceptación |
|---|-------|-----------|------------------------|
| 1 | Descargar texturas CC0 de Poly Haven y copiar a `public/textures/` | — | 4 texturas completas (albedo + normal + roughness) en carpeta textures |
| 2 | Definir catálogo de texturas en `src/data/textures.ts` | 1 | Catálogo con 4 texturas + opción "color sólido", todas con rutas a mapas |
| 3 | Modificar `Wall` en store: añadir campo `textureId: string | null` | — | Store compila con nuevo campo, default null |
| 4 | Actualizar persistencia: guardar/cargar `textureId` | 3 | localStorage guarda y restaura textura asignada |
| 5 | Modificar `Wall.tsx`: aplicar textura PBR con `useTexture` | 2, 3 | Pared con textura visible, tileado según dimensiones, fallback a color si es null |
| 6 | Componente `TextureSelector` con grid de thumbnails | 2 | Muestra grid 2×3 con texturas + "Color sólido", opción activa resaltada |
| 7 | Integrar `TextureSelector` en `WallProperties` | 6 | Selector visible en panel propiedades de pared seleccionada |
| 8 | Build + fix errores | todas | `npx next build` exitoso, 0 errores |
| 9 | Validación (validate.md) + documentación | 8 | Checklist de requisitos cubiertos |
