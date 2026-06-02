import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CompareProvider } from "@/components/site/CompareProvider";
import { RouteTransition } from "@/components/site/RouteTransition";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AUTOSDIAZ | Seminuevos garantizados en Mérida",
  description:
    "Seminuevos verificados en Mérida, Yucatán. Calidad, seguridad, financiamiento y atención personalizada.",
};

export const viewport = {
  themeColor: "#fbfbfb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={poppins.variable}>
        <CompareProvider>
          <SiteHeader />
          <RouteTransition>{children}</RouteTransition>
          <SiteFooter />
        </CompareProvider>
      </body>
    </html>
  );
}
