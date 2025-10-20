import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./AdminLayout.css";

export const AdminLayout = () => {
    const { pathname } = useLocation();
    const isActive = (path) => pathname === path ? "active" : "";

    return (
        <div className="admin-container">
            {/* ==== Sidebar escritorio ==== */}
            <nav className="sidebar-admin bg-dark text-white d-none d-lg-flex flex-column p-3">
                <h5 className="mb-4 text-center">
                    <i className="fa-solid fa-building me-2"></i>Company name
                </h5>

                <ul className="nav-admin flex-column mb-auto">
                    <li>
                        <Link to="/admin" className={`nav-link text-white ${isActive("/admin")}`}>
                            <i className="fa fa-chart-line me-2"></i>Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/ordenes" className={`nav-link text-white ${isActive("/admin/ordenes")}`}>
                            <i className="fa fa-file-invoice me-2"></i>Órdenes
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/productos" className={`nav-link text-white ${isActive("/admin/productos")}`}>
                            <i className="fa fa-box me-2"></i>Productos
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/categorias" className={`nav-link text-white ${isActive("/admin/categorias")}`}>
                            <i className="fa fa-tags me-2"></i>Categorías
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/usuarios" className={`nav-link text-white ${isActive("/admin/usuarios")}`}>
                            <i className="fa fa-users me-2"></i>Usuarios
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/reportes" className={`nav-link text-white ${isActive("/admin/reportes")}`}>
                            <i className="fa fa-chart-bar me-2"></i>Reportes
                        </Link>
                    </li>
                </ul>

                <hr className="border-secondary" />

                <div className="mt-auto">
                    <Link to="/admin/perfil" className="nav-link text-white mb-2">
                        <i className="fa fa-user-circle me-2"></i>Perfil
                    </Link>

                    <Link to="/" className="btn btn-sm btn-secondary w-100 mb-2 text-white text-start">
                        <i className="fa fa-store me-2"></i>Tienda
                    </Link>

                    <button className="btn btn-sm btn-danger w-100 text-start">
                        <i className="fa fa-sign-out-alt me-2"></i>Cerrar Sesión
                    </button>
                </div>
            </nav>

            {/* ==== Navbar móvil ==== */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-lg-none w-100 fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/admin">
                        <i className="fa-solid fa-building me-2"></i>Company name
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuMobile"
                        aria-controls="menuMobile"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="menuMobile">
                        <ul className="navbar-nav ms-auto">
                            <li><Link to="/admin" className="nav-link"><i className="fa fa-chart-line me-2"></i>Dashboard</Link></li>
                            <li><Link to="/admin/ordenes" className="nav-link"><i className="fa fa-file-invoice me-2"></i>Órdenes</Link></li>
                            <li><Link to="/admin/productos" className="nav-link"><i className="fa fa-box me-2"></i>Productos</Link></li>
                            <li><Link to="/admin/categorias" className="nav-link"><i className="fa fa-tags me-2"></i>Categorías</Link></li>
                            <li><Link to="/admin/usuarios" className="nav-link"><i className="fa fa-users me-2"></i>Usuarios</Link></li>
                            <li><Link to="/admin/reportes" className="nav-link"><i className="fa fa-chart-bar me-2"></i>Reportes</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link to="/admin/perfil" className="nav-link"><i className="fa fa-user-circle me-2"></i>Perfil</Link></li>
                            <li><Link to="/" className="nav-link"><i className="fa fa-store me-2"></i>Tienda</Link></li>
                            <li><button className="btn btn-danger w-100 mt-2"><i className="fa fa-sign-out-alt me-2"></i>Cerrar sesión</button></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* ==== Contenido principal ==== */}
            <main className="main-admin bg-light">
                <Outlet />
            </main>
        </div>
    );
};
