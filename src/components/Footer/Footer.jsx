import React from 'react'

export const Footer = () => {
    return (
        //    <!-- FOOTER -->
        <footer className="site-footer">
            <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
                {/* <!-- Logo a la izquierda --> */}
                <div className="footer-logo mb-4 mb-md-0">
                    <a href="./index.html">
                        <img src="./img/logo ba.png" alt="Logo" className="img-fluid" style={{maxWidth: "150px"}} />
                    </a>
                </div>

                {/* <!-- Columnas centradas --> */}
                <div className="footer-columns d-flex gap-5 justify-content-center flex-grow-1">
                    {/* <!-- Columna Información --> */}
                    <div>
                        <h5>Información</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="contacto.html" className="footer-link">Contáctanos</a>
                            </li>
                            <li><a href="#" className="footer-link">Preguntas frecuentes</a></li>
                            <li>
                                <a href="nosotros.html" className="footer-link">Nuestra historia</a>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Columna Legal --> */}
                    <div>
                        <h5>Legal</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#" className="footer-link">Políticas de reembolso</a>
                            </li>
                            <li><a href="#" className="footer-link">Políticas de envíos</a></li>
                            <li><a href="#" className="footer-link">Términos de servicio</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* <!-- Derechos reservados --> */}
            <p className="mb-2 text-center mt-4">
                &copy; 2025 Tu Tienda. Todos los derechos reservados.
            </p>

            {/* <!-- Redes sociales --> */}
            <div className="social-icons d-flex justify-content-center gap-3">
                <a href="https://facebook.com" target="_blank"><i className="fab fa-facebook"></i></a>
                <a href="https://instagram.com" target="_blank"><i className="fab fa-instagram"></i></a>
                <a href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></a>
                <a href="https://wa.me/56912345678" target="_blank"><i className="fab fa-whatsapp"></i></a>
            </div>
        </footer>
    )
}
