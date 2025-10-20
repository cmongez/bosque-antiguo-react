import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export const AdminLayout = () => {
    const { pathname } = useLocation();

    const isActive = (path) => pathname === path ? "active" : "";

    return (
        <div className="d-flex min-vh-100">
            {/* Sidebar escritorio */}
            <nav className="sidebar bg-success text-white d-none d-lg-flex flex-column p-3">
                <h4 className="mb-4">
                    <i className="fa-solid fa-leaf me-2"></i> Admin
                </h4>
                <ul className="nav flex-column">
                    <li>
                        <Link to="/admin" className={`nav-link text-white ${isActive("/admin")}`}>
                            <i className="fa fa-home me-2"></i>Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/usuarios" className={`nav-link text-white ${isActive("/admin/usuarios")}`}>
                            <i className="fa fa-users me-2"></i>Usuarios
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="nav-link text-white">
                            <i className="fa fa-cogs me-2"></i>Salir
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Navbar móvil */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-success d-lg-none w-100">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/admin">
                        <i className="fa-solid fa-leaf"></i> Admin
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuMobile"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="menuMobile">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/admin" className="nav-link"><i className="fa fa-home me-2"></i>Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/usuarios" className="nav-link"><i className="fa fa-users me-2"></i>Usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link"><i className="fa fa-cogs me-2"></i>Salir</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Contenido */}
            <main className="flex-grow-1 p-4 bg-light">
                <Outlet />
            </main>
        </div>
    );
};
