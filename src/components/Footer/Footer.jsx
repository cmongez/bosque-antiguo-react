import React from 'react'

export const Footer = () => {
    return (
        //    <!-- FOOTER -->
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
    )
}
