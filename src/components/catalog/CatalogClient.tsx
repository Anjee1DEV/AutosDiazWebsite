"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { Car } from "@/data/inventory";
import { moneyFormatter } from "@/lib/format";
import { CarCard } from "./CarCard";

const PAGE_SIZE = 9;

export function CatalogClient({ cars }: { cars: Car[] }) {
  const params = useSearchParams();

  const maxInventoryPrice = useMemo(
    () => Math.max(...cars.map((c) => c.price)),
    [cars],
  );
  const brands = useMemo(
    () => Array.from(new Set(cars.map((c) => c.brand))),
    [cars],
  );
  const types = useMemo(
    () => Array.from(new Set(cars.map((c) => c.bodyType))),
    [cars],
  );

  const [search, setSearch] = useState(params.get("q") ?? "");
  const [brand, setBrand] = useState(params.get("marca") ?? "Todos");
  const [type, setType] = useState(params.get("tipo") ?? "Todos");
  const [transmission, setTransmission] = useState("Todas");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(
    Number(params.get("max")) || maxInventoryPrice,
  );
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const list = cars.filter((c) => {
      const mSearch =
        !q || `${c.brand} ${c.model} ${c.version}`.toLowerCase().includes(q);
      const mBrand = brand === "Todos" || c.brand === brand;
      const mType = type === "Todos" || c.bodyType === type;
      const mTrans = transmission === "Todas" || c.transmission === transmission;
      const mPrice = c.price <= maxPrice;
      return mSearch && mBrand && mType && mTrans && mPrice;
    });
    return list.sort((a, b) => {
      switch (sortBy) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "yearDesc":
          return b.year - a.year;
        case "kmAsc":
          return a.mileage - b.mileage;
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
  }, [cars, search, brand, type, transmission, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const resetPage = () => setPage(1);

  const resetFilters = () => {
    setSearch("");
    setBrand("Todos");
    setType("Todos");
    setTransmission("Todas");
    setSortBy("featured");
    setMaxPrice(maxInventoryPrice);
    setPage(1);
  };

  return (
    <div className="catalog-layout">
      {/* Filters sidebar */}
      <details className="filters-card" open>
        <summary>
          <span>Filtros</span>
          <em>{filtered.length} unidades</em>
        </summary>
        <h3>Filtros</h3>

        <label className="field-label">
          Buscar
          <span style={{ position: "relative", display: "block" }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
              }}
            />
            <input
              className="input"
              style={{ paddingLeft: "2.2rem" }}
              placeholder="Marca, modelo..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
            />
          </span>
        </label>

        <label className="field-label">
          Marca
          <select
            className="select"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              resetPage();
            }}
          >
            <option>Todos</option>
            {brands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>

        <label className="field-label">
          Tipo
          <select
            className="select"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              resetPage();
            }}
          >
            <option>Todos</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="field-label">
          Transmisión
          <select
            className="select"
            value={transmission}
            onChange={(e) => {
              setTransmission(e.target.value);
              resetPage();
            }}
          >
            <option>Todas</option>
            <option>Automática</option>
            <option>Manual</option>
          </select>
        </label>

        <div className="field-label">
          <div className="price-head">
            <span>Precio máximo</span>
            <strong>{moneyFormatter.format(maxPrice)}</strong>
          </div>
          <input
            type="range"
            min={0}
            max={maxInventoryPrice}
            step={10000}
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              resetPage();
            }}
          />
        </div>

        <label className="field-label">
          Ordenar
          <select
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Destacados</option>
            <option value="priceAsc">Precio menor</option>
            <option value="priceDesc">Precio mayor</option>
            <option value="yearDesc">Más recientes</option>
            <option value="kmAsc">Menor kilometraje</option>
          </select>
        </label>

        <div className="filter-actions">
          <button type="button" className="btn btn-outline" onClick={resetFilters}>
            Limpiar
          </button>
          <a className="btn btn-dark" href="#resultados-catalogo">
            Ver resultados
          </a>
        </div>
      </details>

      {/* Results */}
      <div id="resultados-catalogo" className="catalog-results">
        <div className="catalog-head">
          <p className="eyebrow">{filtered.length} unidades encontradas</p>
        </div>

        <div className="cars-grid">
          {pageItems.length > 0 ? (
            pageItems.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <div className="empty">
              <p>No encontramos unidades con esos filtros.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                className={p === currentPage ? "active" : ""}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
