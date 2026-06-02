export type CarStatus = "Disponible" | "Apartado" | "En preparacion";
export type FuelType = "Gasolina" | "Diesel" | "Híbrido";
export type BodyType = "Sedán" | "SUV" | "Pickup" | "Hatchback";
export type Transmission = "Manual" | "Automática";

export interface Car {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuel: FuelType;
  bodyType: BodyType;
  traction: string;
  color: string;
  city: string;
  featured: boolean;
  status: CarStatus;
  cover: string;
  gallery: string[];
  highlights: string[];
  /* Optional ficha técnica fields (vehicle detail) */
  engine?: string;
  power?: string;
  seats?: number;
  tagline?: string;
}

export type LeadStage = "Nuevo" | "Seguimiento" | "Cita" | "Cerrado";

export interface Lead {
  id: string;
  customer: string;
  channel: "WhatsApp" | "Instagram" | "Facebook" | "Web";
  interest: string;
  budget: number;
  stage: LeadStage;
  createdAt: string;
}

/* ── Shared galleries (reused for mock catalog units) ── */
const GAL_SUV = [
  "/frontal.jpg",
  "/exterior1.jpg",
  "/exterior2.jpg",
  "/exterior3.jpg",
  "/exterior4.jpg",
  "/trasero.jpg",
  "/interior1.jpg",
  "/interior2.jpg",
  "/interior3.jpg",
];
const GAL_SEDAN = [
  "/DMain.jpg",
  "/DFrente1.jpg",
  "/Dfrente2.jpg",
  "/Dexterior4.jpg",
  "/Dinterio1.jpg",
  "/Dinterior2.jpg",
  "/Dinterior3.jpg",
];
const GAL_SEDAN_2 = [
  "/versamain.jpg",
  "/verext1.jpg",
  "/verext2.jpg",
  "/verext3.jpg",
  "/verext4.jpg",
  "/verint1.jpg",
  "/verint2.jpg",
  "/verin4.jpg",
];
const GAL_HATCH = [
  "/MGMain.jpg",
  "/MGext1.jpg",
  "/MGext2.jpg",
  "/MGExt3.jpg",
  "/MGext4.jpg",
  "/MGint1.jpg",
  "/MGint2.jpg",
  "/MGint3.jpg",
];
const GAL_PICKUP = [
  "/pickmain.jpg",
  "/PickupEXT1.jpg",
  "/pickext2.jpg",
  "/pickext3.jpg",
  "/pickext4.jpg",
  "/pickint1.jpg",
  "/pickint2.jpg",
  "/pickint4.jpg",
];

const galleryFor = (type: BodyType, alt = false): string[] => {
  switch (type) {
    case "SUV":
      return GAL_SUV;
    case "Pickup":
      return GAL_PICKUP;
    case "Hatchback":
      return GAL_HATCH;
    default:
      return alt ? GAL_SEDAN_2 : GAL_SEDAN;
  }
};

