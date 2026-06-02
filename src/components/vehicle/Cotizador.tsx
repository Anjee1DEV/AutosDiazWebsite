"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { Car } from "@/data/inventory";
import {
  CREDIT_PLANS,
  TERM_OPTIONS,
  calculateMonthlyPayment,
  type CreditProvider,
  type DownPaymentMode,
  type TermMonths,
} from "@/lib/finance";
import { buildWhatsAppUrl, clamp, moneyFormatter } from "@/lib/format";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Cotizador({ car }: { car: Car }) {
  const [provider, setProvider] = useState<CreditProvider>("CrediGo");
  const [term, setTerm] = useState<TermMonths>(48);
  const [mode, setMode] = useState<DownPaymentMode>("percentage");
  const [downValue, setDownValue] = useState(25);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const plan = CREDIT_PLANS[provider];
  const minPct = plan.minDownPaymentPercent;
  const minAmount = car.price * minPct;
  const maxAmount = car.price * 0.9;
  const annualRate = plan.ratesByTerm[term];

  const downAmount = useMemo(() => {
    if (mode === "percentage") {
      return car.price * clamp(downValue / 100, minPct, 0.9);
    }
    return clamp(downValue, minAmount, maxAmount);
  }, [mode, downValue, car.price, minPct, minAmount, maxAmount]);

  const downPct = car.price > 0 ? downAmount / car.price : 0;
  const monthly = useMemo(
    () => calculateMonthlyPayment(car.price, downPct, term, annualRate),
    [car.price, downPct, term, annualRate],
  );
  const total = monthly * term + downAmount;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "Hola AUTOSDIAZ, quiero cotizar un seminuevo:",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Interés: ${car.brand} ${car.model} ${car.year}`,
      `Financiera: ${provider}`,
      `Plazo: ${term} meses`,
      `Enganche: ${moneyFormatter.format(downAmount)} (${(downPct * 100).toFixed(1)}%)`,
      `Mensualidad estimada: ${moneyFormatter.format(monthly)}`,
    ].join("\n");
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="cotizar" className="section bg-2" style={{ scrollMarginTop: "100px" }}>
      <div className="container">
        <h2 className="section-title">Cotiza tu mensualidad</h2>
        <div className="quote-layout">
          {/* Config */}
          <article className="panel">
            <h3>Configura tu crédito</h3>
            <p className="panel-copy">
              Tasas calculadas automáticamente según financiera y plazo. Sin
              compromiso.
            </p>
            <div className="calc-grid">
              <label className="field-label">
                Financiera
                <select
                  className="select"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as CreditProvider)}
                >
                  <option value="CrediGo">CrediGo</option>
                  <option value="Financiera Alpez">Financiera Alpez</option>
                </select>
              </label>
              <label className="field-label">
                Auto
                <input
                  className="input"
                  value={`${car.brand} ${car.model} ${car.year}`}
                  readOnly
                />
              </label>
              <div className="field-label span-2">
                Plazo (meses)
                <div className="term-options">
                  {TERM_OPTIONS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={clsx("term-chip", term === t && "active")}
                      onClick={() => setTerm(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field-label span-2">
                <div className="price-head">
                  <span>Enganche</span>
                  <strong>
                    Min {moneyFormatter.format(minAmount)} ({(minPct * 100).toFixed(0)}%)
                  </strong>
                </div>
                <div className="mode-toggle" style={{ marginBottom: "0.6rem" }}>
                  <button
                    type="button"
                    className={clsx(mode === "percentage" && "active")}
                    onClick={() => {
                      setMode("percentage");
                      setDownValue(Math.max(downPct * 100, minPct * 100));
                    }}
                  >
                    Porcentaje
                  </button>
                  <button
                    type="button"
                    className={clsx(mode === "amount" && "active")}
                    onClick={() => {
                      setMode("amount");
                      setDownValue(Math.max(downAmount, minAmount));
                    }}
                  >
                    Monto
                  </button>
                </div>
                <input
                  className="input"
                  type="number"
                  value={Number(downValue.toFixed(2))}
                  min={mode === "percentage" ? Number((minPct * 100).toFixed(2)) : Number(minAmount.toFixed(0))}
                  max={mode === "percentage" ? 90 : car.price}
                  step={mode === "percentage" ? 0.1 : 500}
                  onChange={(e) => setDownValue(Number(e.target.value) || 0)}
                />
              </div>
            </div>
          </article>

          {/* Summary + lead */}
          <article className="panel">
            <h3>Resumen</h3>
            <ul className="summary-list">
              <li>
                <span>Precio</span>
                <strong>{moneyFormatter.format(car.price)}</strong>
              </li>
              <li>
                <span>Enganche</span>
                <strong>
                  {moneyFormatter.format(downAmount)} ({(downPct * 100).toFixed(1)}%)
                </strong>
              </li>
              <li>
                <span>A financiar</span>
                <strong>{moneyFormatter.format(Math.max(car.price - downAmount, 0))}</strong>
              </li>
              <li>
                <span>Tasa anual</span>
                <strong>{(annualRate * 100).toFixed(1)}%</strong>
              </li>
              <li>
                <span>Plazo</span>
                <strong>{term} meses</strong>
              </li>
            </ul>
            <div className="payment-card">
              <p>Mensualidad estimada</p>
              <strong>{moneyFormatter.format(monthly)}</strong>
              <span className="fine">
                Total aprox. del plan: {moneyFormatter.format(total)}. Sujeto a
                validación.
              </span>
            </div>
            <form className="calc-grid" onSubmit={submit}>
              <label className="field-label">
                Nombre
                <input
                  className="input"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="field-label">
                Teléfono
                <input
                  className="input"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <button type="submit" className="btn btn-dark btn-block span-2">
                <WhatsAppIcon size={16} /> Quiero que me contacten
              </button>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}
