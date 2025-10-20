import React from "react";
import { Link } from "react-router-dom";

export const AdminHome = () => {
    return (
        <div className="container-fluid py-4">
            <h2 className="mb-3">Dashboard</h2>
            <p className="text-muted mb-4">Resumen de las actividades diarias</p>

            {/* === Tarjetas superiores === */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fa fa-shopping-cart me-2"></i>Compras
                            </h5>
                            <h3 className="fw-bold">1,234</h3>
                            <p className="mb-0">Probabilidad de aumento: <b>20%</b></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-white bg-success h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fa fa-box me-2"></i>Productos
                            </h5>
                            <h3 className="fw-bold">400</h3>
                            <p className="mb-0">Inventario actual: <b>500</b></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-white bg-warning h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fa fa-users me-2"></i>Usuarios
                            </h5>
                            <h3 className="fw-bold">890</h3>
                            <p className="mb-0">Nuevos usuarios este mes: <b>120</b></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Accesos rápidos === */}
            <div className="row g-3">
                <div className="col-md-3 col-sm-6">
                    <Link to="/admin" className="text-decoration-none">
                        <div className="card h-100 shadow-sm text-center p-4 hover-scale">
                            <i className="fa fa-chart-line fa-2x text-primary mb-3"></i>
                            <h6 className="fw-bold">Dashboard</h6>
                            <p className="text-muted small">
                                Visión general de las métricas y estadísticas del sistema.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 col-sm-6">
                    <Link to="/admin/ordenes" className="text-decoration-none">
                        <div className="card h-100 shadow-sm text-center p-4 hover-scale">
                            <i className="fa fa-file-invoice fa-2x text-success mb-3"></i>
                            <h6 className="fw-bold">Órdenes</h6>
                            <p className="text-muted small">
                                Gestión y seguimiento de todas las órdenes de compra.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 col-sm-6">
                    <Link to="/admin/productos" className="text-decoration-none">
                        <div className="card h-100 shadow-sm text-center p-4 hover-scale">
                            <i className="fa fa-box-open fa-2x text-success mb-3"></i>
                            <h6 className="fw-bold">Productos</h6>
                            <p className="text-muted small">
                                Administración del inventario y detalles de los productos.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 col-sm-6">
                    <Link to="/admin/categorias" className="text-decoration-none">
                        <div className="card h-100 shadow-sm text-center p-4 hover-scale">
                            <i className="fa fa-tags fa-2x text-info mb-3"></i>
                            <h6 className="fw-bold">Categorías</h6>
                            <p className="text-muted small">
                                Organización de productos por categorías.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 col-sm-6">
                    <Link to="/admin/usuarios" className="text-decoration-none">
                        <div className="card h-100 shadow-sm text-center p-4 hover-scale">
                            <i className="fa fa-user fa-2x text-warning mb-3"></i>
                            <h6 className="fw-bold">Usuarios</h6>
                            <p className="text-muted small">
                                Gestión de cuentas de usuario y sus roles.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 col-sm-6">
                    <Link to="/admin/reportes" className="text-decoration-none">
                        <div className="card h-100 shadow-sm text-center p-4 hover-scale">
                            <i className="fa fa-chart-bar fa-2x text-primary mb-3"></i>
                            <h6 className="fw-bold">Reportes</h6>
                            <p className="text-muted small">
                                Generación de informes detallados sobre las operaciones.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 col-sm-6">
                    <Link to="/admin/perfil" className="text-decoration-none">
                        <div className="card h-100 shadow-sm text-center p-4 hover-scale">
                            <i className="fa fa-user-circle fa-2x text-secondary mb-3"></i>
                            <h6 className="fw-bold">Perfil</h6>
                            <p className="text-muted small">
                                Administración de la información personal del administrador.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3 col-sm-6">
                    <Link to="/" className="text-decoration-none">
                        <div className="card h-100 shadow-sm text-center p-4 hover-scale">
                            <i className="fa fa-store fa-2x text-danger mb-3"></i>
                            <h6 className="fw-bold">Tienda</h6>
                            <p className="text-muted small">
                                Visualiza tu tienda en tiempo real y revisa la actividad.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
