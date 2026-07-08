"use client";

import { useState } from "react";
import { useWallStore } from "@/lib/store";
import {
  CATEGORIES,
  getItemsByCategory,
  type Category,
} from "@/data/catalog";

export function CatalogPanel() {
  const addObject = useWallStore((s) => s.addObject);
  const [collapsed, setCollapsed] = useState<Record<Category, boolean>>({
    Muebles: false,
    Electrodomésticos: false,
    Encimera: false,
    Accesorios: false,
    Campana: false,
  });

  const toggle = (cat: Category) =>
    setCollapsed((p) => ({ ...p, [cat]: !p[cat] }));

  const CATEGORY_ICONS: Record<Category, string> = {
    Muebles: "🪑",
    Electrodomésticos: "⚡",
    Encimera: "⬜",
    Accesorios: "🔧",
    Campana: "💨",
  };

  return (
    <div className="w-60 bg-slate-900 border-r border-slate-700/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-slate-700/50">
        <h2 className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
          Catálogo
        </h2>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {CATEGORIES.map((cat) => {
          const items = getItemsByCategory(cat);
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

              {/* Items */}
              {!collapsed[cat] && (
                <div className="pb-1">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addObject(item.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
                      title={`${item.name} (${item.defaultWidth}×${item.defaultHeight}×${item.defaultDepth}m)`}
                    >
                      <span className="text-base w-5 text-center">
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                      <span className="ml-auto text-[10px] text-slate-600">
                        {item.defaultWidth}×{item.defaultDepth}
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