/* ── Featured units (real photography — used in the hero showcase) ── */
const featuredCars: Car[] = [
  {
    id: "byd-gm4-2024",
    brand: "BYD",
    model: "GM4",
    version: "Comfort",
    year: 2024,
    price: 489000,
    mileage: 8200,
    transmission: "Automática",
    fuel: "Híbrido",
    bodyType: "SUV",
    traction: "4x2",
    color: "Gris",
    city: "Mérida",
    featured: true,
    status: "Disponible",
    cover: "/frontal.jpg",
    gallery: GAL_SUV,
    highlights: [
      "Híbrido enchufable",
      "Pantalla central 12.8 pulgadas",
      "Casi nuevo, 8,200 km",
      "Garantía de agencia vigente",
      "Climatizador automático",
      "Camara de reversa y sensores",
      "Llantas de aleacion",
      "Conectividad Apple CarPlay / Android Auto",
    ],
    engine: "Híbrido 1.5L",
    power: "184 hp",
    seats: 5,
    tagline:
      "SUV híbrido casi nuevo, con garantía de agencia vigente y el equipamiento más completo de su segmento.",
  },
  {
    id: "ford-f150-xl-2022",
    brand: "Ford",
    model: "F-150",
    version: "XL",
    year: 2022,
    price: 549000,
    mileage: 42000,
    transmission: "Automática",
    fuel: "Gasolina",
    bodyType: "Pickup",
    traction: "4x4",
    color: "Blanco",
    city: "Mérida",
    featured: true,
    status: "Disponible",
    cover: "/pickmain.jpg",
    gallery: GAL_PICKUP,
    highlights: [
      "Motor V6 potente",
      "Tracción 4x4",
      "Ideal para trabajo y aventura",
      "Caja larga, gran capacidad de carga",
    ],
    engine: "V6 3.3L",
    power: "290 hp",
    seats: 5,
    tagline: "Pickup robusta 4x4, lista para el trabajo y la aventura.",
  },
  {
    id: "mg-3-2025",
    brand: "MG",
    model: "MG3",
    version: "Excite TA",
    year: 2025,
    price: 339000,
    mileage: 1200,
    transmission: "Automática",
    fuel: "Gasolina",
    bodyType: "Hatchback",
    traction: "4x2",
    color: "Rojo",
    city: "Mérida",
    featured: true,
    status: "Disponible",
    cover: "/MGMain.jpg",
    gallery: GAL_HATCH,
    highlights: [
      "Modelo 2025, casi nuevo",
      "Transmisión automática",
      "Excelente rendimiento de combustible",
      "Diseño moderno y compacto",
    ],
    tagline: "Hatchback 2025 prácticamente nuevo, ágil y eficiente.",
  },
  {
    id: "nissan-versa-2025",
    brand: "Nissan",
    model: "Versa",
    version: "Sense TM",
    year: 2025,
    price: 329000,
    mileage: 800,
    transmission: "Manual",
    fuel: "Gasolina",
    bodyType: "Sedán",
    traction: "4x2",
    color: "Gris",
    city: "Mérida",
    featured: true,
    status: "Disponible",
    cover: "/versamain.jpg",
    gallery: GAL_SEDAN_2,
    highlights: [
      "Modelo 2025, prácticamente nuevo",
      "Transmisión manual de 5 velocidades",
      "Excelente rendimiento de combustible",
      "Solo 800 km recorridos",
    ],
    tagline: "Sedán 2025 con solo 800 km, como nuevo.",
  },
  {
    id: "dodge-attitude-2022",
    brand: "Dodge",
    model: "Attitude",
    version: "SE TA",
    year: 2022,
    price: 269000,
    mileage: 34500,
    transmission: "Automática",
    fuel: "Gasolina",
    bodyType: "Sedán",
    traction: "4x2",
    color: "Gris",
    city: "Mérida",
    featured: true,
    status: "Disponible",
    cover: "/DMain.jpg",
    gallery: GAL_SEDAN,
    highlights: [
      "Transmisión automática",
      "Bajo consumo de combustible",
      "Excelente estado, 34,500 km",
      "Ideal para ciudad",
    ],
    tagline: "Sedán automático, económico e ideal para ciudad.",
  },
];

/* ── Catalog mock units (datos de ejemplo del inventario AUTOSDIAZ) ── */
interface MockSpec {
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuel: FuelType;
  bodyType: BodyType;
  traction?: string;
  color: string;
}

