# 006 · Colisiones entre objetos

## Qué hace
Los objetos no podrán superponerse entre sí ni con paredes. Al mover un objeto, si colisiona se mostrará feedback visual (tinte rojo).

## Requisitos funcionales (EARS)

- CUANDO el usuario mueve un objeto con el gizmo, EL SISTEMA DEBE detectar colisiones contra otros objetos y paredes
- CUANDO hay colisión, EL SISTEMA DEBE mostrar el objeto con tinte rojo
- CUANDO el usuario suelta un objeto en posición de colisión, EL SISTEMA DEBE permitirlo pero mantener el indicador visual
- CUANDO el usuario añade un objeto nuevo, EL SISTEMA DEBE colocarlo en Y=0 (suelo)
- MIENTRAS no hay colisión, EL SISTEMA DEBE mostrar el objeto con color normal

## Criterios de aceptación
- [ ] Al mover un objeto cerca de otro, se pone rojo si se superponen
- [ ] Objetos nuevos aparecen apoyados en el suelo
