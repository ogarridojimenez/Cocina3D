export type ObjectType =
  | "cabinet-base"
  | "cabinet-wall"
  | "cabinet-drawer"
  | "shelf"
  | "open-shelf"
  | "vitrina"
  | "columna-despensa"
  | "table"
  | "mesa-comedor"
  | "chair"
  | "taburete"
  | "fridge"
  | "freezer"
  | "oven"
  | "microwave"
  | "dishwasher"
  | "washing-machine"
  | "placa"
  | "range-hood"
  | "range-hood-builtin"
  | "coffee-machine"
  | "toaster"
  | "robot-cocina"
  | "warm-drawer"
  | "countertop"
  | "sink"
  | "dish-rack"
  | "island"
  | "counter"
  | "tv"
  | "cuadro"
  | "lamp-colgante"
  | "lamp-techo"
  | "planta"
  | "floor";

export type Category = "Muebles" | "Electrodomésticos" | "Encimera" | "Accesorios" | "Campana" | "Mesetas" | "Pared" | "Suelo" | "Iluminación";
export type AnimationType = "door" | "drawer" | "none";
export type MountType = "floor" | "wall" | "counter";

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
  mountType: MountType;
  mountHeight: number; // Y position for wall/counter mounted
}

export const CATALOG: CatalogItem[] = [
  // ── Muebles ───────────────────────────────────────
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
    mountType: "floor",
    mountHeight: 0,
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
    mountType: "wall",
    mountHeight: 1.6,
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
    mountType: "floor",
    mountHeight: 0,
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
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "open-shelf",
    name: "Estante abierto",
    category: "Muebles",
    icon: "📖",
    defaultWidth: 0.8,
    defaultHeight: 0.25,
    defaultDepth: 0.3,
    defaultColor: "#D2B48C",
    animationType: "none",
    mountType: "wall",
    mountHeight: 1.5,
  },
  {
    id: "vitrina",
    name: "Vitrina acristalada",
    category: "Muebles",
    icon: "🪟",
    defaultWidth: 0.6,
    defaultHeight: 1.2,
    defaultDepth: 0.35,
    defaultColor: "#8B7355",
    animationType: "door",
    mountType: "wall",
    mountHeight: 0.6,
  },
  {
    id: "columna-despensa",
    name: "Columna despensa",
    category: "Muebles",
    icon: "🧱",
    defaultWidth: 0.4,
    defaultHeight: 2.2,
    defaultDepth: 0.6,
    defaultColor: "#8B7355",
    animationType: "door",
    mountType: "floor",
    mountHeight: 0,
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
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "island",
    name: "Isla cocina",
    category: "Muebles",
    icon: "🏝️",
    defaultWidth: 1.8,
    defaultHeight: 0.85,
    defaultDepth: 0.9,
    defaultColor: "#A0926B",
    animationType: "none",
    mountType: "floor",
    mountHeight: 0,
  },

  // ── Electrodomésticos ─────────────────────────────
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
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "freezer",
    name: "Congelador",
    category: "Electrodomésticos",
    icon: "🧊",
    defaultWidth: 0.7,
    defaultHeight: 0.85,
    defaultDepth: 0.65,
    defaultColor: "#F5F5F5",
    animationType: "door",
    mountType: "floor",
    mountHeight: 0,
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
    mountType: "wall",
    mountHeight: 0.9,
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
    mountType: "counter",
    mountHeight: 0,
  },
  {
    id: "dishwasher",
    name: "Lavavajillas",
    category: "Electrodomésticos",
    icon: "🧼",
    defaultWidth: 0.6,
    defaultHeight: 0.85,
    defaultDepth: 0.6,
    defaultColor: "#E8E8E8",
    animationType: "door",
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "washing-machine",
    name: "Lavadora",
    category: "Electrodomésticos",
    icon: "🧺",
    defaultWidth: 0.6,
    defaultHeight: 0.85,
    defaultDepth: 0.6,
    defaultColor: "#F5F5F5",
    animationType: "door",
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "placa",
    name: "Placa inducción",
    category: "Electrodomésticos",
    icon: "🔘",
    defaultWidth: 0.7,
    defaultHeight: 0.05,
    defaultDepth: 0.5,
    defaultColor: "#111111",
    animationType: "none",
    mountType: "counter",
    mountHeight: 0,
  },
  {
    id: "coffee-machine",
    name: "Cafetera",
    category: "Electrodomésticos",
    icon: "☕",
    defaultWidth: 0.3,
    defaultHeight: 0.35,
    defaultDepth: 0.35,
    defaultColor: "#1A1A1A",
    animationType: "none",
    mountType: "counter",
    mountHeight: 0,
  },
  {
    id: "toaster",
    name: "Tostadora",
    category: "Electrodomésticos",
    icon: "🍞",
    defaultWidth: 0.25,
    defaultHeight: 0.2,
    defaultDepth: 0.3,
    defaultColor: "#E0E0E0",
    animationType: "none",
    mountType: "counter",
    mountHeight: 0,
  },
  {
    id: "robot-cocina",
    name: "Robot cocina",
    category: "Electrodomésticos",
    icon: "🧑‍🍳",
    defaultWidth: 0.3,
    defaultHeight: 0.4,
    defaultDepth: 0.3,
    defaultColor: "#FFFFFF",
    animationType: "none",
    mountType: "counter",
    mountHeight: 0,
  },
  {
    id: "warm-drawer",
    name: "Cajón calientaplatos",
    category: "Electrodomésticos",
    icon: "🔥",
    defaultWidth: 0.6,
    defaultHeight: 0.15,
    defaultDepth: 0.5,
    defaultColor: "#C0C0C0",
    animationType: "drawer",
    mountType: "wall",
    mountHeight: 0.4,
  },

  // ── Campana ───────────────────────────────────────
  {
    id: "range-hood",
    name: "Campana extractora",
    category: "Campana",
    icon: "💨",
    defaultWidth: 0.8,
    defaultHeight: 0.15,
    defaultDepth: 0.5,
    defaultColor: "#C0C0C0",
    animationType: "none",
    mountType: "wall",
    mountHeight: 2.2,
  },
  {
    id: "range-hood-builtin",
    name: "Campana integrada",
    category: "Campana",
    icon: "⬛",
    defaultWidth: 0.8,
    defaultHeight: 0.1,
    defaultDepth: 0.5,
    defaultColor: "#333333",
    animationType: "none",
    mountType: "wall",
    mountHeight: 2.2,
  },

  // ── Encimera ──────────────────────────────────────
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
    mountType: "floor",
    mountHeight: 0.85,
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
    mountType: "counter",
    mountHeight: 0,
  },

  // ── Accesorios ────────────────────────────────────
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
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "taburete",
    name: "Taburete barra",
    category: "Accesorios",
    icon: "💺",
    defaultWidth: 0.4,
    defaultHeight: 0.7,
    defaultDepth: 0.4,
    defaultColor: "#4A4A4A",
    animationType: "none",
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "mesa-comedor",
    name: "Mesa comedor",
    category: "Accesorios",
    icon: "🍽️",
    defaultWidth: 1.5,
    defaultHeight: 0.75,
    defaultDepth: 0.9,
    defaultColor: "#DEB887",
    animationType: "none",
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "planta",
    name: "Planta decorativa",
    category: "Accesorios",
    icon: "🌿",
    defaultWidth: 0.3,
    defaultHeight: 0.8,
    defaultDepth: 0.3,
    defaultColor: "#5B8C5A",
    animationType: "none",
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "dish-rack",
    name: "Platero",
    category: "Accesorios",
    icon: "🍽️",
    defaultWidth: 0.4,
    defaultHeight: 0.3,
    defaultDepth: 0.3,
    defaultColor: "#C0C0C0",
    animationType: "none",
    mountType: "counter",
    mountHeight: 0,
  },

  // ── Mesetas ───────────────────────────────────────
  {
    id: "counter",
    name: "Meseta",
    category: "Mesetas",
    icon: "🔲",
    defaultWidth: 1.4,
    defaultHeight: 0.85,
    defaultDepth: 0.6,
    defaultColor: "#B8A88A",
    animationType: "door",
    mountType: "floor",
    mountHeight: 0,
  },
  // ── Pared ───────────────────────────────────────
  {
    id: "tv",
    name: "TV Pared",
    category: "Pared",
    icon: "📺",
    defaultWidth: 1.2,
    defaultHeight: 0.7,
    defaultDepth: 0.05,
    defaultColor: "#111111",
    animationType: "none",
    mountType: "wall",
    mountHeight: 1.5,
  },
  {
    id: "cuadro",
    name: "Cuadro pared",
    category: "Pared",
    icon: "🖼️",
    defaultWidth: 0.6,
    defaultHeight: 0.4,
    defaultDepth: 0.03,
    defaultColor: "#8B4513",
    animationType: "none",
    mountType: "wall",
    mountHeight: 1.6,
  },

  // ── Iluminación ──────────────────────────────────
  {
    id: "lamp-colgante",
    name: "Lámpara colgante",
    category: "Iluminación",
    icon: "💡",
    defaultWidth: 0.3,
    defaultHeight: 0.4,
    defaultDepth: 0.3,
    defaultColor: "#FFD700",
    animationType: "none",
    mountType: "floor",
    mountHeight: 0,
  },
  {
    id: "lamp-techo",
    name: "Lámpara techo",
    category: "Iluminación",
    icon: "🔦",
    defaultWidth: 0.6,
    defaultHeight: 0.08,
    defaultDepth: 0.6,
    defaultColor: "#FFD700",
    animationType: "none",
    mountType: "floor",
    mountHeight: 2.5,
  },

  // ── Suelo ───────────────────────────────────────
  {
    id: "floor",
    name: "Suelo",
    category: "Suelo",
    icon: "🏟️",
    defaultWidth: 10,
    defaultHeight: 0.02,
    defaultDepth: 10,
    defaultColor: "#888888",
    animationType: "none",
    mountType: "floor",
    mountHeight: 0,
  },
];

export function getCatalogItem(type: ObjectType): CatalogItem {
  return CATALOG.find((c) => c.id === type)!;
}

export const CATEGORIES: Category[] = [
  "Muebles",
  "Electrodomésticos",
  "Encimera",
  "Campana",
  "Accesorios",
  "Mesetas",
  "Pared",
  "Iluminación",
  "Suelo",
];

export function getItemsByCategory(category: Category): CatalogItem[] {
  return CATALOG.filter((c) => c.category === category);
}