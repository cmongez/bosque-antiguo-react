import React from 'react'
import './Navbar.css'
import logo from './../../assets/img/logo_ba.png'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        //   <--NAVBAR -- >
        //   < !--navbar verde, con textos blancos, que en pantallas pequeñas se transforma en menú colapsable-- >
        <nav className="navbar navbar-expand-lg navbar-dark bg-success px-2">
            <div className="container-fluid px-0 ">
                <Link className="navbar-brand logo" to="/home">
                    <img src={logo} alt="Logo" />
                </Link>

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
                        <NavLink className="nav-icon d-none d-lg-inline" to="#" data-bs-toggle="modal" data-bs-target="#buscadorModal">
                            <i className="fa fa-fw fa-search text-white" style={{fontSize: "24px"}}></i>
                        </NavLink>


                    </div>
                    {/* <!-- ÍCONO BÚSQUEDA en escritorio --> */}
                    <NavLink className="nav-icon d-none d-lg-inline" to="#" data-bs-toggle="modal" data-bs-target="#buscadorModal">
                        <i className="fa fa-fw fa-search text-dark" style={{fontSize: "24px"}}></i>
                    </NavLink>
                    {/* <!-- ÍCONO CARRITO --> */}
                    <NavLink className="mx-4 mx-md-2 mx-lg-4 nav-icon position-relative text-decoration-none" to="./carrito">
                        <i className="fa fa-fw fa-cart-arrow-down text-white mr-1"></i>
                        <span id="cartCount"
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">0</span>
                    </NavLink>
                    {/* <!-- ÍCONO USUARIO --> */}
                    <NavLink className="nav-icon position-relative text-decoration-none" to="admin-home">
                        <i className="fa fa-fw fa-user text-white mr-3"></i>
                        <span
                            className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">+99</span>
                    </NavLink>

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
                            <NavLink className="nav-link active" to="/home">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/productos">Productos</NavLink>
                        </li>
                        {/* <!-- Aquí agregamos las nuevas opciones --> */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/registro">Registro</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>

    )
}
