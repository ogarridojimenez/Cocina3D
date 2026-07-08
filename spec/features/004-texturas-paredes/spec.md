# Especificación — 004 · Texturas en Paredes

## Objetivo

Añadir texturas PBR a las paredes — el usuario podrá elegir entre materiales como yeso, ladrillo, azulejo y madera desde el panel de propiedades.

## Actores

- **Diseñador** — Usuario que personaliza el acabado de las paredes

## Historias de usuario

- Como diseñador, quiero elegir texturas para las paredes desde un selector visual para dar realismo al diseño
- Como diseñador, quiero que la textura se adapte automáticamente al tamaño de la pared (tileable)
- Como diseñador, quiero poder volver a un color sólido si no quiero textura

## Requisitos funcionales (EARS)

### Catálogo de texturas

- CUANDO el editor carga, EL SISTEMA DEBE cargar las texturas PBR disponibles desde `public/textures/`
- CUANDO el usuario selecciona una pared, EL SISTEMA DEBE mostrar un selector de texturas en el panel de propiedades

### Aplicación de texturas

- CUANDO el usuario selecciona una textura del catálogo, EL SISTEMA DEBE aplicarla a la pared seleccionada
- CUANDO una pared tiene textura, EL SISTEMA DEBE escalar las UVs para que el patrón se repita (tile) según las dimensiones de la pared
- CUANDO el usuario cambia el tamaño de una pared texturizada, EL SISTEMA DEBE re-escalar las UVs automáticamente
- CUANDO el usuario selecciona la opción "color sólido", EL SISTEMA DEBE quitar la textura y mostrar el color base

### Texturas disponibles (v1)

- CUANDO el usuario abre el selector, EL SISTEMA DEBE ofrecer al menos 4 opciones: Yeso liso, Ladrillo visto, Azulejo blanco, Madera clara + "Color sólido"
- CUANDO el usuario previsualiza una textura, EL SISTEMA DEBE mostrar una miniatura de la textura en el selector

### Persistencia

- CUANDO el usuario asigna una textura a una pared, EL SISTEMA DEBE guardar la selección en localStorage
- CUANDO el usuario recarga el editor, EL SISTEMA DEBE restaurar las texturas asignadas

## Requisitos no funcionales

- Las texturas deben ser CC0 (sin restricciones de uso)
- Resolución máxima: 1K (1024×1024) para mantener rendimiento en web
- Formato: JPG para albedo, PNG para normal/roughness (o WebP si disponible)
- Las texturas deben cargarse con `useTexture` de Drei (caché automática)

## Non-goals

- ❌ No se texturizan objetos del catálogo (solo paredes)
- ❌ No hay carga de texturas personalizadas por el usuario
- ❌ No hay edición de UVs por parte del usuario (escalado automático)
- ❌ No hay materiales procedurales generados en código

## Criterios de aceptación

1. Selector de texturas visible en panel de propiedades de pared
2. 4 texturas visibles + opción "Color sólido"
3. Al seleccionar textura, la pared se actualiza al instante
4. La textura se tilea correctamente al cambiar tamaño de pared
5. Persiste tras recargar página
6. Rendimiento aceptable con 20 paredes texturizadas
