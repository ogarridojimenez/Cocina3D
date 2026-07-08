"use client";

export function Lighting() {
  return (
    <>
      {/* Ambient light suave */}
      <ambientLight intensity={0.5} />

      {/* Direccional principal con sombras */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />

      {/* Luz de relleno desde atrás */}
      <directionalLight position={[-5, 5, -10]} intensity={0.3} />
    </>
  );
}
