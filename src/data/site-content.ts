/* ─── Static site content (contact info, FAQ, deliveries, browse imagery) ─── */

export const CONTACT = {
  phoneDisplay: "+52 1 999 318 1328",
  phoneHref: "tel:+5219993181328",
  address: "Calle 27A 131, Leandro Valle, 97143 Mérida, Yuc., México",
  schedule: "Lunes a sábado: 9:00 a 19:00 | Domingo: citas programadas",
  city: "Mérida, Yucatán",
  mapsUrl: "https://maps.app.goo.gl/xborA1qC8ePcvmmg9",
  facebookUrl: "https://www.facebook.com/people/AUTOS-DIAZ/100075953741826/",
};

export const MAPS_URL = CONTACT.mapsUrl;

export const BODY_TYPE_IMAGES: Record<string, { img: string; label: string }> = {
  SUV: {
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
    label: "SUVs",
  },
  Sedán: {
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
    label: "Sedanes",
  },
  Pickup: {
    img: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=900&q=80",
    label: "Pickups",
  },
  Hatchback: {
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    label: "Hatchbacks",
  },
};

export const FAQ_ITEMS = [
  {
    q: "¿Los autos tienen garantía?",
    a: "Sí. Todos nuestros seminuevos pasan por una revisión mecánica y legal completa. En unidades seleccionadas ofrecemos garantía de motor y transmisión.",
  },
  {
    q: "¿Puedo financiar mi compra?",
    a: "Claro. Trabajamos con financieras aliadas como CrediGo y Financiera Alpez que ofrecen plazos de 12 a 60 meses con tasas competitivas. Puedes simular tu mensualidad en nuestro cotizador.",
  },
  {
    q: "¿Aceptan auto a cuenta?",
    a: "Sí. Evaluamos tu auto actual para tomarlo como parte de pago. Agenda una cita para la evaluación sin compromiso.",
  },
  {
    q: "¿Puedo agendar una prueba de manejo?",
    a: "Claro. Puedes agendar directamente por WhatsApp o llamarnos. Las pruebas de manejo se realizan en nuestra agencia en Mérida.",
  },
  {
    q: "¿Qué documentos necesito para comprar?",
    a: "INE vigente, comprobante de domicilio reciente y comprobante de ingresos si deseas financiamiento. Te guiamos en cada paso del proceso.",
  },
];

export const DELIVERIES = [
  {
    img: "/autosdiaz_delivery_1_daylight_4k.jpg",
    name: "Carlos Mendez",
    city: "Mérida, Yucatán",
    car: "BYD GM4 2024",
    quote:
      "Todo el proceso fue rápido y sin complicaciones. La atención fue excelente de principio a fin.",
  },
  {
    img: "/autosdiaz_delivery_2_daylight_4k.jpg",
    name: "Valeria Torres",
    city: "Mérida, Yucatán",
    car: "Nissan Versa 2025",
    quote:
      "Recibí mi auto en perfectas condiciones. Muy contentos con la compra, lo recomendamos totalmente.",
  },
  {
    img: "/autosdiaz_delivery_3_daylight_4k.jpg",
    name: "Roberto Perez",
    city: "Mérida, Yucatán",
    car: "Ford F-150 2022",
    quote:
      "El financiamiento fue fácil de gestionar. En menos de una semana ya tenía las llaves en mano.",
  },
  {
    img: "/autosdiaz_delivery_4_daylight_4k.jpg",
    name: "Daniela Cetina",
    city: "Mérida, Yucatán",
    car: "MG3 2025",
    quote:
      "Excelente atención y transparencia en todo. Sin letra chica, sin sorpresas. Gracias AUTOSDIAZ.",
  },
];
