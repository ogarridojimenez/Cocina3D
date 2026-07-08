# Misión — Cocina3D

> Diseñador 3D de cocinas profesional, web y en tiempo real, para empresas que crean cocinas a medida.

## Qué construimos

Un editor 3D web donde empresas de diseño de cocinas pueden crear espacios desde cero — dibujando paredes con medidas reales, arrastrando y colocando muebles y electrodomésticos, y visualizando el resultado en 3D con React Three Fiber. El diseño es paramétrico: cada objeto se adapta a las dimensiones exactas de la estancia del cliente.

## Para quién

- **Usuario principal:** Empresa dedicada al diseño e instalación de cocinas a medida. Sus diseñadores toman las dimensiones reales de una estancia y crean el modelo 3D para presentarlo al cliente.
- **Usuario secundario:** El cliente final de la empresa, que puede ver el diseño en 3D, recorrer la cocina virtualmente y aprobar cambios antes de la fabricación.
- **Stakeholders:** Empresa propietaria de la plataforma, diseñadores de cocinas, fabricantes de muebles/electrodomésticos (catálogos).

## Principios

- **Paramétrico ante todo** — Cada objeto debe poder ajustarse a las dimensiones reales del espacio del cliente. No hay objetos de tamaño fijo.
- **La física importa** — Los objetos deben comportarse de forma realista: apoyarse en superficies, colisionar entre sí, abrirse/cerrarse.
- **Profesional, no genérico** — No competimos con Planner 5D o HomeByMe para el público general. Somos una herramienta B2B para profesionales de cocinas.
- **Web nativo** — 100% en el navegador, sin descargas. React Three Fiber como motor 3D.
- **La especificación primero** — Antes de escribir código, se escribe y aprueba la spec (SDD).

## Qué NO es

- No es una plataforma de diseño de interiores genérica (casas enteras, jardines, etc.)
- No es un marketplace de muebles para consumidores
- No es una herramienta de modelado 3D libre tipo SketchUp
- No reemplaza el software CAD profesional para fabricación (no generamos planos de taller)
