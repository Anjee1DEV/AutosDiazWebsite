import Image from "next/image";
import Link from "next/link";
import { Facebook, MapPin, PhoneCall, ArrowRight } from "lucide-react";
import { CONTACT } from "@/data/site-content";
import { buildWhatsAppUrl } from "@/lib/format";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/autosdiaz_black_red.svg"
              alt="AutosDiaz"
              width={150}
              height={30}
            />
            <p className="footer-tagline">Calidad, seguridad y transparencia en cada entrega.</p>
            <div className="footer-socials">
              <a href={CONTACT.facebookUrl} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={17} />
              </a>
              <a
                href={buildWhatsAppUrl("Hola AUTOSDIAZ, quiero más información.")}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href={buildWhatsAppUrl("Hola AUTOSDIAZ, quiero más información.")} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={15} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref}>
                  <PhoneCall size={15} /> {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin size={15} /> {CONTACT.address}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>¿Buscas una unidad?</h4>
            <span>
              Escríbenos por WhatsApp y te avisamos cuando llegue una opción que
              se ajuste a tu presupuesto.
            </span>
            <div className="newsletter">
              <input className="input" type="text" placeholder="Modelo o presupuesto" />
              <a
                href={buildWhatsAppUrl(
                  "Hola AUTOSDIAZ, quiero que me avisen cuando llegue una unidad de mi interés.",
                )}
                aria-label="Consultar por WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <Link href="/">
            &copy; {year} AUTOSDIAZ. Todos los derechos reservados.
          </Link>
        </div>
      </div>
    </footer>
  );
}
