# Plan Técnico — 009 Iluminación Avanzada

## Arquitectura

```
Lighting.tsx (mejorado)
├── <ambientLight> → reemplazado por <hemisphereLight> (cielo/suelo)
├── <directionalLight> con shadow-mapSize=2048, PCFSoftShadowMap
│   └── <camera> orthográfica ajustada a bounding box de escena
└── <directionalLight> relleno trasero (existente)

FurnitureObject.tsx (ampliado)
├── Por cada electrodoméstico con luz:
│   ├── <pointLight> interior (intensity 0, visible=false por defecto)
│   └── Animación: cuando animated=true → pointLight enciende gradualmente
├── Campana extractora:
│   └── <spotLight> hacia abajo (toggle independiente)
└── Lavavajillas:
    └── <pointLight> rojo/verde (estado, intensidad baja 0.2)

store.ts (ampliado)
├── Objetos: nuevo campo `lightOn: boolean` (opcional, false default)
│   └── Usado para campana extractora y luces no vinculadas a puerta
├── Config global de sombras:
│   └── shadowQuality: 2048 | 4096 (dentro de store)
└── toggleLight(id: string): void

ObjectProperties.tsx (ampliado)
├── Si objeto tiene luz integrada → slider "Intensidad luz" (0–1.5)
├── Si objeto tipo campana → botón "Luz" toggle
├── Sección "Iluminación" colapsable cuando objeto seleccionado
└── Selector calidad sombras (global)
```

## Modelo de datos

```typescript
// Ampliación en FurnitureObject
interface FurnitureObject {
  // ...campos existentes
  lightOn?: boolean;     // true si la luz del objeto está encendida
}

// Nueva configuración global
interface SceneSettings {
  shadowQuality: 2048 | 4096;  // resolución del shadow map
}
```

## Configuración de luces por objeto

| Objeto | Tipo luz | Posición relativa | Intensidad | Color | Activación |
|--------|----------|-------------------|:----------:|-------|:----------:|
| Horno | PointLight | centro-interior, y=0.3 | 0.8 | #FFE0B0 (cálido) | animated=true |
| Nevera | PointLight | centro-interior, y=0.9 | 0.6 | #E8F4FF (frío) | animated=true |
| Microondas | PointLight | centro-interior, y=0.15 | 0.5 | #FFEEDD (cálido) | animated=true |
| Campana | SpotLight | abajo, angle=0.6, distance=2 | 1.0 | #FFFFFF (neutro) | lightOn toggle |
| Lavavajillas | PointLight | panel frontal, y=0.05 | 0.15 | #00FF00 (verde) | lightOn (cuando no animado) |

## Renderer settings
```typescript
// En Canvas o Lighting
gl.shadowMap.enabled = true;
gl.shadowMap.type = THREE.PCFSoftShadowMap;
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(2048, 2048);
```

## Decisiones y alternativas descartadas
| Decisión | Alternativa | Razón |
|----------|------------|-------|
| PointLight en cada objeto | Luz global única | Más realista y vinculado a la animación del objeto |
| HemisphereLight reemplaza ambientLight | AmbientLight + directional fill | Simula mejor luz natural (cielo azul + suelo cálido) |
| lightOn independiente de animated para campana | Mismo toggle que puerta | La campana no tiene puerta, necesita control separado |
| Sombras PCFSoft | VSM (Variance Shadow Maps) | PCFSoft es más compatible y sin artefactos de bleeding |

## Riesgos y mitigaciones
| Riesgo | Mitigación |
|--------|-----------|
| Performance con muchas PointLights | Máximo 4-5 luces activas simultáneas. Luz apagada = intensity 0, no se elimina |
| Sombras con artefacts (shadow acne) | Ajustar shadow-bias por tipo de geometría |
| PointLight dentro de geometría no visible | Ajustar distance/near clip para que la luz atraviese la puerta abierta |
| Flickering en animación de luz | Interpolar intensity con mismo SmoothStep que la puerta |
