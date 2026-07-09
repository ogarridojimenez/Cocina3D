"use client";

import { useState, useMemo } from "react";
import { useWallStore } from "@/lib/store";
import {
  CATEGORIES,
  getItemsByCategory,
  type Category,
} from "@/data/catalog";

function genThumbnail(itemId: string): string {
  // Canvas 64x64 con icono de emoji (placeholder visual)
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, 64, 64);
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, 64, 64);
  return canvas.toDataURL();
}

export function CatalogPanel() {
  const addObject = useWallStore((s) => s.addObject);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");

  const toggle = (cat: Category) =>
    setCollapsed((p) => ({ ...p, [cat]: !p[cat] }));

  const CATEGORY_ICONS: Record<Category, string> = {
    Muebles: "🪑",
    Electrodomésticos: "⚡",
    Encimera: "⬜",
    Accesorios: "🔧",
    Campana: "💨",
    Mesetas: "🔲",
    Pared: "📺",
    Iluminación: "💡",
    Suelo: "🏟️",
  };

  return (
    <div className="w-60 bg-slate-900 border-r border-slate-700/50 flex flex-col overflow-hidden shrink-0">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-slate-700/50">
        <h2 className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
          Catálogo
        </h2>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-slate-700/30">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-[11px] text-slate-300 placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {CATEGORIES.map((cat) => {
          const items = getItemsByCategory(cat).filter(
            (i) =>
              !search ||
              i.name.toLowerCase().includes(search.toLowerCase())
          );
          if (items.length === 0) return null;
          return (
            <div key={cat} className="border-b border-slate-700/30 last:border-0">
              {/* Category header */}
              <button
                onClick={() => toggle(cat)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-sm">{CATEGORY_ICONS[cat]}</span>
                <span className="font-medium">{cat}</span>
                <span className="ml-auto text-[10px] text-slate-600">
                  {items.length}
                </span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    collapsed[cat] ? "" : "rotate-90"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Items grid */}
              {!collapsed[cat] && (
                <div className="grid grid-cols-3 gap-1 px-2 pb-2">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addObject(item.id)}
                      className="flex flex-col items-center gap-1 rounded-md border border-slate-700/40 bg-slate-800/30 p-1.5 text-[10px] text-slate-400 hover:border-blue-600/40 hover:bg-blue-950/20 hover:text-slate-200 transition-colors"
                      title={`${item.name} (${item.defaultWidth}×${item.defaultHeight}×${item.defaultDepth}m)`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center text-base rounded bg-slate-800/60">
                        {item.icon}
                      </div>
                      <span className="truncate w-full text-center leading-tight">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}