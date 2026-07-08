# Especificación — 007 Animaciones

## Objetivo
Implementar animaciones suaves y realistas en puertas y cajones de muebles y electrodomésticos, mejorando la experiencia visual del editor.

## Actores
- Usuario del editor

## Historias de usuario
- Como usuario, quiero abrir/cerrar puertas de armarios y electrodomésticos para visualizar el espacio interior.
- Como usuario, quiero que las animaciones sean suaves y naturales.
- Como usuario, quiero controlar la velocidad de animación desde el panel de propiedades.

## Requisitos funcionales (EARS)
1. CUANDO el usuario haga clic derecho en un objeto animable, EL SISTEMA DEBE alternar su estado animado.
2. CUANDO el usuario active la animación desde el panel de propiedades, EL SISTEMA DEBE iniciar/detener la animación.
3. CUANDO un objeto esté en estado "animado", EL SISTEMA DEBE interpolar su geometría (puerta/cajón) desde cerrado hasta abierto usando interpolación spring.
4. CUANDO un objeto se deseleccione o se cambie a otro, EL SISTEMA DEBE mantener el estado actual de la animación.
5. CUANDO el usuario cargue una escena guardada, EL SISTEMA DEBE restaurar el estado animado de cada objeto.
6. CUANDO el frame rate sea variable, EL SISTEMA DEBE usar delta-time para que la animación sea independiente de los FPS.

## Requisitos no funcionales
- La interpolación debe usar SmoothStep (cúbica) para aceleración/desaceleración natural.
- La velocidad base debe completar la transición en ~300ms.
- El usuario debe poder ajustar la velocidad (x0.5 a x3).

## Objetos animables
- Armario base (2 puertas)
- Armario alto (2 puertas)
- Cajones (3 gavetas)
- Horno (1 puerta abatible)
- Microondas (1 puerta)
- Lavavajillas (1 puerta batiente)
- Campana extractora

## Non-goals
- No se implementan animaciones de apertura/cierre automáticas con temporizador.
- No se implementan sonidos de apertura/cierre.
- No se implementan animaciones de electrodomésticos encendidos (luces, ventilador).

## Criterios de aceptación
- Al hacer clic derecho en un armario, la puerta se abre suavemente en ~300ms.
- Al deseleccionar y volver a seleccionar, la puerta mantiene su estado.
- Al refrescar la página, los objetos animados mantienen su estado (persistencia en localStorage).
- La velocidad configurable afecta la duración de la animación.
