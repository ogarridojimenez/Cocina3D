# Especificación — 009 Iluminación Avanzada

## Objetivo
Mejorar la calidad visual de la escena 3D con sombras suaves, iluminación ambiental realista (HDR-like) y luces puntuales en electrodomésticos que simulen su funcionamiento real.

## Actores
- Usuario del editor

## Historias de usuario
- Como usuario, quiero que la escena tenga sombras suaves y realistas para que los muebles se sientan integrados al espacio.
- Como usuario, quiero que los electrodomésticos tengan luz interior al abrir su puerta (horno, nevera, microondas, campana).
- Como usuario, quiero que el ambiente de la escena se vea más profesional con iluminación tipo estudio.

## Requisitos funcionales (EARS)

### Sombras
1. CUANDO el usuario coloque un objeto en la escena, EL SISTEMA DEBE proyectar sombras suaves (PCF soft) desde la luz direccional principal sobre el suelo y paredes.
2. CUANDO la escena cargue, EL SISTEMA DEBE usar sombras de mapa con resolución 2048×2048 como mínimo.
3. CUANDO el usuario mueva un objeto, EL SISTEMA DEBE actualizar las sombras automáticamente.

### Iluminación ambiente
4. CUANDO la escena cargue, EL SISTEMA DEBE usar un HemisphereLight con color de cielo (#87CEEB) y color de suelo (#B0A090) para simular luz natural exterior.
5. CUANDO el usuario esté en vista cenital, EL SISTEMA DEBE mantener una iluminación uniforme sin zonas muertas.

### Luces en electrodomésticos
6. CUANDO el usuario abra la puerta de un horno, nevera, microondas o campana, EL SISTEMA DEBE encender una luz puntual (PointLight) en el interior del electrodoméstico.
7. CUANDO el usuario cierre la puerta, EL SISTEMA DEBE apagar la luz gradualmente.
8. CUANDO el objeto esté seleccionado, EL SISTEMA DEBE mostrar un control de intensidad de luz en el panel de propiedades (si el objeto tiene luz integrada).
9. CUANDO el usuario deseleccione el objeto, EL SISTEMA DEBE mantener el estado actual de la luz (encendida/apagada según la puerta).

### Campana extractora
10. CUANDO el usuario active la campana extractora, EL SISTEMA DEBE mostrar un SpotLight hacia abajo simulando iluminación sobre la placa de cocina.

## Requisitos no funcionales
- Las sombras deben usar PCFSoftShadowMap para bordes suaves sin artefactos duros.
- El tamaño del shadow map debe ser configurable (2048 por defecto, 4096 para calidad alta).
- Las luces de electrodomésticos deben tener intensidad máxima 1.0 y atenuación suave.
- No debe haber penalización de rendimiento apreciable (objetivo: 60 FPS con <4 luces puntuales activas).

## Objetos con luz integrada
- Horno: luz interior blanca/cálida (encendida con puerta abierta)
- Nevera: luz interior fría/blanca (encendida con puerta abierta)
- Microondas: luz interior (encendida con puerta abierta)
- Campana extractora: SpotLight hacia abajo (toggle independiente, no vinculado a puerta)
- Lavavajillas: luz de estado tenue (rojo/verde en panel frontal)

## Non-goals
- No se implementan luces de lámparas o iluminación decorativa (flexo, lámpara de techo).
- No se implementa horario solar (día/noche automático).
- No se implementan reflejos ni environment maps.
- No se implementan sombras en tiempo real para objetos en movimiento continuo.

## Criterios de aceptación
- Al colocar un armario sobre el suelo, su sombra se proyecta correctamente con bordes suaves.
- Al abrir la puerta del horno, se ilumina el interior con luz cálida.
- Al cerrar la puerta del horno, la luz se apaga gradualmente.
- La campana extractora tiene un botón "Luz" que activa un SpotLight hacia abajo.
- Al refrescar la página, las luces de los electrodomésticos mantienen su estado (apagadas por defecto).
- La escena se ve notablemente más realista que sin sombras suaves.
