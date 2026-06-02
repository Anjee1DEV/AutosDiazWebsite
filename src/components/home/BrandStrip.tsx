import Image from "next/image";
import Link from "next/link";
import { inventory } from "@/data/inventory";

const SVG_BRANDS = new Set(["seat", "honda", "suzuki", "hyundai"]);

function logoFor(brand: string) {
  const slug = brand.toLowerCase() === "mercedes" ? "mercedes-benz" : brand.toLowerCase();
  return `/brands/${slug}.${SVG_BRANDS.has(slug) ? "svg" : "png"}`;
}

export function BrandStrip() {
  const brands = Array.from(new Set(inventory.map((c) => c.brand)));
  return (
    <section className="brand-strip">
      <div className="container">
        <p className="brand-strip-label">Marcas disponibles</p>
        <div className="brand-strip-row">
          {brands.map((b) => (
            <Link
              key={b}
              href={`/catalogo?marca=${encodeURIComponent(b)}`}
              className="brand-logo-link"
              title={b}
            >
              <Image
                src={logoFor(b)}
                alt={b}
                width={96}
                height={30}
                className="brand-logo-img"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
