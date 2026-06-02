import Image from "next/image";
import { Facebook, MapPin, PhoneCall } from "lucide-react";
import { CONTACT } from "@/data/site-content";
import { buildWhatsAppUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ContactForm } from "@/components/pages/ContactForm";
import { AnunciarForm } from "@/components/pages/AnunciarForm";

export const metadata = {
  title: "Contacto | AUTOSDIAZ",
  description: "Contacta a AUTOSDIAZ en Mérida: teléfono, WhatsApp y Facebook.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Contacto</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container contact-grid">
          <div className="contact-buttons">
            <a className="contact-btn" href={CONTACT.phoneHref}>
              <PhoneCall size={18} /> Llámanos
            </a>
            <a className="contact-btn" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={18} /> Ver ubicación
            </a>
            <a className="contact-btn" href={buildWhatsAppUrl("Hola AUTOSDIAZ, quiero más información.")} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={17} /> Escribir por WhatsApp
            </a>
            <a className="contact-btn" href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer">
              <Facebook size={18} /> Ver Facebook
            </a>
          </div>
          <div className="contact-art">
            <Image
              src="/MGMain.jpg"
              alt="AUTOSDIAZ"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="cover-image"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: "center" }}>
            ¿Buscas un modelo en específico?
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--muted)",
              margin: "-0.8rem 0 1.6rem",
            }}
          >
            Déjanos tus datos y te contactamos por WhatsApp para revisar opciones reales de inventario.
          </p>
          <ContactForm />
        </div>
      </section>

      <section id="vender" className="section bg-2 sell-contact-section">
        <div className="container">
          <div className="sell-contact-head">
            <span>Venta de unidad</span>
            <h2>¿Te gustaría vender tu auto?</h2>
            <p>
              Comparte los datos principales de tu vehículo. Revisamos la información y te contactamos por WhatsApp para avanzar con una valuación clara.
            </p>
          </div>
          <AnunciarForm />
        </div>
      </section>
    </>
  );
}
