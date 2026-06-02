/* ─── Formatters & shared helpers ─── */

export const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

/** Build a WhatsApp deep-link to the dealership number with a prefilled message. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/5219993181328?text=${encodeURIComponent(message)}`;
}

/** Clamp a numeric value between a minimum and maximum. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
