export interface TextureDef {
  id: string;
  name: string;
  category: string;
  maps: {
    albedo: string;
    normal?: string;
    roughness?: string;
  };
  /** Escala en metros por repetición */
  scale: number;
}

export const textureCatalog: (TextureDef & { id: "none" })[] = [
  {
    id: "none",
    name: "Color sólido",
    category: "none",
    maps: { albedo: "" },
    scale: 1,
  },
];

export const wallTextures: TextureDef[] = [
  {
    id: "plaster",
    name: "Yeso liso",
    category: "pared",
    maps: {
      albedo: "/textures/plaster/albedo.jpg",
      normal: "/textures/plaster/normal.jpg",
      roughness: "/textures/plaster/roughness.jpg",
    },
    scale: 0.5,
  },
  {
    id: "brick",
    name: "Ladrillo visto",
    category: "pared",
    maps: {
      albedo: "/textures/brick/albedo.jpg",
      normal: "/textures/brick/normal.jpg",
      roughness: "/textures/brick/roughness.jpg",
    },
    scale: 0.4,
  },
  {
    id: "tile",
    name: "Azulejo piedra",
    category: "pared",
    maps: {
      albedo: "/textures/tile/albedo.jpg",
      normal: "/textures/tile/normal.jpg",
      roughness: "/textures/tile/roughness.jpg",
    },
    scale: 0.3,
  },
  {
    id: "wood",
    name: "Madera cocina",
    category: "pared",
    maps: {
      albedo: "/textures/wood/albedo.jpg",
      normal: "/textures/wood/normal.jpg",
      roughness: "/textures/wood/roughness.jpg",
    },
    scale: 0.4,
  },
];

export function getTextureDef(id: string | null): TextureDef | null {
  if (!id || id === "none") return null;
  return wallTextures.find((t) => t.id === id) ?? null;
}
