# 015 · Catálogo Ampliado — Plan

## Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/data/catalog.ts` | Añadir 15 objetos, reorganizar categorías, añadir `Iluminación` |
| `src/data/catalog.ts` | Mover objetos entre categorías |
| `src/data/geometries.ts` | Añadir geometrías procedurales para los 15 objetos nuevos |
| `src/data/materials.ts` | (opcional) Ajustar si algún objeto necesita material específico |

## Geometrías nuevas (resumen)

| Objeto | Geometría |
|--------|-----------|
| Vitrina acristalada | `BoxGeometry` con puerta de cristal (otro box más pequeño frontal) |
| Columna despensa | `BoxGeometry` alta y estrecha con puerta |
| Taburete | 4 patas cilíndricas + asiento circular |
| Planta decorativa | Maceta (`CylinderGeometry`) + tronco (`CylinderGeometry`) + copa esférica |
| Cuadro pared | `PlaneGeometry` fino con marco |
| Lámpara colgante | Cilindro cono invertido + cable (Line) |
| Placa inducción | `BoxGeometry` fino con 4 círculos marcados |
| Robot cocina | `BoxGeometry` base + `SphereGeometry` vaso |
| Lavadora | `BoxGeometry` con puerta circular frontal |
| Congelador | `BoxGeometry` alto, puerta tipo arcón o vertical |
| Campana integrada | `BoxGeometry` fina + tubo extracción |
| Estante abierto | `BoxGeometry` horizontal, sin puerta |
| Cajón calientaplatos | `BoxGeometry` delgado con drawer |
| Mesa comedor | `BoxGeometry` superficie + 4 patas |
| Lámpara techo | `PlaneGeometry` circular + soporte |

## Riesgos

- Que los objetos nuevos compartan color con los existentes — se mitiga usando colores por defecto distintos
- Que la geometría de la vitrina y columna despensa sea muy similar a cabinets — se mitiga añadiendo detalles (cristal, altura extra)