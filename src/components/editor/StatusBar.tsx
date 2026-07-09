"use client";

import { useWallStore } from "@/lib/store";
import { getCatalogItem } from "@/data/catalog";
import { undo, redo } from "@/lib/store";
import { useMemo } from "react";

export function StatusBar() {
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);
  const selectedWallId = useWallStore((s) => s.selectedWallId);
  const objects = useWallStore((s) => s.objects);
  const walls = useWallStore((s) => s.walls);

  const obj = objects.find((o) => o.id === selectedObjectId);
  const wall = walls.find((w) => w.id === selectedWallId);

  const label = useMemo(() => {
    if (obj) {
      const cat = getCatalogItem(obj.type);
      return `${cat.name} #${obj.id.split("-")[1]}`;
    }
    if (wall) return `Pared #${wall.id.split("-")[1]}`;
    return "Nada seleccionado";
  }, [obj, wall]);

  const coords = useMemo(() => {
    if (obj) return `X:${obj.position.x.toFixed(1)} Z:${obj.position.z.toFixed(1)}`;
    if (wall) return `${Math.sqrt((wall.end.x - wall.start.x) ** 2 + (wall.end.z - wall.start.z) ** 2).toFixed(1)}m`;
    return "—";
  }, [obj, wall]);

  return (
    <footer className="flex h-7 shrink-0 items-center justify-between border-t border-slate-800 bg-slate-900/80 px-3 text-[10px] text-slate-500">
      <div className="flex items-center gap-3">
        <span className="font-medium text-slate-400">{label}</span>
        <span className="text-slate-700">|</span>
        <span>{coords}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-slate-600">Ctrl+Z Deshacer</span>
        <span className="text-slate-700">|</span>
        <span className="text-slate-600">R Mover/Rotar</span>
        <span className="text-slate-700">|</span>
        <span className="text-slate-600">Esc Desseleccionar</span>
      </div>
    </footer>
  );
}