"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowRight, Gauge, Cog, Calendar } from "lucide-react";
import type { Car } from "@/data/inventory";
import { moneyFormatter } from "@/lib/format";

export function HeroShowcase({ cars }: { cars: Car[] }) {
  const list = cars.length ? cars : [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const car = list[active];

  useEffect(() => {
    if (paused || list.length <= 1) return;
    const t = setInterval(() => setActive((i) => (i + 1) % list.length), 6000);
    return () => clearInterval(t);
  }, [paused, list.length]);

  if (!car) return null;

  return (
    <section
      className="showcase"
      style={{ background: "radial-gradient(70% 90% at 62% 40%, #ffffff 0%, #eef0f3 52%, #e4e7ec 100%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container showcase-inner">
        {/* Info */}
        <div className="showcase-info" key={car.id}>
          <span className="hero-ed-eyebrow">Showroom AUTOSDIAZ</span>
          <h1 className="showcase-name">
            <span className="showcase-brand">{car.brand}</span>
            {car.model}
          </h1>
          <p className="showcase-tagline">
            {car.tagline ?? `${car.version} · ${car.year}`}
          </p>

          <div className="showcase-specs">
            <div className="spec">
              <Gauge size={16} />
              <div>
                <strong>{car.mileage.toLocaleString("es-MX")}</strong>
                <span>km</span>
              </div>
            </div>
            <div className="spec">
              <Cog size={16} />
              <div>
                <strong>{car.transmission}</strong>
                <span>Transmisión</span>
              </div>
            </div>
            <div className="spec">
              <Calendar size={16} />
              <div>
                <strong>{car.year}</strong>
                <span>Modelo</span>
              </div>
            </div>
            <div className="spec spec-price">
              <div>
                <strong>{moneyFormatter.format(car.price)}</strong>
                <span>Precio</span>
              </div>
            </div>
          </div>

          <div className="showcase-ctas">
            <Link href={`/vehiculo/${car.id}`} className="btn btn-dark btn-lg">
              Ver este auto
              <span className="btn-ic">
                <ArrowRight size={16} />
              </span>
            </Link>
            <Link href="/catalogo" className="btn btn-outline btn-lg">
              Ver catálogo completo
            </Link>
          </div>
        </div>

        {/* Stage — framed photos, active visible */}
        <div className="showcase-stage">
          {list.map((c, i) => (
            <div
              key={c.id}
              className={clsx("showcase-car", i === active && "active")}
              aria-hidden={i !== active}
            >
              <Image
                src={c.cover}
                alt={`${c.brand} ${c.model}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="showcase-img"
                priority={i === 0}
              />
            </div>
          ))}
          <span className="showcase-badge">{car.status}</span>
        </div>
      </div>

      {/* Selector */}
      <div className="container">
        <div className="showcase-selector">
          {list.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={clsx("showcase-pick", i === active && "active")}
              onClick={() => setActive(i)}
              aria-label={`Mostrar ${c.brand} ${c.model}`}
              aria-pressed={i === active}
            >
              <span className="pick-thumb">
                <Image src={c.cover} alt="" fill sizes="80px" className="pick-img" />
              </span>
              <span className="pick-label">
                <em>{c.brand}</em>
                {c.model}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
