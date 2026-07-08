"use client";

import { useWallStore } from "@/lib/store";
import { getCatalogItem } from "@/data/catalog";

export function ObjectProperties() {
  const objects = useWallStore((s) => s.objects);
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);
  const updateObject = useWallStore((s) => s.updateObject);
  const removeObject = useWallStore((s) => s.removeObject);
  const toggleAnimation = useWallStore((s) => s.toggleAnimation);

  const obj = objects.find((o) => o.id === selectedObjectId);
  if (!obj) return null;

  const cat = getCatalogItem(obj.type);

  return (
    <aside className="w-64 border-l border-slate-800 bg-slate-900/80 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-slate-800 px-4 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600/20 text-xs text-blue-400">
          {cat.icon}
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-200">Propiedades</h2>
          <p className="text-[10px] text-slate-500">{cat.name}</p>
        </div>
      </div>

      {/* Position */}
      <div className="border-b border-slate-800 px-4 py-3">
        <h3 className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          Posición
        </h3>
        <div className="space-y-2">
          <Field label="Eje X" unit="m">
            <input
              type="number"
              min={-20}
              max={20}
              step={0.1}
              value={Math.round(obj.position.x * 100) / 100}
              onChange={(e) => updateObject(obj.id, { position: { ...obj.position, x: Number(e.target.value) } })}
              className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </Field>
          <Field label="Eje Z" unit="m">
            <input
              type="number"
              min={-20}
              max={20}
              step={0.1}
              value={Math.round(obj.position.z * 100) / 100}
              onChange={(e) => updateObject(obj.id, { position: { ...obj.position, z: Number(e.target.value) } })}
              className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </Field>
          <Field label="Rotación" unit="°">
            <input
              type="number"
              min={-180}
              max={180}
              step={5}
              value={Math.round((obj.rotation * 180) / Math.PI)}
              onChange={(e) => updateObject(obj.id, { rotation: (Number(e.target.value) * Math.PI) / 180 })}
              className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </Field>
        </div>
      </div>

      {/* Dimensions */}
      <div className="border-b border-slate-800 px-4 py-3">
        <h3 className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Dimensiones
        </h3>
        <div className="space-y-2">
          <Field label="Ancho" unit="m">
            <input
              type="number"
              min={0.1}
              max={5}
              step={0.05}
              value={Math.round(obj.width * 100) / 100}
              onChange={(e) => updateObject(obj.id, { width: Number(e.target.value) })}
              className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </Field>
          <Field label="Alto" unit="m">
            <input
              type="number"
              min={0.1}
              max={5}
              step={0.05}
              value={Math.round(obj.height * 100) / 100}
              onChange={(e) => updateObject(obj.id, { height: Number(e.target.value) })}
              className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </Field>
          <Field label="Fondo" unit="m">
            <input
              type="number"
              min={0.1}
              max={5}
              step={0.05}
              value={Math.round(obj.depth * 100) / 100}
              onChange={(e) => updateObject(obj.id, { depth: Number(e.target.value) })}
              className="w-full rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1.5 text-sm text-slate-200 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </Field>
        </div>
      </div>

      {/* Color */}
      <div className="border-b border-slate-800 px-4 py-3">
        <h3 className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
          Apariencia
        </h3>
        <div>
          <label className="mb-1 block text-[11px] text-slate-400">Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={obj.color}
              onChange={(e) => updateObject(obj.id, { color: e.target.value })}
              className="h-8 w-10 cursor-pointer rounded-md border border-slate-700 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded"
            />
            <span className="rounded bg-slate-800 px-2 py-1 text-[11px] font-mono text-slate-400">
              {obj.color}
            </span>
          </div>
        </div>
      </div>

      {/* Animation toggle */}
      {cat.animationType !== "none" && (
        <div className="border-b border-slate-800 px-4 py-3">
          <h3 className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Animación
          </h3>
          <button
            onClick={() => toggleAnimation(obj.id)}
            className={`flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
              obj.animated
                ? "border-blue-700/40 bg-blue-950/20 text-blue-400 hover:bg-blue-950/30"
                : "border-slate-700/40 bg-slate-800/40 text-slate-400 hover:bg-slate-800/60 hover:text-slate-300"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {obj.animated
                ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                : <><polygon points="5 3 19 12 5 21 5 3"/></>
              }
            </svg>
            {obj.animated ? "Cerrar" : `Abrir ${cat.animationType === "door" ? "puerta" : "cajones"}`}
          </button>
        </div>
      )}

      {/* GLTF notice */}
      <div className="border-b border-slate-800 px-4 py-2">
        <p className="text-[10px] text-slate-700 text-center italic">
          Modelo 3D procedural · Reemplazable
        </p>
      </div>

      {/* Delete */}
      <div className="px-4 py-3">
        <button
          onClick={() => removeObject(obj.id)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-800/40 bg-red-950/20 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-950/40 hover:border-red-700/60 transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Eliminar objeto
        </button>
      </div>
    </aside>
  );
}

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
