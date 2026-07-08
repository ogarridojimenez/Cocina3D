export type ObjectType =
  | "cabinet-base"
  | "cabinet-wall"
  | "cabinet-drawer"
  | "shelf"
  | "table"
  | "chair"
  | "fridge"
  | "oven"
  | "microwave"
  | "countertop"
  | "sink";

export type Category = "Muebles" | "Electrodomésticos" | "Encimera" | "Accesorios";
export type AnimationType = "door" | "drawer" | "none";

export interface CatalogItem {
  id: ObjectType;
  name: string;
  category: Category;
  icon: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultDepth: number;
  defaultColor: string;
  animationType: AnimationType;
}

export const CATALOG: CatalogItem[] = [
  {
    id: "cabinet-base",
    name: "Armario base",
    category: "Muebles",
    icon: "🗄️",
    defaultWidth: 0.6,
    defaultHeight: 0.85,
    defaultDepth: 0.5,
    defaultColor: "#8B7355",
    animationType: "door",
  },
  {
    id: "cabinet-wall",
    name: "Armario alto",
    category: "Muebles",
    icon: "🗃️",
    defaultWidth: 0.6,
    defaultHeight: 0.6,
    defaultDepth: 0.35,
    defaultColor: "#8B7355",
    animationType: "door",
  },
  {
    id: "cabinet-drawer",
    name: "Cajones 3",
    category: "Muebles",
    icon: "📂",
    defaultWidth: 0.6,
    defaultHeight: 0.8,
    defaultDepth: 0.5,
    defaultColor: "#A0522D",
    animationType: "drawer",
  },
  {
    id: "shelf",
    name: "Estantería",
    category: "Muebles",
    icon: "📚",
    defaultWidth: 0.8,
    defaultHeight: 1.8,
    defaultDepth: 0.35,
    defaultColor: "#D2B48C",
    animationType: "none",
  },
  {
    id: "table",
    name: "Mesa",
    category: "Muebles",
    icon: "🪑",
    defaultWidth: 1.2,
    defaultHeight: 0.75,
    defaultDepth: 0.8,
    defaultColor: "#DEB887",
    animationType: "none",
  },
  {
    id: "chair",
    name: "Silla",
    category: "Accesorios",
    icon: "🪑",
    defaultWidth: 0.45,
    defaultHeight: 0.85,
    defaultDepth: 0.45,
    defaultColor: "#4A4A4A",
    animationType: "none",
  },
  {
    id: "fridge",
    name: "Nevera",
    category: "Electrodomésticos",
    icon: "❄️",
    defaultWidth: 0.7,
    defaultHeight: 1.8,
    defaultDepth: 0.7,
    defaultColor: "#F5F5F5",
    animationType: "door",
  },
  {
    id: "oven",
    name: "Horno",
    category: "Electrodomésticos",
    icon: "🔥",
    defaultWidth: 0.6,
    defaultHeight: 0.6,
    defaultDepth: 0.6,
    defaultColor: "#2C2C2C",
    animationType: "door",
  },
  {
    id: "microwave",
    name: "Microondas",
    category: "Electrodomésticos",
    icon: "📡",
    defaultWidth: 0.5,
    defaultHeight: 0.35,
    defaultDepth: 0.4,
    defaultColor: "#C0C0C0",
    animationType: "door",
  },
  {
    id: "countertop",
    name: "Encimera",
    category: "Encimera",
    icon: "⬜",
    defaultWidth: 1.2,
    defaultHeight: 0.04,
    defaultDepth: 0.6,
    defaultColor: "#B8A88A",
    animationType: "none",
  },
  {
    id: "sink",
    name: "Fregadero",
    category: "Encimera",
    icon: "🫗",
    defaultWidth: 0.8,
    defaultHeight: 0.15,
    defaultDepth: 0.5,
    defaultColor: "#A0A0A0",
    animationType: "none",
  },
];

export function getCatalogItem(type: ObjectType): CatalogItem {
  return CATALOG.find((c) => c.id === type)!;
}

export const CATEGORIES: Category[] = [
  "Muebles",
  "Electrodomésticos",
  "Encimera",
  "Accesorios",
];

export function getItemsByCategory(category: Category): CatalogItem[] {
  return CATALOG.filter((c) => c.category === category);
}
