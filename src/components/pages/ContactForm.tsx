"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/format";

export function ContactForm() {
  const [f, setF] = useState({ modelo: "", nombre: "", email: "", numero: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((c) => ({ ...c, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "Hola AUTOSDIAZ, me interesa un modelo:",
      `Modelo: ${f.modelo}`,
      `Nombre: ${f.nombre}`,
      `Email: ${f.email}`,
      `Número: ${f.numero}`,
    ].join("\n");
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="form-card">
      <form onSubmit={submit}>
        <div className="form-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <input className="input" placeholder="Modelo de interés" value={f.modelo} onChange={set("modelo")} />
          <input className="input" placeholder="Nombre completo" required value={f.nombre} onChange={set("nombre")} />
          <input className="input" type="email" placeholder="Correo electrónico" value={f.email} onChange={set("email")} />
          <input className="input" placeholder="Número de WhatsApp" required value={f.numero} onChange={set("numero")} />
        </div>
        <div className="form-consent">
          <input type="checkbox" required id="lgpd" />
          <label htmlFor="lgpd">
            Acepto compartir mis datos para que AUTOSDIAZ me contacte y presente
            opciones. Mi información será usada conforme al Aviso de Privacidad.
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-dark">
            Enviar por WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}
