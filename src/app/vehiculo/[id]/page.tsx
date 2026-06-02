import { notFound } from "next/navigation";
import { inventory } from "@/data/inventory";
import { VehicleDetail } from "@/components/vehicle/VehicleDetail";
import { Cotizador } from "@/components/vehicle/Cotizador";

export function generateStaticParams() {
  return inventory.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = inventory.find((c) => c.id === id);
  if (!car) return { title: "Vehículo | AUTOSDIAZ" };
  return {
    title: `${car.brand} ${car.model} ${car.year} | AUTOSDIAZ`,
    description: car.highlights.slice(0, 2).join(". "),
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = inventory.find((c) => c.id === id);
  if (!car) notFound();

  return (
    <>
      <VehicleDetail car={car} />
      <Cotizador car={car} />
    </>
  );
}
