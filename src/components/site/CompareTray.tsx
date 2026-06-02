"use client";

import { X } from "lucide-react";
import { useCompare } from "./CompareProvider";

export function CompareTray() {
  const { compareCars, remove, clear, openModal } = useCompare();
  if (compareCars.length === 0) return null;

  return (
    <aside className="compare-tray">
      <div className="container compare-tray-inner">
        <p>{compareCars.length} unidad(es) en comparación</p>
        <div className="compare-chips">
          {compareCars.map((car) => (
            <button key={car.id} type="button" onClick={() => remove(car.id)}>
              {car.brand} {car.model} <X size={13} />
            </button>
          ))}
        </div>
        <div className="compare-actions">
          <button type="button" className="btn btn-outline" onClick={clear}>
            Limpiar
          </button>
          <button
            type="button"
            className="btn btn-brand"
            disabled={compareCars.length < 2}
            onClick={openModal}
          >
            Ver comparación
          </button>
        </div>
      </div>
    </aside>
  );
}
