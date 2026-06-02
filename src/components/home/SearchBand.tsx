"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { inventory } from "@/data/inventory";

const BRANDS = Array.from(new Set(inventory.map((c) => c.brand)));
const TYPES = Array.from(new Set(inventory.map((c) => c.bodyType)));

export function SearchBand() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [max, setMax] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (brand) params.set("marca", brand);
    if (type) params.set("tipo", type);
    if (max) params.set("max", max);
    router.push(`/catalogo${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section className="section-tight">
      <div className="container">
        <div className="search-band">
          <h2>¿Buscas un modelo en específico?</h2>
          <p>
            Filtra por marca, tipo o presupuesto y te llevamos directo a las
            unidades disponibles en nuestro catálogo.
          </p>
          <form className="search-row" onSubmit={submit}>
            <input
              className="input"
              placeholder="Modelo o marca"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <select
              className="select"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Marca</option>
              {BRANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <select
              className="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Tipo</option>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              className="select"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            >
              <option value="">Presupuesto</option>
              <option value="300000">Hasta $300,000</option>
              <option value="400000">Hasta $400,000</option>
              <option value="500000">Hasta $500,000</option>
              <option value="600000">Hasta $600,000</option>
            </select>
            <button type="submit" className="btn btn-dark">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
