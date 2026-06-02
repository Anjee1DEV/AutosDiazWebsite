import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { inventory } from "@/data/inventory";
import { DELIVERIES } from "@/data/site-content";
import { moneyFormatter } from "@/lib/format";
import { SearchBand } from "@/components/home/SearchBand";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { BrandStrip } from "@/components/home/BrandStrip";
import { Reveal } from "@/components/site/Reveal";

export default function Home() {
  const featured = inventory.filter((c) => c.featured);
  const available = inventory.filter((c) => c.status === "Disponible");
  const heroCar = featured[0] ?? inventory[0];
  const [bigCar, midCar, smallCar] = featured.length >= 3 ? featured : inventory;
  const destaque = featured.find((c) => c.tagline) ?? heroCar;

  return (
    <>
      {/* ── HERO SHOWCASE (selector de vehículos del catálogo) ── */}
      <HeroShowcase cars={featured} />

      {/* ── MARCAS (logos) ── */}
      <BrandStrip />

      {/* ── INVENTARIO · BENTO ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="ed-head">
              <h2>El inventario</h2>
              <Link href="/catalogo" className="ed-link">
                Ver todo <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="bento">
              <Link href={`/vehiculo/${bigCar.id}`} className="bento-tile bento-feature">
                <Image src={bigCar.cover} alt={`${bigCar.brand} ${bigCar.model}`} fill sizes="60vw" className="cover-image" />
                <div className="scrim" />
                <div className="bento-body">
                  <span className="tag">
                    <ShieldCheck size={13} /> {bigCar.status}
                  </span>
                  <div className="bento-name">
                    {bigCar.brand} {bigCar.model}
                  </div>
                  <div className="bento-meta">
                    {bigCar.year} · {bigCar.version} · {bigCar.mileage.toLocaleString("es-MX")} km
                  </div>
                  <div className="bento-price">{moneyFormatter.format(bigCar.price)}</div>
                </div>
              </Link>

              <Link href={`/vehiculo/${midCar.id}`} className="bento-tile bento-small">
                <Image src={midCar.cover} alt={`${midCar.brand} ${midCar.model}`} fill sizes="40vw" className="cover-image" />
                <div className="scrim" />
                <div className="bento-body">
                  <div className="bento-name">
                    {midCar.brand} {midCar.model}
                  </div>
                  <div className="bento-meta">
                    {midCar.year} · {moneyFormatter.format(midCar.price)}
                  </div>
                </div>
              </Link>

              <Link href={`/vehiculo/${smallCar.id}`} className="bento-tile bento-small">
                <Image src={smallCar.cover} alt={`${smallCar.brand} ${smallCar.model}`} fill sizes="40vw" className="cover-image" />
                <div className="scrim" />
                <div className="bento-body">
                  <div className="bento-name">
                    {smallCar.brand} {smallCar.model}
                  </div>
                  <div className="bento-meta">
                    {smallCar.year} · {moneyFormatter.format(smallCar.price)}
                  </div>
                </div>
              </Link>

              <Link href="/catalogo" className="bento-tile bento-cta bento-wide">
                <div className="bento-body">
                  <span className="bento-cta-text">
                    {available.length} seminuevos verificados, listos en Mérida
                  </span>
                  <span className="arrow">
                    <ArrowUpRight size={24} />
                  </span>
                </div>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section className="bg-2 statement">
        <div className="container">
          <Reveal>
            <div className="statement-grid">
              <p>
                Cada unidad pasa por revisión mecánica y legal{" "}
                <span className="dim">antes de llegar a ti.</span>
              </p>
              <div className="statement-proof" aria-label="Puntos de revisión AUTOSDIAZ">
                <span>Qué revisamos antes de publicarla</span>
                <ul>
                  <li>Estado mecánico y kilometraje</li>
                  <li>Documentación y situación legal</li>
                  <li>Condición exterior e interior</li>
                  <li>Opciones de pago y financiamiento</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DESTACADO ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="ed-head">
              <h2>Destacado de la semana</h2>
            </div>
          </Reveal>
          <div className="feature-grid">
            <Reveal>
              <div className="feature-img">
                <Image
                  src={destaque.gallery[1] ?? destaque.cover}
                  alt={`${destaque.brand} ${destaque.model}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="cover-image"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card-dark feature-card">
                <h3>
                  {destaque.brand} {destaque.model} {destaque.year}
                </h3>
                <p>
                  {destaque.tagline ??
                    `${destaque.version} · ${destaque.mileage.toLocaleString("es-MX")} km · ${destaque.fuel}`}
                </p>
                <p style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 700 }}>
                  {moneyFormatter.format(destaque.price)}
                </p>
                <div className="feature-facts">
                  <span>{destaque.mileage.toLocaleString("es-MX")} km</span>
                  <span>{destaque.transmission}</span>
                  <span>{destaque.fuel}</span>
                </div>
                <Link href={`/vehiculo/${destaque.id}`} className="btn btn-brand">
                  Ver ficha completa
                  <span className="btn-ic">
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── BUSQUEDA ── */}
      <Reveal>
        <SearchBand />
      </Reveal>

      {/* ── ÚLTIMAS ENTREGAS ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="ed-head">
              <h2>Últimas entregas</h2>
              <span className="idx">Mérida, Yucatán</span>
            </div>
          </Reveal>
          <div className="models-grid">
            {DELIVERIES.slice(0, 3).map((d, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="model-card">
                  <div className="model-card-img">
                    <Image src={d.img} alt={`Entrega ${d.name}`} fill sizes="(max-width: 1024px) 50vw, 33vw" className="cover-image" />
                  </div>
                  <div className="model-card-body">
                    <h3>{d.car}</h3>
                    <p className="model-card-meta">
                      {d.name} · {d.city}
                    </p>
                    <p style={{ marginTop: "0.6rem", fontSize: "0.9rem", color: "var(--ink-2)" }}>
                      &ldquo;{d.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
