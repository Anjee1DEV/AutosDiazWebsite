import Image from "next/image";

export const metadata = {
  title: "Nosotros | AUTOSDIAZ",
  description:
    "AUTOSDIAZ: seminuevos verificados en Mérida con calidad, seguridad y transparencia.",
};

export default function NosotrosPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Sobre nosotros</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Quiénes somos</h2>
              <p>
                AUTOSDIAZ es un dealer especializado en la venta de seminuevos
                verificados en Mérida, Yucatán. Con seguridad, transparencia y
                calidad, cada unidad pasa por una revisión mecánica y legal
                completa para garantizarte una compra confiable.
              </p>
              <p>
                Ofrecemos un inventario renovado constantemente, financiamiento
                con financieras aliadas, toma a cuenta de tu auto actual y
                atención personalizada de principio a fin.
              </p>
              <p>
                Nos enorgullece formar parte de los momentos importantes de
                nuestros clientes: cada entrega es el inicio de una nueva
                historia sobre ruedas.
              </p>
            </div>
            <div className="about-img">
              <Image
                src="/autosdiaz_delivery_1_daylight_4k.jpg"
                alt="Entrega AUTOSDIAZ"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="cover-image"
              />
            </div>
          </div>

          <div className="mv-grid">
            <div className="mv-card">
              <h3>Misión</h3>
              <p>
                Ser la mejor opción en seminuevos en el sureste, acompañando a
                cada persona en la compra de su auto con confianza y sin
                sorpresas.
              </p>
            </div>
            <div className="mv-card">
              <h3>Visión</h3>
              <p>
                Ser referencia regional como la agencia más transparente y
                cercana, conectando personas con el vehículo ideal para su vida.
              </p>
            </div>
            <div className="mv-card values">
              <h3>Valores</h3>
              <ul>
                <li>Transparencia en cada operación</li>
                <li>Calidad verificada en cada unidad</li>
                <li>Atención personalizada</li>
                <li>Clientes plenamente satisfechos</li>
                <li>Compromiso y cumplimiento</li>
                <li>Cercanía con la comunidad</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
