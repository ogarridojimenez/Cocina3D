"use client";

import { useState } from "react";
import { useWallStore } from "@/lib/store";

interface Props {
  onClose: () => void;
}

const GROSORES = [0.05, 0.10, 0.15, 0.20];

export function WallMenu({ onClose }: Props) {
  const setDrawMode = useWallStore((s) => s.setDrawMode);

  const [altura, setAltura] = useState(2.4);
  const [largo, setLargo] = useState(2);
  const [grosor, setGrosor] = useState(0.1);
  const [modoDibujo, setModoDibujo] = useState<"point" | "drag">("drag");

  const empezarDibujo = () => {
    sessionStorage.setItem(
      "wallConfig",
      JSON.stringify({ altura, largo, grosor, modoDibujo })
    );
    setDrawMode(modoDibujo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-96 animate-in rounded-xl border border-slate-700/60 bg-slate-900 shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-lg">
            🧱
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Nueva Pared</h2>
            <p className="text-[11px] text-slate-500">Define las dimensiones y el modo de dibujo</p>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 px-5 py-4">
          {/* Altura */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-slate-400 uppercase">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><polyline points="9 18 12 21 15 18"/></svg>
              Altura
            </label>
            <div className="relative">
              <input
                type="number"
                min={0.1}
                max={10}
                step={0.1}
                value={altura}
                onChange={(e) => setAltura(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 pr-10 text-sm text-slate-200 placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">m</span>
            </div>
          </div>

          {/* Largo (solo arrastre) */}
          {modoDibujo === "drag" && (
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-slate-400 uppercase">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><polyline points="18 9 21 12 18 15"/></svg>
                Largo
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0.1}
                  max={50}
                  step={0.1}
                  value={largo}
                  onChange={(e) => setLargo(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 pr-10 text-sm text-slate-200 placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">m</span>
              </div>
            </div>
          )}

          {/* Grosor */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-slate-400 uppercase">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="7" width="18" height="10" rx="2"/></svg>
              Grosor
            </label>
            <div className="flex gap-1.5">
              {GROSORES.map((g) => (
                <button
                  key={g}
                  onClick={() => setGrosor(g)}
                  className={`flex-1 rounded-lg border py-2 text-sm font-medium transition ${
                    grosor === g
                      ? "border-blue-600 bg-blue-600/20 text-blue-400"
                      : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                  }`}
                >
                  {Math.round(g * 100)}
                  <span className="block text-[10px] font-normal opacity-50">cm</span>
                </button>
              ))}
            </div>
          </div>

          {/* Modo de dibujo */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-slate-400 uppercase">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 11.5-11.5z"/></svg>
              Modo de dibujo
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setModoDibujo("drag")}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                  modoDibujo === "drag"
                    ? "border-blue-600 bg-blue-600/20 text-blue-400"
                    : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                }`}
              >
                <span className="block text-lg">↔</span>
                Arrastre
              </button>
              <button
                onClick={() => setModoDibujo("point")}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                  modoDibujo === "point"
                    ? "border-blue-600 bg-blue-600/20 text-blue-400"
                    : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                }`}
              >
                <span className="block text-lg">· ·</span>
                Punto a punto
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 px-5 py-3">
          <p className="text-[11px] text-slate-600">
            {modoDibujo === "drag"
              ? "Click + arrastra en el grid"
              : "Click para puntos · Enter para cerrar"}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-1.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-300 transition"
            >
              Cancelar
            </button>
            <button
              onClick={empezarDibujo}
              className="rounded-lg bg-blue-600 px-5 py-1.5 text-sm font-medium text-white hover:bg-blue-500 transition"
            >
              Dibujar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
