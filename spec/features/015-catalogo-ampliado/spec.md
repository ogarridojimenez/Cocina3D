# 015 · Catálogo Ampliado

**Estado:** propuesta

## Objetivo

Añadir 15 objetos nuevos a la cocina y reorganizar categorías para que el catálogo se parezca a una app profesional.

## Cambios en catálogo (catalog.ts)

### Categorías reorganizadas

| Categoría actual | Nueva categoría |
|-----------------|----------------|
| Muebles | Muebles |
| Electrodomésticos | Electrodomésticos |
| Encimera | (se fusiona parte en Electrodomésticos y parte en Encimera) |
| Campana | (se integra en Electrodomésticos) |
| Accesorios | Accesorios |
| Mesetas | Mesetas |
| Pared | Pared |
| Suelo | Suelo |
| — | **Iluminación** (nueva) |

### Objetos nuevos (15)

| # | id | Nombre | Categoría | Tipo montaje | Animación |
|---|-----|--------|-----------|-------------|-----------|
| 1 | `vitrina` | Vitrina acristalada | Muebles | floor | door |
| 2 | `columna-despensa` | Columna despensa | Muebles | floor | door |
| 3 | `taburete` | Taburete bar | Accesorios | floor | none |
| 4 | `planta` | Planta decorativa | Accesorios | floor | none |
| 5 | `cuadro` | Cuadro pared | Pared | wall | none |
| 6 | `lampara-colgante` | Lámpara colgante | Iluminación | floor | none |
| 7 | `placa` | Placa inducción | Electrodomésticos | counter | none |
| 8 | `robot-cocina` | Robot cocina | Electrodomésticos | counter | none |
| 9 | `lavadora` | Lavadora | Electrodomésticos | floor | door |
| 10 | `congelador` | Congelador | Electrodomésticos | floor | door |
| 11 | `campana-integrada` | Campana integrada | Electrodomésticos | wall | none |
| 12 | `estante-abierto` | Estante abierto | Muebles | wall | none |
| 13 | `cajon-caliente` | Cajón calientaplatos | Electrodomésticos | wall | drawer |
| 14 | `mesa-comedor` | Mesa comedor | Accesorios | floor | none |
| 15 | `laminas-techo` | Lámpara techo | Iluminación | floor | none |

### Objetos que se mueven de categoría

- `coffee-machine` de Encimera → Electrodomésticos
- `toaster` de Encimera → Electrodomésticos
- `range-hood` de Campana → Electrodomésticos
- `dish-rack` de Accesorios → Electrodomésticos

### Categoría Iluminación (nueva)

Incluye: `lampara-colgante`, `lampara-techo`.

## Requisitos (EARS)

- CUANDO el usuario abra el catálogo, EL SISTEMA DEBE mostrar los objetos agrupados por las nuevas categorías
- CUANDO el usuario añada un objeto nuevo, EL SISTEMA DEBE renderizarlo con su geometría procedural en `geometries.ts`
- CUANDO el objeto tenga animación, EL SISTEMA DEBE reproducirla al hacer clic en "abrir/cerrar"
- CUANDO el objeto sea de pared, EL SISTEMA DEBE montarlo a la altura indicada en `mountHeight`

## No incluido

- Modelos 3D reales (seguimos con geometría procedural)
- Colisiones entre objetos nuevos
- Sombras personalizadas por objeto

## Criterios de aceptación

- Catálogo muestra 34 objetos (19 actuales + 15 nuevos) en 9 categorías
- Todos los objetos se renderizan correctamente en la escena 3D
- Animaciones funcionan (puertas, cajones)
- Build pasa
- Persistencia en localStorage preserva objetos añadidos