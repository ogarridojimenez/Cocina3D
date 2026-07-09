"use client";

import { useState, useMemo } from "react";
import { useWallStore } from "@/lib/store";
import { calculateTotal } from "@/data/prices";

interface BudgetPanelProps {
  onClose: () => void;
}

export default function BudgetPanel({ onClose }: BudgetPanelProps) {
  const objects = useWallStore((s) => s.objects);
  const walls = useWallStore((s) => s.walls);
  const [showInstallation, setShowInstallation] = useState(true);

  const budget = useMemo(() => calculateTotal(objects), [objects]);

  const wallCost = walls.length * 85; // € per wall (materials + labor)
  const wallInstallation = walls.length * 40;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-[500px] max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Presupuesto</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        </div>

        <div className="p-4 space-y-4">
          {/* Resumen */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 rounded p-3">
              <div className="text-blue-600 font-medium">Objetos</div>
              <div className="text-2xl font-bold text-blue-800">{objects.length}</div>
            </div>
            <div className="bg-green-50 rounded p-3">
              <div className="text-green-600 font-medium">Paredes</div>
              <div className="text-2xl font-bold text-green-800">{walls.length}</div>
            </div>
          </div>

          {/* Tabla de objetos */}
          {budget.items.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Objetos</h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-1">Producto</th>
                    <th className="py-1 text-right">Cant.</th>
                    <th className="py-1 text-right">€/ud</th>
                    <th className="py-1 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {budget.items.map((item, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-1.5">{item.label}</td>
                      <td className="py-1.5 text-right">{item.qty}</td>
                      <td className="py-1.5 text-right">{item.unitPrice.toFixed(2)}</td>
                      <td className="py-1.5 text-right font-medium">{item.subtotal.toFixed(2)}€</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-medium">
                    <td colSpan={3} className="py-2 text-right">Total productos:</td>
                    <td className="py-2 text-right">{budget.totalProducts.toFixed(2)}€</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Paredes */}
          {walls.length > 0 && (
            <div className="text-sm">
              <h3 className="font-medium text-gray-700 mb-1">Paredes ({walls.length})</h3>
              <div className="text-gray-500">Coste unitario: 85€ (materiales) + 40€ (instalación)</div>
            </div>
          )}

          {/* Instalación */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="showInstall" checked={showInstallation} onChange={(e) => setShowInstallation(e.target.checked)} className="rounded" />
            <label htmlFor="showInstall" className="text-sm text-gray-600">Incluir instalación</label>
          </div>

          {/* Total */}
          <div className="bg-gray-100 rounded-lg p-4 space-y-1">
            {showInstallation && (
              <>
                <div className="flex justify-between text-sm">
                  <span>Productos:</span>
                  <span>{budget.totalProducts.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Instalación objetos:</span>
                  <span>{budget.totalInstallation.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Paredes (material):</span>
                  <span>{(wallCost).toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Paredes (instalación):</span>
                  <span>{(wallInstallation).toFixed(2)}€</span>
                </div>
                <hr className="my-1" />
              </>
            )}
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{(budget.grandTotal + wallCost + (showInstallation ? budget.totalInstallation + wallInstallation : 0)).toFixed(2)}€</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cerrar</button>
          <button onClick={() => window.print()} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Imprimir</button>
        </div>
      </div>
    </div>
  );
}
