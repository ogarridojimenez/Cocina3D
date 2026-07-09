export interface MaterialTextureDef {
  id: string;
  name: string;
  polyhavenId: string;
  maps: {
    albedo: string;
    normal: string;
    roughness: string;
  };
  scale: number;
  metalness: number;
  roughness: number;
}

export const MATERIAL_TEXTURES: MaterialTextureDef[] = [
  {
    id: "oak",
    name: "Roble",
    polyhavenId: "oak_veneer_01",
    maps: {
      albedo: "/textures/materials/oak/albedo.jpg",
      normal: "/textures/materials/oak/normal.jpg",
      roughness: "/textures/materials/oak/roughness.jpg",
    },
    scale: 1,
    metalness: 0,
    roughness: 0.6,
  },
  {
    id: "walnut",
    name: "Nogal",
    polyhavenId: "dark_wooden_planks",
    maps: {
      albedo: "/textures/materials/walnut/albedo.jpg",
      normal: "/textures/materials/walnut/normal.jpg",
      roughness: "/textures/materials/walnut/roughness.jpg",
    },
    scale: 1,
    metalness: 0,
    roughness: 0.5,
  },
  {
    id: "pine",
    name: "Pino",
    polyhavenId: "stained_pine",
    maps: {
      albedo: "/textures/materials/pine/albedo.jpg",
      normal: "/textures/materials/pine/normal.jpg",
      roughness: "/textures/materials/pine/roughness.jpg",
    },
    scale: 1,
    metalness: 0,
    roughness: 0.7,
  },
  {
    id: "wenge",
    name: "Wengué",
    polyhavenId: "dark_wood",
    maps: {
      albedo: "/textures/materials/wenge/albedo.jpg",
      normal: "/textures/materials/wenge/normal.jpg",
      roughness: "/textures/materials/wenge/roughness.jpg",
    },
    scale: 1,
    metalness: 0,
    roughness: 0.5,
  },
  {
    id: "cherry",
    name: "Cerezo",
    polyhavenId: "wood_floor",
    maps: {
      albedo: "/textures/materials/cherry/albedo.jpg",
      normal: "/textures/materials/cherry/normal.jpg",
      roughness: "/textures/materials/cherry/roughness.jpg",
    },
    scale: 1,
    metalness: 0,
    roughness: 0.6,
  },
  {
    id: "marble",
    name: "Mármol",
    polyhavenId: "marble_01",
    maps: {
      albedo: "/textures/materials/marble/albedo.jpg",
      normal: "/textures/materials/marble/normal.jpg",
      roughness: "/textures/materials/marble/roughness.jpg",
    },
    scale: 1.5,
    metalness: 0,
    roughness: 0.3,
  },
  {
    id: "granite",
    name: "Granito",
    polyhavenId: "granite_tile",
    maps: {
      albedo: "/textures/materials/granite/albedo.jpg",
      normal: "/textures/materials/granite/normal.jpg",
      roughness: "/textures/materials/granite/roughness.jpg",
    },
    scale: 1.2,
    metalness: 0,
    roughness: 0.5,
  },
  {
    id: "slate",
    name: "Pizarra",
    polyhavenId: "patterned_slate_tiles",
    maps: {
      albedo: "/textures/materials/slate/albedo.jpg",
      normal: "/textures/materials/slate/normal.jpg",
      roughness: "/textures/materials/slate/roughness.jpg",
    },
    scale: 1.5,
    metalness: 0,
    roughness: 0.8,
  },
  {
    id: "steel",
    name: "Acero",
    polyhavenId: "metal_plate",
    maps: {
      albedo: "/textures/materials/steel/albedo.jpg",
      normal: "/textures/materials/steel/normal.jpg",
      roughness: "/textures/materials/steel/roughness.jpg",
    },
    scale: 1,
    metalness: 0.8,
    roughness: 0.2,
  },
  {
    id: "brass",
    name: "Latón",
    polyhavenId: "metal_plate_02",
    maps: {
      albedo: "/textures/materials/brass/albedo.jpg",
      normal: "/textures/materials/brass/normal.jpg",
      roughness: "/textures/materials/brass/roughness.jpg",
    },
    scale: 1,
    metalness: 0.9,
    roughness: 0.15,
  },
];

export function getMaterialTextureDef(id: string): MaterialTextureDef | undefined {
  return MATERIAL_TEXTURES.find((m) => m.id === id);
}