import React from "react";

export const Nosotros = () => {
  return (
    <>
      {/* HERO NOSOTROS */}
      <section
        className="hero-contact text-center text-white"
        style={{
          backgroundImage: "url('/img/jardineria1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "120px 0",
        }}
      >
        <div className="container">
          <h2>Nosotros</h2>
        </div>
      </section>

      {/* SECCIÓN NOSOTROS */}
      <section className="container py-5 section-about">
        <div className="row fade-left">
          <div className="col text-dark">
            <p>
              Bosque Antiguo es un vivero dedicado a crear obras de paisajismo,
              forestación y agricultura ecológica. Nuestra propuesta busca
              producir y acercar plantas y alimentos artesanales, además de
              ofrecer sustratos e insumos para jardinería. También realizamos
              talleres prácticos orientados a enseñar cómo vivir en el campo,
              aplicando técnicas de agroecología y acercándolas a comunidades
              campestres e interesados en aprender. Nuestra casa central se
              encuentra en Alto Patagua, El Tambo, San Vicente de Tagua Tagua,
              Región de O’Higgins, y actualmente estamos expandiendo operaciones
              en la Región de Atacama.
            </p>
          </div>
        </div>
      </section>

      {/* NUESTRA MISIÓN */}
      <section
        className="text-white text-center py-5 my-4 position-relative"
        style={{
          backgroundImage:
            "url('/img/alto-angulo-de-plantas-en-macetas-negras.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0, // top:0, right:0, bottom:0, left:0
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        />
        <div className="container position-relative">
          <h2 className="mb-3">Nuestra Misión</h2>
          <p className="lead">
            Nuestra misión es promover la vida en armonía con la naturaleza,
            ofreciendo plantas nativas, frutales, flora melífera, ornamentales y
            de interior, junto con insumos y asesoría personalizada. Nos
            comprometemos a entregar soluciones sustentables que apoyen la
            reforestación, la biodiversidad y el aprendizaje comunitario a
            través de talleres de agroecología.
          </p>
        </div>
      </section>

      {/* NUESTRA VISIÓN */}
      <section
        className="text-white text-center py-5 my-4 position-relative"
        style={{
          backgroundImage:
            "url('/img/alto-angulo-de-plantas-en-macetas-negras.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        />
        <div className="container position-relative">
          <h2 className="mb-3">Nuestra Visión</h2>
          <p className="lead">
            Nuestra visión es ser el vivero referente en Chile en conservación,
            educación ambiental y paisajismo ecológico, reconocido por la
            calidad de nuestras plantas, el impacto positivo en la restauración
            de ecosistemas y la cercanía con comunidades rurales y urbanas que
            buscan reconectar con la tierra.
          </p>
        </div>
      </section>
    </>
  );
}
