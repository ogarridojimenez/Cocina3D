# Especificación — 011 Catálogo Meseta + TV

## Objetivo
Añadir 3 nuevos objetos al catálogo: **Meseta** (mueble bajo modular con encimera, extensible en L, fregadero opcional) y **TV Pared** (plano negro montado).

## Actores
- Diseñador de cocinas (usuario)

## Requisitos funcionales (EARS)

CUANDO el usuario selecciona "Meseta" del catálogo, EL SISTEMA DEBE crear un mueble bajo de 1.4m×0.85m×0.6m con encimera, puertas abatibles y armazón.

CUANDO el usuario modifica "Ancho L" en propiedades de una Meseta con valor > 0, EL SISTEMA DEBE extender la encimera y armarios perpendicularmente hacia adelante (+Z) formando una L.

CUANDO el usuario activa "Fregadero integrado" en propiedades de una Meseta, EL SISTEMA DEBE mostrar un fregadero metálico con pileta y grifo sobre la encimera en la posición central.

CUANDO el usuario selecciona "TV Pared" del catálogo, EL SISTEMA DEBE crear un panel negro de 1.2m×0.7m montado en la pared a 1.5m de altura, con bisel y pantalla emisiva.

CUANDO el usuario cambia dimensiones (ancho, alto, fondo) de una Meseta, EL SISTEMA DEBE reemplazar todos los módulos (armarios, puertas, encimera, extensión L) a las nuevas dimensiones.

CUANDO el usuario cambia material de una Meseta o TV, EL SISTEMA DEBE aplicar el material PBR seleccionado a todos sus subcomponentes.

CUANDO el usuario guarda (persist) y recarga la página, EL SISTEMA DEBE restaurar la forma L y el estado del fregadero exactamente como estaban.

CUANDO el usuario coloca múltiples Mesetas, EL SISTEMA DEBE crear objetos independientes cada uno con su propia configuración L y fregadero.

## Non-goals
- No se implementa conexión automática entre mesetas adyacentes (unión L o T)
- No se implementan electrodomésticos empotrables en la meseta (solo fregadero)
- TV no reproduce contenido ni tiene volumen