// Precios por tipo de objeto (€)
import type { ObjectType } from "@/data/catalog";

export interface PriceEntry {
  type: ObjectType | "custom";
  label: string;
  unitPrice: number; // €
  installation: number; // €
}

export const PRICES: PriceEntry[] = [
  // Muebles
  { type: "cabinet-base", label: "Armario base", unitPrice: 120, installation: 25 },
  { type: "cabinet-wall", label: "Armario alto", unitPrice: 140, installation: 25 },
  { type: "cabinet-drawer", label: "Cajones 3", unitPrice: 160, installation: 25 },
  { type: "shelf", label: "Estantería", unitPrice: 110, installation: 20 },
  { type: "open-shelf", label: "Estante abierto", unitPrice: 50, installation: 15 },
  { type: "vitrina", label: "Vitrina acristalada", unitPrice: 200, installation: 30 },
  { type: "columna-despensa", label: "Columna despensa", unitPrice: 180, installation: 30 },
  { type: "armario-modular", label: "Armario modular configurable", unitPrice: 200, installation: 35 },
  { type: "table", label: "Mesa", unitPrice: 150, installation: 0 },
  { type: "mesa-comedor", label: "Mesa comedor", unitPrice: 250, installation: 0 },
  { type: "chair", label: "Silla", unitPrice: 60, installation: 0 },
  { type: "taburete", label: "Taburete barra", unitPrice: 45, installation: 0 },
  { type: "island", label: "Isla cocina", unitPrice: 450, installation: 80 },
  // Electrodomésticos
  { type: "fridge", label: "Nevera", unitPrice: 800, installation: 50 },
  { type: "freezer", label: "Congelador", unitPrice: 500, installation: 50 },
  { type: "oven", label: "Horno", unitPrice: 600, installation: 50 },
  { type: "microwave", label: "Microondas", unitPrice: 150, installation: 30 },
  { type: "dishwasher", label: "Lavavajillas", unitPrice: 500, installation: 60 },
  { type: "washing-machine", label: "Lavadora", unitPrice: 450, installation: 50 },
  { type: "placa", label: "Placa inducción", unitPrice: 400, installation: 50 },
  { type: "coffee-machine", label: "Cafetera", unitPrice: 80, installation: 0 },
  { type: "toaster", label: "Tostadora", unitPrice: 35, installation: 0 },
  { type: "robot-cocina", label: "Robot cocina", unitPrice: 350, installation: 0 },
  { type: "warm-drawer", label: "Cajón calientaplatos", unitPrice: 200, installation: 30 },
  // Campanas
  { type: "range-hood", label: "Campana extractora", unitPrice: 250, installation: 60 },
  { type: "range-hood-builtin", label: "Campana integrada", unitPrice: 300, installation: 60 },
  // Encimera
  { type: "countertop", label: "Encimera", unitPrice: 180, installation: 40 },
  { type: "countertop-l", label: "Encimera L", unitPrice: 280, installation: 60 },
  { type: "sink", label: "Fregadero", unitPrice: 120, installation: 50 },
  // Accesorios
  { type: "dish-rack", label: "Platero", unitPrice: 25, installation: 0 },
  { type: "planta", label: "Planta decorativa", unitPrice: 30, installation: 0 },
  // Mesetas
  { type: "counter", label: "Meseta", unitPrice: 350, installation: 70 },
  // Pared
  { type: "tv", label: "TV Pared", unitPrice: 500, installation: 40 },
  { type: "cuadro", label: "Cuadro pared", unitPrice: 45, installation: 0 },
  // Fontanería
  { type: "columna-fontaneria", label: "Columna fontanería", unitPrice: 120, installation: 80 },
  { type: "tuberia-horizontal", label: "Tubería horizontal", unitPrice: 35, installation: 40 },
  { type: "sifon-decorativo", label: "Sifón decorativo", unitPrice: 25, installation: 30 },
  // Iluminación
  { type: "lamp-colgante", label: "Lámpara colgante", unitPrice: 80, installation: 30 },
  { type: "lamp-techo", label: "Lámpara techo", unitPrice: 60, installation: 30 },
  // Suelo
  { type: "floor", label: "Suelo", unitPrice: 250, installation: 100 },
];

export function getPrice(type: ObjectType): PriceEntry {
  return PRICES.find((p) => p.type === type) ?? { type, label: type, unitPrice: 0, installation: 0 };
}

export function calculateTotal(objects: { type: ObjectType }[]): {
  items: { label: string; qty: number; unitPrice: number; subtotal: number }[];
  totalProducts: number;
  totalInstallation: number;
  grandTotal: number;
} {
  const counts = new Map<ObjectType, number>();
  for (const obj of objects) {
    counts.set(obj.type, (counts.get(obj.type) || 0) + 1);
  }

  const items: { label: string; qty: number; unitPrice: number; subtotal: number }[] = [];
  let totalProducts = 0;
  let totalInstallation = 0;

  for (const [type, qty] of counts) {
    const price = getPrice(type);
    const subtotal = price.unitPrice * qty;
    totalProducts += subtotal;
    totalInstallation += price.installation * qty;
    items.push({ label: price.label, qty, unitPrice: price.unitPrice, subtotal });
  }

  return { items, totalProducts, totalInstallation, grandTotal: totalProducts + totalInstallation };
}
