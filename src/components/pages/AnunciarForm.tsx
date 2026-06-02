"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/format";

const EMPTY = {
  marca: "",
  modelo: "",
  version: "",
  km: "",
  anio: "",
  valor: "",
  nombre: "",
  email: "",
  numero: "",
};

export function AnunciarForm() {
  const [f, setF] = useState(EMPTY);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((c) => ({ ...c, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "Hola AUTOSDIAZ, quiero anunciar mi vehículo:",
      `Marca: ${f.marca}`,
      `Modelo: ${f.modelo}`,
      `Versión: ${f.version}`,
      `KM: ${f.km}`,
      `Año: ${f.anio}`,
      `Valor deseado: ${f.valor}`,
      `Nombre: ${f.nombre}`,
      `Email: ${f.email}`,
      `Número: ${f.numero}`,
    ].join("\n");
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="form-card">
      <form onSubmit={submit}>
        <p className="form-group-title">Datos del vehículo</p>
        <div className="form-grid">
          <input className="input" placeholder="Marca" required value={f.marca} onChange={set("marca")} />
          <input className="input" placeholder="Modelo" required value={f.modelo} onChange={set("modelo")} />
          <input className="input" placeholder="Versión" value={f.version} onChange={set("version")} />
          <input className="input" placeholder="Kilometraje" value={f.km} onChange={set("km")} />
          <input className="input" placeholder="Año del vehículo" value={f.anio} onChange={set("anio")} />
          <input className="input" placeholder="Valor deseado" value={f.valor} onChange={set("valor")} />
        </div>

        <p className="form-group-title">Datos personales</p>
        <div className="form-grid">
          <input className="input" placeholder="Nombre completo" required value={f.nombre} onChange={set("nombre")} />
          <input className="input" type="email" placeholder="Correo electrónico" value={f.email} onChange={set("email")} />
          <input className="input" placeholder="Número de WhatsApp" required value={f.numero} onChange={set("numero")} />
        </div>

        <p className="form-group-title">Fotos del vehículo</p>
        <div className="file-input">
          <label htmlFor="fotos">Elegir archivos</label>
          <input id="fotos" type="file" multiple style={{ display: "none" }} />
          <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
            Adjunta tus fotos al escribirnos por WhatsApp
          </span>
        </div>

        <div className="form-consent">
          <input type="checkbox" required id="lgpd2" />
          <label htmlFor="lgpd2">
            Acepto compartir mis datos para que AUTOSDIAZ me contacte. Mi
            información será usada conforme al Aviso de Privacidad.
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
