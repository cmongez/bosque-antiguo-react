import React from 'react'

export const Nosotros = () => {
    return (
        <>
    {/* //  < !--HERO NOSOTROS-- > */}
  <section class="hero-contact text-center text-white" style="
        background-image: url('/img/jardineria1.jpg');
        background-size: cover;
        background-position: center;
        padding: 120px 0;
      ">
    <div class="container">
      <h2>Nosotros</h2>
    </div>
  </section>

{/* //   <!--SECCIÓN NOSOTROS-- > */}

  <section class="container py-5 section-about">
    <div class="row fade-left">
      <div class="col text-dark">
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

{/* //   <!--NUESTRA MISIÓN-- > */}
  <section class="text-white text-center py-5 my-4" style="
        background-image: url('/img/alto-angulo-de-plantas-en-macetas-negras.jpg');
        background-size: cover;
        background-position: center;
        position: relative;
      ">
    <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        "></div>

    <div class="container position-relative">
      <h2 class="mb-3">Nuestra Misión</h2>
      <p class="lead">
        Nuestra misión es promover la vida en armonía con la naturaleza,
        ofreciendo plantas nativas, frutales, flora melífera, ornamentales y
        de interior, junto con insumos y asesoría personalizada. Nos
        comprometemos a entregar soluciones sustentables que apoyen la
        reforestación, la biodiversidad y el aprendizaje comunitario a través
        de talleres de agroecología.
      </p>
    </div>
  </section>

{/* //   <!--NUESTRA VISIÓN-- > */}
        <section class="text-white text-center py-5 my-4" style="
        background-image: url('/img/alto-angulo-de-plantas-en-macetas-negras.jpg');
        background-size: cover;
        background-position: center;
        position: relative;
      ">
            <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        "></div>

            <div class="container position-relative">
                <h2 class="mb-3">Nuestra Visión</h2>
                <p class="lead">
                    Nuestra visión es ser el vivero referente en Chile en conservación,
                    educación ambiental y paisajismo ecológico, reconocido por la calidad
                    de nuestras plantas, el impacto positivo en la restauración de
                    ecosistemas y la cercanía con comunidades rurales y urbanas que buscan
                    reconectar con la tierra.
                </p>
            </div>
        </section>
        </>

    )
}
