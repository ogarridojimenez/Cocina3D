"use client";

import { useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import { Scene } from "@/components/3d/Scene";
import { WallDrawMode } from "@/components/editor/WallDrawMode";
import { WallMenu } from "@/components/ui/WallMenu";
import { WallProperties } from "@/components/editor/WallProperties";
import { CatalogPanel } from "@/components/editor/CatalogPanel";
import { FurnitureManager } from "@/components/editor/FurnitureManager";
import { useWallStore, undo, redo } from "@/lib/store";
import { loadState, saveState } from "@/lib/persist";
import { exportGLTF, screenshotCanvas } from "@/lib/export";
import { ExportManager } from "./ExportManager";

export function EditorLayout() {
  const [wallMenuOpen, setWallMenuOpen] = useState(false);
  const selectWall = useWallStore((s) => s.selectWall);
  const selectObject = useWallStore((s) => s.selectObject);
  const selectedWallId = useWallStore((s) => s.selectedWallId);
  const selectedObjectId = useWallStore((s) => s.selectedObjectId);
  const gizmoMode = useWallStore((s) => s.gizmoMode);
  const setGizmoMode = useWallStore((s) => s.setGizmoMode);

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        selectWall(null);
        selectObject(null);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
      if (e.key === "r" && !e.ctrlKey && !e.metaKey && (selectedWallId || selectedObjectId)) {
        e.preventDefault();
        setGizmoMode(gizmoMode === "translate" ? "rotate" : "translate");
      }
    },
    [selectWall, selectObject, gizmoMode, setGizmoMode, selectedWallId, selectedObjectId]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Persistence
  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    const unsub = useWallStore.subscribe(() => saveState());
    return unsub;
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-950 text-white select-none">
      {/* Header / Menu Bar */}
      <header className="flex h-9 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-3 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-tight text-slate-200">
            Cocina3D
          </span>
          <span className="text-[10px] text-slate-600">|</span>
          <nav className="flex items-center gap-1 text-[11px]">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("cocina3d-export", { detail: { type: "new" } }))}
              className="rounded px-2 py-0.5 text-slate-500 hover:text-slate-300 transition-colors"
            >Nuevo</button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("cocina3d-export", { detail: { type: "save" } }))}
              className="rounded px-2 py-0.5 text-slate-500 hover:text-slate-300 transition-colors"
            >Guardar</button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("cocina3d-export", { detail: { type: "load" } }))}
              className="rounded px-2 py-0.5 text-slate-500 hover:text-slate-300 transition-colors"
            >Abrir</button>
          </nav>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Selection indicator */}
          {(selectedWallId || selectedObjectId) && (
            <span className="text-[10px] text-blue-400 mr-2">
              {selectedWallId ? `Pared #${selectedWallId.split("-")[1]}` : "Objeto"}
            </span>
          )}
          {/* Undo */}
          <button
            onClick={() => undo()}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition"
            title="Deshacer (Ctrl+Z)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
          </button>
          {/* Redo */}
          <button
            onClick={() => redo()}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition"
            title="Rehacer (Ctrl+Y)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
          <span className="w-px h-4 bg-slate-700/50 mx-1" />
          {/* Export GLTF */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("cocina3d-export", { detail: { type: "gltf" } }))}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition"
            title="Exportar GLTF"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
          {/* Screenshot */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("cocina3d-export", { detail: { type: "screenshot" } }))}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition"
            title="Captura de pantalla"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </button>
          {/* Gizmo mode */}
          {(selectedObjectId || selectedWallId) && (
            <span className="w-px h-4 bg-slate-700/50 mx-1" />
          )}
          {(selectedObjectId || selectedWallId) && (
            <>
              <button
                onClick={() => setGizmoMode("translate")}
                className={`rounded-md p-1.5 transition ${gizmoMode === "translate" ? "bg-blue-600/20 text-blue-400" : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"}`}
                title="Mover (R)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/>
                </svg>
              </button>
              <button
                onClick={() => setGizmoMode("rotate")}
                className={`rounded-md p-1.5 transition ${gizmoMode === "rotate" ? "bg-blue-600/20 text-blue-400" : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"}`}
                title="Rotar (R)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Catalog Panel */}
        <CatalogPanel />

        {/* Toolbar */}
        <div className="flex w-11 flex-col items-center gap-1 border-r border-slate-800 bg-slate-900/50 py-2">
          <button
            onClick={() => { selectWall(null); selectObject(null); }}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition"
            title="Seleccionar (Escape)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/>
            </svg>
          </button>
          <span className="w-5 border-t border-slate-700/50" />
          <button
            onClick={() => setWallMenuOpen(true)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition"
            title="Añadir pared"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2"/>
              <line x1="9" y1="12" x2="15" y2="12"/><line x1="12" y1="9" x2="12" y2="15"/>
            </svg>
          </button>
        </div>

        {/* 3D Canvas */}
        <main className="flex-1">
          <ErrorBoundary
            fallback={
              <div className="flex h-full items-center justify-center bg-slate-950 text-slate-500">
                <div className="text-center">
                  <p className="text-lg">⚠️</p>
                  <p className="mt-2 text-sm">Error en la escena 3D</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs text-white hover:bg-blue-500"
                  >
                    Recargar
                  </button>
                </div>
              </div>
            }
          >
            <Canvas
              gl={{ antialias: true, preserveDrawingBuffer: true }}
              dpr={[1, 1.5]}
              camera={{ position: [8, 6, 8], fov: 45, near: 0.1, far: 100 }}
              onPointerMissed={() => {
                selectWall(null);
                selectObject(null);
              }}
            >
              <Scene>
                <WallDrawMode />
                <FurnitureManager />
                <ExportManager />
              </Scene>
            </Canvas>
          </ErrorBoundary>
        </main>

        {/* Properties Panel */}
        <WallProperties />
      </div>

      {/* Wall Creation Modal */}
      {wallMenuOpen && <WallMenu onClose={() => setWallMenuOpen(false)} />}
    </div>
  );
}
