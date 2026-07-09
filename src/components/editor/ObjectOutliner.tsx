"use client";

import { useWallStore } from "@/lib/store";
import { getCatalogItem } from "@/data/catalog";
import { useMemo } from "react";

export function ObjectOutliner() {
  const walls = useWallStore((s) => s.walls);
  const objects = useWallStore((s) => s.objects);
  const selectedWallId = useWallStore((s) => s.selectedWallId);
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);
  const selectWall = useWallStore((s) => s.selectWall);
  const selectObject = useWallStore((s) => s.selectObject);

  const entries = useMemo(() => {
    const list: { id: string; label: string; icon: string; type: "wall" | "object" }[] = [];

    // Walls
    walls.forEach((w, i) => {
      list.push({ id: w.id, label: `Pared #${i + 1}`, icon: "🧱", type: "wall" });
    });

    // Objects
    objects.forEach((o) => {
      const cat = getCatalogItem(o.type);
      const name = cat?.name ?? o.type;
      const icon = cat?.icon ?? "📦";
      list.push({ id: o.id, label: name, icon, type: "object" });
    });

    return list;
  }, [walls, objects]);

  if (entries.length === 0) return null;

  return (
    <div className="border-b border-slate-800">
      <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        Escena
      </div>
      <div className="max-h-48 overflow-y-auto">
        {entries.map((entry) => {
          const isSelected =
            entry.type === "wall"
              ? selectedWallId === entry.id
              : selectedObjectId === entry.id;
          return (
            <button
              key={entry.id}
              onClick={() => {
                if (entry.type === "wall") selectWall(entry.id);
                else selectObject(entry.id);
              }}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] transition-colors ${
                isSelected
                  ? "bg-blue-600/15 text-blue-300 border-l-2 border-blue-500"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-300 border-l-2 border-transparent"
              }`}
            >
              <span className="text-[13px] shrink-0">{entry.icon}</span>
              <span className="truncate">{entry.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
