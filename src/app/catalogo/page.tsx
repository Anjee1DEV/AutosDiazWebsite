import { Suspense } from "react";
import { inventory } from "@/data/inventory";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata = {
  title: "Catálogo | AUTOSDIAZ",
  description: "Explora nuestro inventario de seminuevos verificados en Mérida.",
};

export default function CatalogoPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Nuestros modelos</h1>
          <p>
            Seminuevos verificados, con revisión mecánica y legal. Filtra por
            presupuesto, marca o tipo de unidad y encuentra tu próximo auto.
          </p>
        </div>
      </section>
      <section className="section-tight">
        <div className="container">
          <Suspense fallback={<p className="eyebrow">Cargando catálogo...</p>}>
            <CatalogClient cars={inventory} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
