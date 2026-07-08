"use client";

import { wallTextures } from "@/data/textures";
import type { TextureDef } from "@/data/textures";

interface TextureSelectorProps {
  textureId: string | null;
  onSelect: (id: string | null) => void;
}

export function TextureSelector({ textureId, onSelect }: TextureSelectorProps) {
  const all = [{ id: "none" as const, name: "Color sólido" }, ...wallTextures];

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        Textura
      </label>
      <div className="grid grid-cols-3 gap-2">
        {all.map((t) => {
          const isActive = (t.id === "none" && textureId === null) || t.id === textureId;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id === "none" ? null : t.id)}
              className={`relative flex flex-col items-center rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                isActive
                  ? "border-blue-500 ring-2 ring-blue-500/30"
                  : "border-slate-700 hover:border-slate-500"
              }`}
              title={t.name}
            >
              {t.id !== "none" ? (
                <TextureThumbnail def={wallTextures.find((wt) => wt.id === t.id)!} />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                  <span className="text-slate-400 text-xl">⊘</span>
                </div>
              )}
              <span className="text-[10px] text-slate-400 py-1 text-center leading-tight w-full bg-slate-900/80">
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TextureThumbnail({ def }: { def: TextureDef }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={def.maps.albedo}
      alt={def.name}
      className="w-full aspect-square object-cover"
    />
  );
}
