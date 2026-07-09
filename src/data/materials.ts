export type MaterialCategory = "madera" | "piedra" | "metal" | "suelo";

export interface MaterialDef {
  id: string;
  name: string;
  category: MaterialCategory;
  baseColor: string;
  roughness: number;
  metalness: number;
}

export const MATERIALS: MaterialDef[] = [
  // ── Madera ──────────────────────────────────────────
  {
    id: "oak",
    name: "Roble",
    category: "madera",
    baseColor: "#C4956A",
    roughness: 0.7,
    metalness: 0,
  },
  {
    id: "walnut",
    name: "Nogal",
    category: "madera",
    baseColor: "#5C3A21",
    roughness: 0.75,
    metalness: 0,
  },
  {
    id: "pine",
    name: "Pino",
    category: "madera",
    baseColor: "#E8C994",
    roughness: 0.8,
    metalness: 0,
  },
  {
    id: "wenge",
    name: "Wengué",
    category: "madera",
    baseColor: "#2B1D14",
    roughness: 0.65,
    metalness: 0,
  },
  {
    id: "cherry",
    name: "Cerezo",
    category: "madera",
    baseColor: "#8B3A3A",
    roughness: 0.7,
    metalness: 0,
  },
  // ── Piedra ──────────────────────────────────────────
  {
    id: "marble",
    name: "Mármol Blanco",
    category: "piedra",
    baseColor: "#E8E0D8",
    roughness: 0.4,
    metalness: 0.05,
  },
  {
    id: "granite",
    name: "Granito Gris",
    category: "piedra",
    baseColor: "#8B8682",
    roughness: 0.6,
    metalness: 0.05,
  },
  {
    id: "slate",
    name: "Pizarra Negra",
    category: "piedra",
    baseColor: "#2F2F2F",
    roughness: 0.8,
    metalness: 0.05,
  },
  // ── Metal ───────────────────────────────────────────
  {
    id: "steel",
    name: "Acero Cepillado",
    category: "metal",
    baseColor: "#C0C0C0",
    roughness: 0.25,
    metalness: 0.8,
  },
  {
    id: "brass",
    name: "Latón",
    category: "metal",
    baseColor: "#C5A55A",
    roughness: 0.3,
    metalness: 0.7,
  },

  // ── Suelo ────────────────────────────────────────────
  {
    id: "floor-tile",
    name: "Baldosa blanca",
    category: "suelo",
    baseColor: "#E8E4DC",
    roughness: 0.5,
    metalness: 0.05,
  },
  {
    id: "floor-parquet",
    name: "Parquet roble",
    category: "suelo",
    baseColor: "#C4956A",
    roughness: 0.7,
    metalness: 0,
  },
  {
    id: "floor-slate",
    name: "Pizarra gris",
    category: "suelo",
    baseColor: "#4A4A4A",
    roughness: 0.85,
    metalness: 0,
  },
  {
    id: "floor-terrazzo",
    name: "Terrazo claro",
    category: "suelo",
    baseColor: "#D4CFC5",
    roughness: 0.6,
    metalness: 0,
  },
  {
    id: "floor-concrete",
    name: "Hormigón pulido",
    category: "suelo",
    baseColor: "#A8A8A8",
    roughness: 0.7,
    metalness: 0.05,
  },
];

export function getMaterial(id: string): MaterialDef | undefined {
  return MATERIALS.find((m) => m.id === id);
}