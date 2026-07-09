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

export const wallTextures: TextureDef[] = [
  {
    id: "long-white-tiles",
    name: "Azulejo blanco alargado",
    category: "pared",
    maps: {
      albedo: "/textures/wall/long_white_tiles/albedo.jpg",
      normal: "/textures/wall/long_white_tiles/normal.jpg",
      roughness: "/textures/wall/long_white_tiles/roughness.jpg",
    },
    scale: 0.3,
  },
  {
    id: "square-tiled-wall",
    name: "Azulejo cuadrado",
    category: "pared",
    maps: {
      albedo: "/textures/wall/square_tiled_wall/albedo.jpg",
      normal: "/textures/wall/square_tiled_wall/normal.jpg",
      roughness: "/textures/wall/square_tiled_wall/roughness.jpg",
    },
    scale: 0.3,
  },
  {
    id: "rounded-square-tiled-wall",
    name: "Azulejo esquinas redondas",
    category: "pared",
    maps: {
      albedo: "/textures/wall/rounded_square_tiled_wall/albedo.jpg",
      normal: "/textures/wall/rounded_square_tiled_wall/normal.jpg",
      roughness: "/textures/wall/rounded_square_tiled_wall/roughness.jpg",
    },
    scale: 0.3,
  },
  {
    id: "anti-skid-tiles",
    name: "Cerámica texturada",
    category: "pared",
    maps: {
      albedo: "/textures/wall/anti_skid_tiles/albedo.jpg",
      normal: "/textures/wall/anti_skid_tiles/normal.jpg",
      roughness: "/textures/wall/anti_skid_tiles/roughness.jpg",
    },
    scale: 0.3,
  },
  {
    id: "interior-tiles",
    name: "Baldosa interior",
    category: "pared",
    maps: {
      albedo: "/textures/wall/interior_tiles/albedo.jpg",
      normal: "/textures/wall/interior_tiles/normal.jpg",
      roughness: "/textures/wall/interior_tiles/roughness.jpg",
    },
    scale: 0.3,
  },
  {
    id: "beige-wall",
    name: "Pared beige lisa",
    category: "pared",
    maps: {
      albedo: "/textures/wall/beige_wall_001/albedo.jpg",
      normal: "/textures/wall/beige_wall_001/normal.jpg",
      roughness: "/textures/wall/beige_wall_001/roughness.jpg",
    },
    scale: 0.4,
  },
  {
    id: "clay-plaster",
    name: "Estuco arcilla",
    category: "pared",
    maps: {
      albedo: "/textures/wall/clay_plaster/albedo.jpg",
      normal: "/textures/wall/clay_plaster/normal.jpg",
      roughness: "/textures/wall/clay_plaster/roughness.jpg",
    },
    scale: 0.4,
  },
  {
    id: "marble-mosaic",
    name: "Mosaico mármol",
    category: "pared",
    maps: {
      albedo: "/textures/wall/marble_mosaic_tiles/albedo.jpg",
      normal: "/textures/wall/marble_mosaic_tiles/normal.jpg",
      roughness: "/textures/wall/marble_mosaic_tiles/roughness.jpg",
    },
    scale: 0.3,
  },
];

// Legacy texture catalog (for compatibility, same textures)
export const textureCatalog = [{ id: "none", name: "Color sólido", category: "none", maps: { albedo: "" }, scale: 1 }];

export function getTextureDef(id: string | null): TextureDef | null {
  if (!id || id === "none") return null;
  return wallTextures.find((t) => t.id === id) ?? null;
}
