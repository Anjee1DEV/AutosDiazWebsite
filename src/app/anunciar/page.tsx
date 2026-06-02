import { AnunciarForm } from "@/components/pages/AnunciarForm";

export const metadata = {
  title: "Anuncia tu vehículo | AUTOSDIAZ",
  description: "Vende tu auto con AUTOSDIAZ. Llena el formulario y te contactamos.",
};

export default function AnunciarPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Anuncia tu vehículo</h1>
          <p>
            Comparte los datos de tu auto y nuestro equipo te contactará por
            WhatsApp para revisar la valuación y los siguientes pasos.
          </p>
        </div>
      </section>
      <section className="section-tight">
        <div className="container">
          <AnunciarForm />
        </div>
      </section>
    </>
  );
}
