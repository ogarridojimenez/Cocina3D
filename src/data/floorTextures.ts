export interface FloorTextureDef {
  id: string;
  name: string;
  polyhavenId: string;
  maps: {
    albedo: string;
    normal: string;
    roughness: string;
  };
  scale: number; // metros por repetición
}

export const FLOOR_TEXTURES: FloorTextureDef[] = [
  {
    id: "floor-tile",
    name: "Baldosa cerámica",
    polyhavenId: "tiled_floor_001",
    maps: {
      albedo: "/textures/floor/tiled_floor_001/albedo.jpg",
      normal: "/textures/floor/tiled_floor_001/normal.jpg",
      roughness: "/textures/floor/tiled_floor_001/roughness.jpg",
    },
    scale: 1,
  },
  {
    id: "floor-ceramic",
    name: "Baldosa beige",
    polyhavenId: "floor_tiles_02",
    maps: {
      albedo: "/textures/floor/floor_tiles_02/albedo.jpg",
      normal: "/textures/floor/floor_tiles_02/normal.jpg",
      roughness: "/textures/floor/floor_tiles_02/roughness.jpg",
    },
    scale: 1.2,
  },
  {
    id: "floor-herringbone",
    name: "Espina de pez roble",
    polyhavenId: "herringbone_parquet",
    maps: {
      albedo: "/textures/floor/herringbone_parquet/albedo.jpg",
      normal: "/textures/floor/herringbone_parquet/normal.jpg",
      roughness: "/textures/floor/herringbone_parquet/roughness.jpg",
    },
    scale: 1.5,
  },
  {
    id: "floor-marble",
    name: "Mármol blanco",
    polyhavenId: "marble_tiles",
    maps: {
      albedo: "/textures/floor/marble_tiles/albedo.jpg",
      normal: "/textures/floor/marble_tiles/normal.jpg",
      roughness: "/textures/floor/marble_tiles/roughness.jpg",
    },
    scale: 1.5,
  },
  {
    id: "floor-wood-dark",
    name: "Madera oscura",
    polyhavenId: "dark_wooden_planks",
    maps: {
      albedo: "/textures/floor/dark_wooden_planks/albedo.jpg",
      normal: "/textures/floor/dark_wooden_planks/normal.jpg",
      roughness: "/textures/floor/dark_wooden_planks/roughness.jpg",
    },
    scale: 1.5,
  },
  {
    id: "floor-porcelain",
    name: "Gres porcelánico",
    polyhavenId: "large_grey_tiles",
    maps: {
      albedo: "/textures/floor/large_grey_tiles/albedo.jpg",
      normal: "/textures/floor/large_grey_tiles/normal.jpg",
      roughness: "/textures/floor/large_grey_tiles/roughness.jpg",
    },
    scale: 2,
  },
  {
    id: "floor-slate",
    name: "Pizarra gris",
    polyhavenId: "patterned_slate_tiles",
    maps: {
      albedo: "/textures/floor/patterned_slate_tiles/albedo.jpg",
      normal: "/textures/floor/patterned_slate_tiles/normal.jpg",
      roughness: "/textures/floor/patterned_slate_tiles/roughness.jpg",
    },
    scale: 1.2,
  },
];

export function getFloorTextureDef(id: string | null): FloorTextureDef | null {
  if (!id) return null;
  return FLOOR_TEXTURES.find((t) => t.id === id) ?? null;
}

export function isFloorTexture(id: string | null): boolean {
  if (!id) return false;
  return FLOOR_TEXTURES.some((t) => t.id === id);
}
