import React from 'react'

export const Contacto = () => {
    return (<>
        <section class="hero-contact text-center text-white" style="
        background-image: url('/img/jardineria1.jpg');
        background-size: cover;
        background-position: center;
        padding: 120px 0;">
            <div class="container">
                <h2>¿Necesitas ayuda?</h2>
                <a href="#" id="btnHeroContact" class="btn btn-success btn-lg mt-3">Contáctanos</a>
            </div>
        </section>

        {/* //   <!-- SECCIÓN CONTACTO-- > */}

        <section class="container py-5" id="contactSection">
            <div class="row g-4">
                {/* <!-- INFORMACIÓN --> */}

                <div class="col-md-6 fade-left">
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

                <div class="col-md-6 fade-right">
                    <h4>Envíanos un mensaje</h4>
                    <form id="formContacto">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" placeholder="Tu nombre" />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Correo electrónico</label>
                            <input type="email" class="form-control" id="email" placeholder="Tu email" />
                        </div>
                        <div class="mb-3">
                            <label for="mensaje" class="form-label">Mensaje</label>
                            <textarea class="form-control" id="mensaje" rows="5" placeholder="Escribe tu mensaje"></textarea>
                        </div>
                        <button type="submit" class="btn btn-success">Enviar</button>
                    </form>
                </div>
            </div>
        </section>

        {/* <!--MAPA --> */}

        <section class="container my-5">
            <h2 class="text-center mb-4">Encuéntranos</h2>
            <div class="ratio ratio-16x9">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287.85801867935!2d-70.9786812!3d-34.506483599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96648f0aeebdd6d1%3A0x8af47e7d07235565!2sVIVERO%20BOSQUE%20ANTIGUO!5e0!3m2!1ses-419!2scl!4v1757301410951!5m2!1ses-419!2scl"
                    width="600" height="450" style="border: 0" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </section>

        {/* <!--BOTÓN VOLVER ARRIBA-- > */}
        <button id="btnTop" title="Ir arriba">
            <i class="fa-solid fa-chevron-up"></i>
        </button>

        {/* <!--FOOTER --> */}
        <footer class="site-footer">
            <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between">
                {/* <!-- Logo a la izquierda --> */}
                <div class="footer-logo mb-4 mb-md-0">
                    <a href="./index.html">
                        <img src="./img/logo ba.png" alt="Logo" class="img-fluid" style="max-width: 150px" />
                    </a>
                </div>

                {/* <!-- Columnas centradas --> */}
                <div class="footer-columns d-flex gap-5 justify-content-center flex-grow-1">
                    {/* <!-- Columna Información --> */}
                    <div>
                        <h5>Información</h5>
                        <ul class="list-unstyled">
                            <li>
                                <a href="contacto.html" class="footer-link">Contáctanos</a>
                            </li>
                            <li><a href="#" class="footer-link">Preguntas frecuentes</a></li>
                            <li>
                                <a href="nosotros.html" class="footer-link">Nuestra historia</a>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Columna Legal --> */}
                    <div>
                        <h5>Legal</h5>
                        <ul class="list-unstyled">
                            <li>
                                <a href="#" class="footer-link">Políticas de reembolso</a>
                            </li>
                            <li><a href="#" class="footer-link">Políticas de envíos</a></li>
                            <li><a href="#" class="footer-link">Términos de servicio</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* <!-- Derechos reservados --> */}
            <p class="mb-2 text-center mt-4">
                &copy; 2025 Tu Tienda. Todos los derechos reservados.
            </p>

            {/* <!-- Redes sociales --> */}
            <div class="social-icons d-flex justify-content-center gap-3">
                <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook"></i></a>
                <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
                <a href="https://wa.me/56912345678" target="_blank"><i class="fab fa-whatsapp"></i></a>
            </div>
        </footer>
        {/* <!--Modal de búsqueda-- > */}
        <div class="modal fade" id="buscadorModal" tabindex="-1" aria-labelledby="buscadorModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="buscadorModalLabel">
                            Buscar productos
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formBuscar">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Escribe tu búsqueda..." id="inputBuscar" />
                                <button class="btn btn-success" type="submit">Buscar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
