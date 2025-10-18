import React from 'react'

export const Navbar = () => {
    return (
        //   <--NAVBAR -- >
        //   < !--navbar verde, con textos blancos, que en pantallas pequeñas se transforma en menú colapsable-- >
        <nav className="navbar navbar-expand-lg navbar-dark bg-success px-2">
            <div className="container-fluid px-0 ">
                <a className="navbar-brand logo" href="index.html">
                    <img src="./img/logo ba.png" alt="Logo" />
                </a>

                {/* <!-- ICONOS DE BUSQUEDA,CARRITO,USUARIO --> */}

                <div className="navbar align-self-center d-flex order-lg-3 me-md-4">
                    <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                        {/* <!--el input de búsqueda solo se muestra en pantallas pequeñas (se oculta en pantallas grandes)--> */}
                        <div className="input-group">
                            <input type="text" className="form-control me-2 barra-busqueda" id="inputMobileSearch"
                                placeholder="Buscar..." />
                            <div className="input-group-text">
                                <i className="fa fa-fw fa-search"></i>
                            </div>
                        </div>
                        {/* <!-- ÍCONO BÚSQUEDA en escritorio --> */}
                        <a className="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#buscadorModal">
                            <i className="fa fa-fw fa-search text-white" style={{fontSize: "24px"}}></i>
                        </a>


                    </div>
                    {/* <!-- ÍCONO BÚSQUEDA en escritorio --> */}
                    <a className="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#buscadorModal">
                        <i className="fa fa-fw fa-search text-dark" style={{fontSize: "24px"}}></i>
                    </a>
                    {/* <!-- ÍCONO CARRITO --> */}
                    <a className="mx-4 mx-md-2 mx-lg-4 nav-icon position-relative text-decoration-none" href="./carrito.html">
                        <i className="fa fa-fw fa-cart-arrow-down text-white mr-1"></i>
                        <span id="cartCount"
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">0</span>
                    </a>
                    {/* <!-- ÍCONO USUARIO --> */}
                    <a className="nav-icon position-relative text-decoration-none" href="admin-home.html">
                        <i className="fa fa-fw fa-user text-white mr-3"></i>
                        <span
                            className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">+99</span>
                    </a>

                </div>
                {/* <!--active indica el enlace actual--> */}
                {/* <!--Es el icono de menú hamburguesa (3 rayitas)--> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse d-lg-flex justify-content-lg-center  navbar-collapse" id="menu">
                    <ul className="navbar-nav d-flex  text-center gap-2">
                        <li className="nav-item">
                            <a className="nav-link active" href="index.html">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="productos.html">Productos</a>
                        </li>
                        {/* <!-- Aquí agregamos las nuevas opciones --> */}
                        <li className="nav-item">
                            <a className="nav-link" href="nosotros.html">Nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="blogs.html">Blogs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="registro.html">Registro</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="login.html">Iniciar Sesión</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contacto.html">Contacto</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>

    )
}
