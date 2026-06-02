"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ArrowLeft, Calculator, ChevronDown, Maximize2 } from "lucide-react";
import type { Car } from "@/data/inventory";
import { moneyFormatter, buildWhatsAppUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { GalleryLightbox } from "./GalleryLightbox";

type GalleryCat = "todas" | "exterior" | "interior";

const GALLERY_AUTOPLAY_MS = 4800;

const isInterior = (src: string) => /int/i.test(src);

export function VehicleDetail({ car }: { car: Car }) {
  const motionRoot = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState(0);
  const [cat, setCat] = useState<GalleryCat>("todas");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const gallery = useMemo(() => {
    if (cat === "exterior") return car.gallery.filter((g) => !isInterior(g));
    if (cat === "interior") return car.gallery.filter((g) => isInterior(g));
    return car.gallery;
  }, [car.gallery, cat]);

  const hasInterior = car.gallery.some(isInterior);
  const hasExterior = car.gallery.some((g) => !isInterior(g));
  const safePhoto = Math.max(0, Math.min(photo, Math.max(gallery.length - 1, 0)));
  const activeImage = gallery[safePhoto] ?? car.cover;

  useEffect(() => {
    if (gallery.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const autoplay = window.setInterval(() => {
      setPhoto((current) => (current + 1) % gallery.length);
    }, GALLERY_AUTOPLAY_MS);

    return () => window.clearInterval(autoplay);
  }, [gallery.length, cat]);

  useEffect(() => {
    if (!motionRoot.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "expo.out", duration: 0.95 },
      });

      timeline
        .fromTo(
          ".vehicle-intro > *",
          { autoAlpha: 0, y: 28, filter: "blur(12px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.07,
            clearProps: "opacity,visibility,transform,filter",
          },
        )
        .fromTo(
          ".vehicle-hero-visual",
          { autoAlpha: 0, y: 34, scale: 0.985, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            clearProps: "opacity,visibility,transform,filter",
          },
          "<0.08",
        )
        .fromTo(
          ".vehicle-tabs-nav, .vehicle-section-head, .gallery-filter button, .gallery-main, .gallery-thumb, .vehicle-info-grid .vehicle-content-section",
          { autoAlpha: 0, y: 22, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.035,
            clearProps: "opacity,visibility,transform,filter",
          },
          "-=0.45",
        );
    }, motionRoot);

    return () => ctx.revert();
  }, [car.id]);

  const specs: { k: string; v: string }[] = [
    { k: "Motor", v: car.engine ?? car.fuel },
    { k: "Potencia", v: car.power ?? "N/D" },
    { k: "Transmisión", v: car.transmission },
    { k: "Tracción", v: car.traction },
    { k: "Combustible", v: car.fuel },
    { k: "Kilometraje", v: `${car.mileage.toLocaleString("es-MX")} km` },
    { k: "Carrocería", v: car.bodyType },
    { k: "Color", v: car.color },
    { k: "Lugares", v: car.seats ? String(car.seats) : "5" },
  ];

  return (
    <div ref={motionRoot} className="vehicle-detail-page">
      {/* HERO */}
      <section className="hero">
        <div className="container vehicle-hero">
          <div className="vehicle-intro">
            <Link className="vehicle-back-link" href="/catalogo">
              <ArrowLeft size={16} /> Volver al catálogo
            </Link>
            <p className="eyebrow">{car.brand}</p>
            <h1>{car.model}</h1>
            <div className="vehicle-meta">
              <span>{car.year}</span>
              <span>{car.mileage.toLocaleString("es-MX")} km</span>
              <span>{car.version}</span>
            </div>
            <p className="vehicle-price">{moneyFormatter.format(car.price)}</p>
            <div className="vehicle-actions">
              <a className="btn btn-brand btn-lg" href="#cotizar">
                <Calculator size={17} /> Cotizar mensualidad
              </a>
              <a
                className="btn btn-dark btn-lg"
                href={buildWhatsAppUrl(
                  `Hola, me interesa el ${car.brand} ${car.model} ${car.year}.`,
                )}
              >
                <WhatsAppIcon size={16} /> Contactar por WhatsApp
                <span className="btn-ic">
                  <ChevronDown size={15} style={{ transform: "rotate(-90deg)" }} />
                </span>
              </a>
            </div>
          </div>
          <div className="bezel vehicle-hero-visual">
            <div className="vehicle-hero-art">
              <Image
                src={car.cover}
                alt={`${car.brand} ${car.model}`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="cover-image"
                priority
              />
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <ChevronDown size={22} />
        </div>
      </section>

      {/* FICHA */}
      <section className="vehicle-detail-flow">
        <div className="container vehicle-tabs-layout">
          <nav className="vehicle-tabs-nav" aria-label="Secciones del vehículo">
            <div className="car-label">
              <span className="eyebrow">{car.brand}</span>
              <strong>{car.model}</strong>
            </div>
            <a href="#imagenes">Imágenes</a>
            <a href="#ficha-tecnica">Ficha técnica</a>
            <a href="#detalles">
              Detalles
            </a>
            <a href="#cotizar">Cotizar</a>
          </nav>

          <div className="vehicle-sections">
            <section id="imagenes" className="vehicle-content-section vehicle-gallery-section">
              <div className="vehicle-section-head">
                <span>01</span>
                <h2>Imágenes</h2>
                <p>Explora exterior e interior sin recortes forzados.</p>
              </div>

              <div>
                <div className="gallery-filter">
                  <button
                    className={clsx(cat === "todas" && "active")}
                    onClick={() => {
                      setCat("todas");
                      setPhoto(0);
                    }}
                  >
                    Todas <em>{car.gallery.length}</em>
                  </button>
                  {hasExterior && (
                    <button
                      className={clsx(cat === "exterior" && "active")}
                      onClick={() => {
                        setCat("exterior");
                        setPhoto(0);
                      }}
                    >
                      Exterior{" "}
                      <em>{car.gallery.filter((g) => !isInterior(g)).length}</em>
                    </button>
                  )}
                  {hasInterior && (
                    <button
                      className={clsx(cat === "interior" && "active")}
                      onClick={() => {
                        setCat("interior");
                        setPhoto(0);
                      }}
                    >
                      Interior{" "}
                      <em>{car.gallery.filter(isInterior).length}</em>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="gallery-main"
                  onClick={() => setLightbox(safePhoto)}
                  aria-label="Ampliar foto"
                >
                  <Image
                    src={activeImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="gallery-backdrop-image"
                    aria-hidden="true"
                  />
                  <Image
                    key={`${cat}-${safePhoto}-${activeImage}`}
                    src={activeImage}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="cover-image gallery-focus-image"
                  />
                  <span className="gallery-progress" aria-hidden="true">
                    <span key={`${cat}-${safePhoto}`} style={{ animationDuration: `${GALLERY_AUTOPLAY_MS}ms` }} />
                  </span>
                  <span className="gallery-zoom">
                    <Maximize2 size={16} /> Ver galería completa
                  </span>
                </button>

                <div className="gallery-thumbs">
                  {gallery.map((img, i) => (
                    <button
                      key={`${car.id}-${i}`}
                      className={clsx("gallery-thumb", safePhoto === i && "active")}
                      onClick={() => setPhoto(i)}
                      onDoubleClick={() => setLightbox(i)}
                    >
                      <Image src={img} alt={`Foto ${i + 1}`} fill sizes="120px" className="cover-image" />
                    </button>
                  ))}
                </div>
              </div>

            </section>

            <div className="vehicle-info-grid">
              <section id="ficha-tecnica" className="vehicle-content-section vehicle-spec-section">
                <div className="vehicle-section-head">
                  <span>02</span>
                  <h2>Ficha técnica</h2>
                  <p>Datos clave para comparar la unidad antes de agendar una visita.</p>
                </div>
                <div className="spec-table">
                  {specs.map((s) => (
                    <div key={s.k} className="spec-cell">
                      <div className="k">{s.k}</div>
                      <div className="v">{s.v}</div>
                    </div>
                  ))}
                </div>

              </section>

              <section id="detalles" className="vehicle-content-section vehicle-highlights-section">
                <div className="vehicle-section-head">
                  <span>03</span>
                  <h2>Detalles</h2>
                  <p>Lo más importante de esta unidad, resumido para decidir rápido.</p>
                </div>
                <ul className="detail-list">
                  {car.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <GalleryLightbox
          images={gallery}
          startIndex={Math.min(lightbox, gallery.length - 1)}
          label={`${car.brand} ${car.model} · ${cat === "todas" ? "Galería" : cat}`}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
