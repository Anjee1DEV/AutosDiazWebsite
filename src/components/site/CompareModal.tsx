"use client";

import { X } from "lucide-react";
import { moneyFormatter } from "@/lib/format";
import { useCompare } from "./CompareProvider";

export function CompareModal({ onClose }: { onClose: () => void }) {
  const { compareCars } = useCompare();

  const rows: { label: string; get: (c: (typeof compareCars)[number]) => string }[] = [
    { label: "Precio", get: (c) => moneyFormatter.format(c.price) },
    { label: "Año", get: (c) => String(c.year) },
    { label: "Kilometraje", get: (c) => `${c.mileage.toLocaleString("es-MX")} km` },
    { label: "Tipo", get: (c) => c.bodyType },
    { label: "Transmisión", get: (c) => c.transmission },
    { label: "Combustible", get: (c) => c.fuel },
    { label: "Tracción", get: (c) => c.traction },
  ];

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" aria-label="Cerrar" onClick={onClose}>
          <X size={18} />
        </button>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1.4rem" }}>
          Comparador de unidades
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Atributo</th>
                {compareCars.map((c) => (
                  <th key={c.id}>
                    {c.brand} {c.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  {compareCars.map((c) => (
                    <td key={c.id}>{row.get(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
