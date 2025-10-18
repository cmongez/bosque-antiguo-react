import React from 'react'

export const Navbar = () => {
    return (
        //   <--NAVBAR -- >
        //   < !--navbar verde, con textos blancos, que en pantallas pequeñas se transforma en menú colapsable-- >
        <nav class="navbar navbar-expand-lg navbar-dark bg-success px-2">
            <div class="container-fluid px-0 ">
                <a class="navbar-brand logo" href="index.html">
                    <img src="./img/logo ba.png" alt="Logo" />
                </a>

                {/* <!-- ICONOS DE BUSQUEDA,CARRITO,USUARIO --> */}

                <div class="navbar align-self-center d-flex order-lg-3 me-md-4">
                    <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                        {/* <!--el input de búsqueda solo se muestra en pantallas pequeñas (se oculta en pantallas grandes)--> */}
                        <div class="input-group">
                            <input type="text" class="form-control me-2 barra-busqueda" id="inputMobileSearch"
                                placeholder="Buscar..." />
                            <div class="input-group-text">
                                <i class="fa fa-fw fa-search"></i>
                            </div>
                        </div>
                        {/* <!-- ÍCONO BÚSQUEDA en escritorio --> */}
                        <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#buscadorModal">
                            <i class="fa fa-fw fa-search text-white" style="font-size: 24px"></i>
                        </a>


                    </div>
                    {/* <!-- ÍCONO BÚSQUEDA en escritorio --> */}
                    <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#buscadorModal">
                        <i class="fa fa-fw fa-search text-dark" style="font-size: 24px"></i>
                    </a>
                    {/* <!-- ÍCONO CARRITO --> */}
                    <a class="mx-4 mx-md-2 mx-lg-4 nav-icon position-relative text-decoration-none" href="./carrito.html">
                        <i class="fa fa-fw fa-cart-arrow-down text-white mr-1"></i>
                        <span id="cartCount"
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">0</span>
                    </a>
                    {/* <!-- ÍCONO USUARIO --> */}
                    <a class="nav-icon position-relative text-decoration-none" href="admin-home.html">
                        <i class="fa fa-fw fa-user text-white mr-3"></i>
                        <span
                            class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">+99</span>
                    </a>

                </div>
                {/* <!--active indica el enlace actual--> */}
                {/* <!--Es el icono de menú hamburguesa (3 rayitas)--> */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse d-lg-flex justify-content-lg-center  navbar-collapse" id="menu">
                    <ul class="navbar-nav d-flex  text-center gap-2">
                        <li class="nav-item">
                            <a class="nav-link active" href="index.html">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="productos.html">Productos</a>
                        </li>
                        {/* <!-- Aquí agregamos las nuevas opciones --> */}
                        <li class="nav-item">
                            <a class="nav-link" href="nosotros.html">Nosotros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="blogs.html">Blogs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="registro.html">Registro</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="login.html">Iniciar Sesión</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contacto.html">Contacto</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>

    )
}