const MOCK: MockSpec[] = [
  { brand: "SEAT", model: "Ibiza", version: "Xcellence TA", year: 2022, price: 299000, mileage: 38000, transmission: "Automática", fuel: "Gasolina", bodyType: "Hatchback", color: "Rojo" },
  { brand: "Honda", model: "Odyssey", version: "Touring", year: 2018, price: 389000, mileage: 78000, transmission: "Automática", fuel: "Gasolina", bodyType: "SUV", color: "Blanco" },
  { brand: "Mercedes", model: "E200", version: "Avantgarde", year: 2018, price: 389000, mileage: 62000, transmission: "Automática", fuel: "Gasolina", bodyType: "Sedán", color: "Gris" },
  { brand: "Mazda", model: "CX-30", version: "i Grand Touring", year: 2022, price: 389000, mileage: 34000, transmission: "Automática", fuel: "Gasolina", bodyType: "SUV", color: "Blanco" },
  { brand: "Chevrolet", model: "Onix", version: "TM", year: 2026, price: 269000, mileage: 4500, transmission: "Manual", fuel: "Gasolina", bodyType: "Sedán", color: "Gris" },
  { brand: "Chevrolet", model: "Groove", version: "LT", year: 2024, price: 329000, mileage: 18000, transmission: "Automática", fuel: "Gasolina", bodyType: "SUV", color: "Gris" },
  { brand: "Honda", model: "Pilot", version: "Touring", year: 2021, price: 459000, mileage: 52000, transmission: "Automática", fuel: "Gasolina", bodyType: "SUV", color: "Negro" },
  { brand: "Nissan", model: "Kicks", version: "Exclusive", year: 2024, price: 389000, mileage: 12000, transmission: "Automática", fuel: "Gasolina", bodyType: "SUV", color: "Gris" },
  { brand: "Nissan", model: "Frontier", version: "Platinum", year: 2021, price: 489000, mileage: 58000, transmission: "Automática", fuel: "Diesel", bodyType: "Pickup", traction: "4x4", color: "Blanco" },
  { brand: "Suzuki", model: "Baleno", version: "GLX", year: 2024, price: 309000, mileage: 9000, transmission: "Automática", fuel: "Gasolina", bodyType: "Hatchback", color: "Azul" },
  { brand: "Mazda", model: "Mazda 3", version: "HB i Sport", year: 2023, price: 389000, mileage: 22000, transmission: "Automática", fuel: "Gasolina", bodyType: "Hatchback", color: "Negro" },
  { brand: "Suzuki", model: "Swift", version: "Boosterjet", year: 2022, price: 297000, mileage: 31000, transmission: "Automática", fuel: "Gasolina", bodyType: "Hatchback", color: "Gris" },
  { brand: "SEAT", model: "Ibiza", version: "Xcellence TM", year: 2023, price: 309000, mileage: 24000, transmission: "Manual", fuel: "Gasolina", bodyType: "Hatchback", color: "Blanco" },
  { brand: "Chevrolet", model: "Onix", version: "Premier TA", year: 2021, price: 245000, mileage: 46000, transmission: "Automática", fuel: "Gasolina", bodyType: "Sedán", color: "Blanco" },
  { brand: "Chevrolet", model: "Aveo", version: "LS TA", year: 2021, price: 219000, mileage: 49000, transmission: "Automática", fuel: "Gasolina", bodyType: "Sedán", color: "Rojo" },
  { brand: "Mazda", model: "CX-9", version: "Grand Touring", year: 2022, price: 529000, mileage: 36000, transmission: "Automática", fuel: "Gasolina", bodyType: "SUV", color: "Negro" },
  { brand: "Ford", model: "Ranger", version: "XL TM", year: 2022, price: 449000, mileage: 44000, transmission: "Manual", fuel: "Diesel", bodyType: "Pickup", traction: "4x2", color: "Blanco" },
  { brand: "Chevrolet", model: "S10 Max", version: "4x4 TM", year: 2023, price: 479000, mileage: 29000, transmission: "Manual", fuel: "Diesel", bodyType: "Pickup", traction: "4x4", color: "Rojo" },
  { brand: "Hyundai", model: "Accent", version: "GLS", year: 2019, price: 229000, mileage: 67000, transmission: "Automática", fuel: "Gasolina", bodyType: "Sedán", color: "Rojo" },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const mockCars: Car[] = MOCK.map((m, i) => {
  const gallery = galleryFor(m.bodyType, i % 2 === 1);
  return {
    id: `${slugify(m.brand)}-${slugify(m.model)}-${m.year}-${i}`,
    brand: m.brand,
    model: m.model,
    version: m.version,
    year: m.year,
    price: m.price,
    mileage: m.mileage,
    transmission: m.transmission,
    fuel: m.fuel,
    bodyType: m.bodyType,
    traction: m.traction ?? "4x2",
    color: m.color,
    city: "Mérida",
    featured: false,
    status: "Disponible",
    cover: gallery[0],
    gallery,
    highlights: [
      `${m.brand} ${m.model} ${m.year}`,
      "Revisión mecánica y legal completa",
      `Transmisión ${m.transmission.toLowerCase()}`,
      `${m.mileage.toLocaleString("es-MX")} km`,
      "Garantía AUTOSDIAZ",
    ],
    seats: m.bodyType === "Pickup" || m.bodyType === "SUV" ? 5 : 5,
  };
});

export const inventory: Car[] = [...featuredCars, ...mockCars];

export const leadInbox: Lead[] = [
  {
    id: "ld-001",
    customer: "Carlos M.",
    channel: "Instagram",
    interest: "Taos Comfortline 2021",
    budget: 450000,
    stage: "Nuevo",
    createdAt: "Hace 12 min",
  },
  {
    id: "ld-002",
    customer: "Patricia R.",
    channel: "WhatsApp",
    interest: "Kia Forte 2021",
    budget: 330000,
    stage: "Seguimiento",
    createdAt: "Hace 1 h",
  },
  {
    id: "ld-003",
    customer: "Ivan L.",
    channel: "Facebook",
    interest: "S10 Max 2023 4x4",
    budget: 590000,
    stage: "Cita",
    createdAt: "Hace 2 h",
  },
  {
    id: "ld-004",
    customer: "Valeria N.",
    channel: "Web",
    interest: "Mazda CX-9",
    budget: 550000,
    stage: "Nuevo",
    createdAt: "Hace 5 h",
  },
];
