/* ─── Financing model & constants ─── */

export const TERM_OPTIONS = [12, 24, 36, 48, 60] as const;
export type TermMonths = (typeof TERM_OPTIONS)[number];
export type CreditProvider = "CrediGo" | "Financiera Alpez";
export type DownPaymentMode = "percentage" | "amount";

export interface CreditPlan {
  minDownPaymentPercent: number;
  ratesByTerm: Record<TermMonths, number>;
}

export const CREDIT_PLANS: Record<CreditProvider, CreditPlan> = {
  CrediGo: {
    minDownPaymentPercent: 0.2,
    ratesByTerm: { 12: 0.119, 24: 0.129, 36: 0.139, 48: 0.149, 60: 0.159 },
  },
  "Financiera Alpez": {
    minDownPaymentPercent: 0.3,
    ratesByTerm: { 12: 0.109, 24: 0.119, 36: 0.129, 48: 0.139, 60: 0.149 },
  },
};

/** Standard amortized monthly payment for a financed amount. */
export function calculateMonthlyPayment(
  price: number,
  downPaymentPercent: number,
  termMonths: number,
  annualRate: number,
): number {
  const financed = price * (1 - downPaymentPercent);
  const monthlyRate = annualRate / 12;
  if (monthlyRate === 0) return financed / termMonths;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (financed * monthlyRate * factor) / (factor - 1);
}
