import React from 'react'
import './Contacto.css'

export const Contacto = () => {
    return (<>
        <section className="hero-contact text-center text-white">
            <div className="container">
                <h2>¿Necesitas ayuda?</h2>
                <a href="#" id="btnHeroContact" className="btn btn-success btn-lg mt-3">
                    Contáctanos
                </a>
            </div>
        </section>


        {/* //   <!-- SECCIÓN CONTACTO-- > */}

        <section className="container py-5" id="contactSection">
            <div className="row g-4">
                {/* <!-- INFORMACIÓN --> */}

                <div className="col-md-6 fade-left">
                    <h3>INFORMACIÓN:</h3>
                    <p>
                        <strong>ATENCIÓN A PÚBLICO:</strong><br />
                        Lunes a viernes 8:00-17:30<br />
                        Sábados y Domingos 8:00-13:00
                    </p>

                    <p>
                        <strong>TELÉFONOS:</strong><br />
                        +56 9 7304 5968
                    </p>

                    <p>
                        <strong>E-MAIL:</strong><br />
                        Holabosqueantiguo@gmail.com<br />
                        Cotizaciones: cotizaciones@vivero.cl<br />
                        Preguntas técnicas: viveros@vivero.cl
                    </p>

                    <p>
                        <strong>DIRECCIÓN:</strong><br />
                        Callejón alto patagua s/n el tambo, 3070000 San Vicente de Tagua
                        Tagua, O'Higgins
                    </p>
                </div>

                {/* <!-- FORMULARIO --> */}

                <div className="col-md-6 fade-right">
                    <h4>Envíanos un mensaje</h4>
                    <form id="formContacto">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" placeholder="Tu nombre" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="email" placeholder="Tu email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mensaje" className="form-label">Mensaje</label>
                            <textarea className="form-control" id="mensaje" rows="5" placeholder="Escribe tu mensaje"></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Enviar</button>
                    </form>
                </div>
            </div>
        </section>

        {/* <!--MAPA --> */}

        <section className="container my-5">
            <h2 className="text-center mb-4">Encuéntranos</h2>
            <div className="ratio ratio-16x9">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.85801867935!2d-70.9786812!3d-34.506483599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96648f0aeebdd6d1%3A0x8af47e7d07235565!2sVIVERO%20BOSQUE%20ANTIGUO!5e0!3m2!1ses-419!2scl!4v1757301410951!5m2!1ses-419!2scl"
                    width="600" height="450" allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </section>

    </>
    )
}
