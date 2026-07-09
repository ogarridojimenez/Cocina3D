"use client";

import { useWallStore } from "@/lib/store";
import { getCatalogItem } from "@/data/catalog";

export function ObjectOutliner() {
  const walls = useWallStore((s) => s.walls);
  const objects = useWallStore((s) => s.objects);
  const selectedWallId = useWallStore((s) => s.selectedWallId);
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);
  const selectWall = useWallStore((s) => s.selectWall);
  const selectObject = useWallStore((s) => s.selectObject);

  return (
    <div className="border-b border-slate-800">
      <div className="px-4 py-2.5 border-b border-slate-800">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Escena
        </h3>
      </div>
      <div className="py-1 max-h-48 overflow-y-auto">
        {/* Walls section */}
        {walls.length > 0 && (
          <div>
            <div className="px-3 py-1 text-[9px] font-medium text-slate-600 uppercase tracking-wider">
              Paredes ({walls.length})
            </div>
            {walls.map((w) => (
              <button
                key={w.id}
                onClick={() => selectWall(w.id)}
                className={`w-full flex items-center gap-2 px-3 py-1 text-[11px] transition-colors ${
                  selectedWallId === w.id
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-300"
                }`}
              >
                <span className="text-xs">🧱</span>
                <span>Pared #{w.id.split("-")[1]}</span>
                <span className="ml-auto text-[9px] text-slate-600">
                  {Math.sqrt(
                    (w.end.x - w.start.x) ** 2 + (w.end.z - w.start.z) ** 2
                  ).toFixed(1)}
                  m
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Objects section */}
        {objects.length > 0 && (
          <div>
            <div className="px-3 py-1 text-[9px] font-medium text-slate-600 uppercase tracking-wider">
              Objetos ({objects.length})
            </div>
            {objects.map((o) => {
              const cat = getCatalogItem(o.type);
              return (
                <button
                  key={o.id}
                  onClick={() => {
                    selectObject(o.id);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1 text-[11px] transition-colors ${
                    selectedObjectId === o.id
                      ? "bg-blue-600/20 text-blue-400"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-300"
                  }`}
                >
                  <span className="text-xs">{cat.icon}</span>
                  <span>
                    {cat.name} #{o.id.split("-")[1]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {walls.length === 0 && objects.length === 0 && (
          <div className="px-4 py-4 text-center text-[10px] text-slate-600">
            Escena vacía — añade paredes u objetos
          </div>
        )}
      </div>
    </div>
  );
}