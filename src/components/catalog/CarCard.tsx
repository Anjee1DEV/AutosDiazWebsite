"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Check, GitCompare } from "lucide-react";
import type { Car } from "@/data/inventory";
import { moneyFormatter } from "@/lib/format";
import { useCompare } from "@/components/site/CompareProvider";

export function CarCard({ car }: { car: Car }) {
  const { isComparing, toggle } = useCompare();
  const comparing = isComparing(car.id);

  return (
    <article className="car-card">
      <span className="status-tag">{car.status}</span>
      <button
        type="button"
        className={clsx("compare-btn", comparing && "active")}
        onClick={() => toggle(car.id)}
      >
        {comparing ? <Check size={13} /> : <GitCompare size={13} />}
        {comparing ? "Comparando" : "Comparar"}
      </button>

      <Link href={`/vehiculo/${car.id}`} className="car-card-img">
        <Image
          src={car.cover}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="cover-image"
        />
      </Link>

      <div className="car-card-body">
        <h3>
          {car.brand} {car.model} {car.year}
        </h3>
        <div className="car-card-specs">
          <span>{car.mileage.toLocaleString("es-MX")} km</span>
          <span>{car.transmission}</span>
          <span>{car.fuel}</span>
          <span>{car.bodyType}</span>
        </div>
        <p className="car-card-price">{moneyFormatter.format(car.price)}</p>
        <div className="car-card-actions">
          <Link href={`/vehiculo/${car.id}`} className="btn btn-outline">
            Ver detalle
          </Link>
          <Link href={`/vehiculo/${car.id}#cotizar`} className="btn btn-dark">
            Cotizar
          </Link>
        </div>
      </div>
    </article>
  );
}
