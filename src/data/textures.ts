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
  // ── Azulejos (cocina) ──
  {
    id: "long-white-tiles",
    name: "Azulejo blanco alargado",
    category: "cocina",
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
    category: "cocina",
    maps: {
      albedo: "/textures/wall/square_tiled_wall/albedo.jpg",
      normal: "/textures/wall/square_tiled_wall/normal.jpg",
      roughness: "/textures/wall/square_tiled_wall/roughness.jpg",
    },
    scale: 0.3,
  },
  // ── Revestimientos lisos ──
  {
    id: "painted-concrete-02",
    name: "Hormigón pintado claro",
    category: "liso",
    maps: {
      albedo: "/textures/wall/painted_concrete_02/albedo.jpg",
      normal: "/textures/wall/painted_concrete_02/normal.jpg",
      roughness: "/textures/wall/painted_concrete_02/roughness.jpg",
    },
    scale: 0.4,
  },
  {
    id: "painted-concrete",
    name: "Hormigón pintado gris",
    category: "liso",
    maps: {
      albedo: "/textures/wall/painted_concrete/albedo.jpg",
      normal: "/textures/wall/painted_concrete/normal.jpg",
      roughness: "/textures/wall/painted_concrete/roughness.jpg",
    },
    scale: 0.4,
  },
  {
    id: "plastered-wall",
    name: "Estuco liso",
    category: "liso",
    maps: {
      albedo: "/textures/wall/plastered_wall/albedo.jpg",
      normal: "/textures/wall/plastered_wall/normal.jpg",
      roughness: "/textures/wall/plastered_wall/roughness.jpg",
    },
    scale: 0.4,
  },
  {
    id: "clay-plaster",
    name: "Estuco arcilla",
    category: "liso",
    maps: {
      albedo: "/textures/wall/clay_plaster/albedo.jpg",
      normal: "/textures/wall/clay_plaster/normal.jpg",
      roughness: "/textures/wall/clay_plaster/roughness.jpg",
    },
    scale: 0.4,
  },
  // ── Mármol / piedra ──
  {
    id: "marble-tiles",
    name: "Mármol blanco",
    category: "piedra",
    maps: {
      albedo: "/textures/wall/marble_tiles/albedo.jpg",
      normal: "/textures/wall/marble_tiles/normal.jpg",
      roughness: "/textures/wall/marble_tiles/roughness.jpg",
    },
    scale: 0.3,
  },
  {
    id: "marble-mosaic",
    name: "Mosaico mármol",
    category: "piedra",
    maps: {
      albedo: "/textures/wall/marble_mosaic_tiles/albedo.jpg",
      normal: "/textures/wall/marble_mosaic_tiles/normal.jpg",
      roughness: "/textures/wall/marble_mosaic_tiles/roughness.jpg",
    },
    scale: 0.3,
  },
];

export function getTextureDef(id: string | null): TextureDef | null {
  if (!id || id === "none") return null;
  return wallTextures.find((t) => t.id === id) ?? null;
}