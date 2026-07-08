# Especificación — 008 Exportación y Gestión de Escenas

## Objetivo
Permitir al usuario exportar el diseño 3D a formatos estándar (GLTF, PNG), guardar/cargar proyectos completos como archivos, y crear nuevas escenas desde cero.

## Actores
- Usuario del editor

## Historias de usuario
- Como usuario, quiero exportar mi diseño como modelo 3D (GLTF) para usarlo en otras aplicaciones.
- Como usuario, quiero capturar una imagen del diseño para compartirla rápidamente.
- Como usuario, quiero guardar mi proyecto como archivo para compartirlo o respaldarlo.
- Como usuario, quiero abrir un proyecto guardado anteriormente.
- Como usuario, quiero empezar un nuevo proyecto desde cero sin cerrar la página.

## Requisitos funcionales (EARS)
1. CUANDO el usuario haga clic en "Exportar GLTF", EL SISTEMA DEBE descargar la escena completa como archivo `.glb` binario.
2. CUANDO el usuario haga clic en "Captura de pantalla", EL SISTEMA DEBE renderizar forzadamente la escena y descargar una imagen `.png`.
3. CUANDO el usuario haga clic en "Guardar", EL SISTEMA DEBE descargar un archivo `.json` con el estado completo (paredes + objetos + texturas + animaciones).
4. CUANDO el usuario haga clic en "Abrir", EL SISTEMA DEBE abrir un selector de archivos para cargar un `.json` guardado y restaurar la escena.
5. CUANDO el usuario haga clic en "Nuevo", EL SISTEMA DEBE preguntar confirmación si hay datos en la escena actual y luego limpiar todo (memoria + localStorage).
6. CUANDO se cargue un archivo `.json` inválido, EL SISTEMA DEBE mostrar un mensaje de error.
7. CUANDO no haya datos en la escena y se haga clic en "Nuevo", EL SISTEMA DEBE limpiar directamente sin preguntar.

## Requisitos no funcionales
- La captura de pantalla debe forzar `gl.render(scene, camera)` antes de capturar para evitar imágenes negras.
- El archivo GLTF debe incluir geometrías, materiales y transformaciones de toda la escena.
- El archivo JSON debe ser legible por humanos (pretty-print).
- El diálogo de confirmación debe ser `confirm()` nativo del navegador.

## Non-goals
- No se implementa exportación a formatos OBJ, STL o FBX.
- No se implementa importación de GLTF/GLB externos.
- No se implementa guardado automático en la nube.
- No se implementa previsualización de thumbnails en el diálogo de abrir.

## Criterios de aceptación
- Exportar GLTF: descarga un archivo .glb que se puede abrir en cualquier visor 3D.
- Captura: descarga un .png con la escena visible (no negro).
- Guardar: descarga .json que contiene `{ walls: [...], objects: [...] }`.
- Abrir: seleccionar .json → la escena se restaura exactamente igual.
- Nuevo: si hay datos → confirmación "¿Estás seguro?" → si acepta → escena limpia. Si no hay datos → limpia directo.
- Al hacer Nuevo y refrescar la página, no deben aparecer datos viejos.
