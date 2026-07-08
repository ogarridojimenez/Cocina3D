# Tech Stack — Cocina3D

> Stack tecnológico y convenciones del proyecto.

## Tecnologías

| Capa | Tecnología | Versión | Razón |
|------|-----------|---------|-------|
| **Motor 3D** | Three.js (vía React Three Fiber) | R3F 9.x / Three.js r170+ | Motor 3D web estándar, ecosistema maduro, GLTF nativo |
| **Frontend** | React + Next.js | React 19 / Next.js 15+ | SSR, App Router, ecosistema React |
| **Lenguaje** | TypeScript estricto | TS 5.x | Tipado seguro, mejor developer experience |
| **Física** | Cannon-es + Rapier (WASM) | Última | Física ligera para web + colisiones precisas |
| **Animación** | Three.js Animation System + custom Timeline | — | Animación de objetos con timeline visual |
| **Formato 3D** | GLTF/GLB (primario), OBJ (import) | — | Estándar web, streaming eficiente |
| **Estilo** | Tailwind CSS 4 + shadcn/ui | Última | UI rápida, consistente, accesible |
| **Backend** | Node.js + tRPC o REST API | Node 22+ | Tipado compartido con frontend |
| **BD** | PostgreSQL + Prisma ORM | PG 16+ | Relacional, robusto, migrations |
| **Almacenamiento** | S3 / MinIO (local) | — | Modelos 3D, texturas, renders |
| **Auth** | NextAuth.js / Auth.js | Última | Autenticación flexible |
| **Cloud** | AWS (o similar) | — | Renders bajo demanda con GPU spot |

## Comandos

```bash
# Desarrollo
npm run dev           # Next.js dev server
npm run dev:r3f       # Solo componente 3D en modo desarrollo

# Calidad
npm run lint          # ESLint + Prettier
npm run type-check    # TypeScript strict
npm run test          # Vitest + Testing Library
npm run test:e2e      # Playwright (si aplica)

# Build
npm run build         # Next.js build
npm run build:3d      # Optimización de assets 3D
```

## Convenciones

- **Naming:** camelCase para variables/funciones, PascalCase para componentes React, kebab-case para archivos
- **Componentes 3D:** Cada objeto 3D es un componente React. Carpeta `components/3d/`
- **Escenas:** Las escenas se definen en `scenes/` (ej: `scenes/kitchen-editor.tsx`)
- **Estado 3D:** Zustand para estado global de la escena (objetos, posiciones, materiales)
- **Tests:** Unitarios con Vitest. Componentes 3D con Storybook + tests visuales
- **Idioma:** Código y nombres de variables en inglés. UI en español (target = empresa hispanohablante inicial)
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)

## Límites duros

- ❌ **No jQuery, no JavaScript vanilla** — Todo en TypeScript
- ❌ **No librerías 3D alternativas** — Solo React Three Fiber + Three.js. Nada de Babylon.js, PlayCanvas, etc.
- ❌ **No depender de servicios cloud externos para la demo/PoC** — Debe funcionar offline/local primero
- ❌ **No almacenar modelos 3D en Git** — Usar blob storage (S3/MinIO)
- ❌ **No usar librerías UI pesadas** — Tailwind + shadcn/ui es suficiente

## Estilo visual

- **UI:** Clean, minimalista, modo claro/oscuro. Inspiración: Linear.app
- **Editor 3D:** Full-screen, overlays translúcidos, controles en esquinas
- **Paleta:** Neutros + un color de acento (#3B82F6 azul)
