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
    walls.forEach((w, i) => {
      list.push({ id: w.id, label: `Pared #${i + 1}`, icon: "🧱", type: "wall" });
    });
    objects.forEach((o) => {
      const cat = getCatalogItem(o.type);
      list.push({ id: o.id, label: cat?.name ?? o.type, icon: cat?.icon ?? "📦", type: "object" });
    });
    return list;
  }, [walls, objects]);

  const currentValue = selectedWallId ?? selectedObjectId ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) { selectWall(null); selectObject(null); return; }
    const entry = entries.find((en) => en.id === id);
    if (entry?.type === "wall") selectWall(id);
    else selectObject(id);
  };

  if (entries.length === 0) return null;

  return (
    <div className="px-3 py-2 border-b border-slate-800 flex items-center gap-2">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 shrink-0">
        Escena
      </label>
      <select
        value={currentValue}
        onChange={handleChange}
        className="flex-1 bg-slate-800/80 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-300 outline-none focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
      >
        <option value="">— Ninguno —</option>
        {entries.map((entry) => (
          <option key={entry.id} value={entry.id}>
            {entry.icon} {entry.label}
          </option>
        ))}
      </select>
    </div>
  );
}
