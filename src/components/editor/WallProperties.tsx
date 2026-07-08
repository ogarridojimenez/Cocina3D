"use client";

import { useWallStore } from "@/lib/store";
import { getCatalogItem } from "@/data/catalog";
import { ObjectProperties } from "./ObjectProperties";
import { TextureSelector } from "./TextureSelector";

const GROSORES = [0.05, 0.10, 0.15, 0.20];

export function WallProperties() {
  const selectedWallId = useWallStore((s) => s.selectedWallId);
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);
  const walls = useWallStore((s) => s.walls);
  const updateWall = useWallStore((s) => s.updateWall);

  const wall = walls.find((w) => w.id === selectedWallId);

  // ── Object selected → delegate ────────────
  if (selectedObjectId) {
    return <ObjectProperties />;
  }

  // ── Empty state ────────────────────────────
  if (!wall) {
    return (
      <aside className="w-64 border-l border-slate-800 bg-slate-900/80">
        <div className="flex flex-col items-center justify-center h-full gap-2 px-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Selecciona un objeto<br />para editar sus propiedades
          </p>
          <p className="text-[10px] text-slate-700">Click sobre una pared u objeto en la escena</p>
        </div>
      </aside>
    );
  }

  // ── Wall properties ────────────────────────
  const largo = Math.sqrt(
    (wall.end.x - wall.start.x) ** 2 + (wall.end.z - wall.start.z) ** 2
  );

  return (
    <aside className="w-64 border-l border-slate-800 bg-slate-900/80 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-slate-800 px-4 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600/20 text-xs text-blue-400">
          🧱
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-200">Propiedades</h2>
          <p className="text-[10px] text-slate-500">Pared {wall.id.split("-")[1]}</p>
        </div>
      </div>

      {/* Section: Dimensiones */}
      <div className="border-b border-slate-800 px-4 py-3">
        <h3 className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Dimensiones
        </h3>
        <div className="space-y-2">
          <Field label="Largo" unit="m">
            <input
              type="number"
              min={0.1}
              max={50}
              step={0.1}
              value={Math.round(largo * 100) / 100}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v < 0.1) return;
                const dx = wall.end.x - wall.start.x;
                const dz = wall.end.z - wall.start.z;
                const cur = Math.sqrt(dx * dx + dz * dz);
                if (cur < 0.001) return;
                const r = v / cur;
                updateWall(wall.id, { end: { x: wall.start.x + dx * r, z: wall.start.z + dz * r } });
              }}
              className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </Field>
          <Field label="Altura" unit="m">
            <input
              type="number"
              min={0.1}
              max={10}
              step={0.1}
              value={wall.height}
              onChange={(e) => updateWall(wall.id, { height: Number(e.target.value) })}
              className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </Field>
          <Field label="Grosor" unit="cm">
            <div className="flex gap-1">
              {GROSORES.map((g) => (
                <button
                  key={g}
                  onClick={() => updateWall(wall.id, { thickness: g })}
                  className={`flex-1 rounded-md border py-1.5 text-xs font-medium transition ${
                    wall.thickness === g
                      ? "border-blue-600 bg-blue-600/20 text-blue-400"
                      : "border-slate-700 bg-slate-800/40 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                  }`}
                >
                  {Math.round(g * 100)}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </div>

      {/* Section: Apariencia */}
      <div className="border-b border-slate-800 px-4 py-3">
        <h3 className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
          Apariencia
        </h3>
        <div className="space-y-2">
          <div>
            <label className="mb-1 block text-[11px] text-slate-400">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={wall.color}
                onChange={(e) => updateWall(wall.id, { color: e.target.value })}
                className="h-8 w-10 cursor-pointer rounded-md border border-slate-700 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded"
              />
              <span className="rounded bg-slate-800 px-2 py-1 text-[11px] font-mono text-slate-400">
                {wall.color}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <TextureSelector
            textureId={wall.textureId}
            onSelect={(id) => updateWall(wall.id, { textureId: id })}
          />
        </div>
      </div>

      {/* Section: Acciones */}
      <div className="px-4 py-3">
        <button
          onClick={() => useWallStore.getState().removeWall(wall.id)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-800/40 bg-red-950/20 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-950/40 hover:border-red-700/60 transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Eliminar pared
        </button>
      </div>
    </aside>
  );
}

// ── Field helper ───────────────────────────────────

function Field({ label, unit, children }: { label: string; unit: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
        <span>{label}</span>
        <span className="text-[10px] text-slate-600">{unit}</span>
      </label>
      {children}
    </div>
  );
}
