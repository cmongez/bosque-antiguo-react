import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from './../../assets/img/logo_ba.png'
import { Link, NavLink, useLocation } from 'react-router-dom'

export const Navbar = () => {
    const [cartCount, setCartCount] = useState(0)
    const location = useLocation()

    // ===============================
    // 🔐 LECTURA DE SESIÓN
    // ===============================
    const rawToken = localStorage.getItem("token")
    const rawRole = localStorage.getItem("role")

    // Limpia valores inválidos ("null", "undefined")
    const token = rawToken && rawToken !== "null" && rawToken !== "undefined" ? rawToken : null
    const role = rawRole && rawRole !== "null" && rawRole !== "undefined" ? rawRole : ""

    const isLogged = !!token
    const isAdmin = role.toUpperCase().includes("ADMIN")

    // (Opcional: log para depurar)
    console.log("Navbar:", { token, role, isLogged, isAdmin })

    // ===============================
    // 🛒 CARRITO
    // ===============================
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('carrito')) || []
        const total = cart.reduce((acc, item) => acc + item.cantidad, 0)
        setCartCount(total)
    }

    useEffect(() => {
        updateCartCount()

        const handleStorageChange = e => {
            if (e.key === 'carrito') updateCartCount()
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [location])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success px-2">
            <div className="container-fluid px-0">

                {/* LOGO */}
                <Link className="navbar-brand logo" to="/home">
                    <img src={logo} alt="Logo" />
                </Link>

                {/* =============== ICONOS SUPERIORES DERECHA =============== */}
                <div className="navbar align-self-center d-flex order-lg-3 me-md-4">

                    {/* 🔍 Buscador */}
                    <NavLink className="nav-icon d-none d-lg-inline" to="#" data-bs-toggle="modal" data-bs-target="#buscadorModal">
                        <i className="fa fa-fw fa-search text-dark" style={{ fontSize: '24px' }}></i>
                    </NavLink>

                    {/* 🛒 Carrito */}
                    <NavLink className="mx-4 nav-icon position-relative text-decoration-none" to="/carrito">
                        <i className="fa fa-fw fa-cart-arrow-down text-white mr-1"></i>
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                                {cartCount}
                            </span>
                        )}
                    </NavLink>

                    {/* 👤 ICONO ADMIN — SOLO SI EL USUARIO ES ADMIN */}
                    {isLogged && isAdmin && (
                        <NavLink className="nav-icon position-relative text-decoration-none" to="/admin">
                            <i className="fa fa-fw fa-user text-white mr-3"></i>
                        </NavLink>
                    )}
                </div>

                {/* MENÚ RESPONSIVE */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-lg-flex justify-content-lg-center" id="menu">
                    <ul className="navbar-nav d-flex text-center gap-2">
                        <li className="nav-item"><NavLink className="nav-link" to="/home">Inicio</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/blogs">Blogs</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/registro">Registro</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/login">Iniciar Sesión</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
