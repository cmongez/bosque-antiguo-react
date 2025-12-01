import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../api/orders";
import { getProducts } from "../../api/products";

export const AdminHome = () => {
    const [salesSummary, setSalesSummary] = useState({
        cantidadVentas: 0,
        totalVentas: 0,
        totalMes: 0,
        promedioVenta: 0
    });
    const [stockStatus, setStockStatus] = useState({
        criticos: 0,
        agotados: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [ordenes, productos] = await Promise.all([
                    getAllOrders(),
                    getProducts()
                ]);
                
                // Calcular estadísticas de ventas
                const totalVentas = ordenes.reduce((sum, orden) => sum + orden.total, 0);
                const cantidadVentas = ordenes.length;
                
                // Ventas del mes actual
                const fechaActual = new Date();
                const mesActual = fechaActual.getMonth();
                const añoActual = fechaActual.getFullYear();
                
                const ventasMes = ordenes.filter(orden => {
                    const fechaOrden = new Date(orden.fecha);
                    return fechaOrden.getMonth() === mesActual && fechaOrden.getFullYear() === añoActual;
                });
                
                const totalMes = ventasMes.reduce((sum, orden) => sum + orden.total, 0);
                const promedioVenta = cantidadVentas > 0 ? totalVentas / cantidadVentas : 0;
                
                setSalesSummary({
                    cantidadVentas,
                    totalVentas,
                    totalMes,
                    promedioVenta
                });
                
                // Calcular stock crítico y agotado
                const criticos = productos.filter(p => p.stock > 0 && p.stock <= p.stockCritico).length;
                const agotados = productos.filter(p => p.stock === 0).length;
                
                setStockStatus({
                    criticos,
                    agotados
                });
                
            } catch (error) {
                console.error('Error cargando datos del dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    if (loading) {
        return (
            <div className="container-fluid py-4 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    const formatCurrency = (amount) => 
        new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount || 0);

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-3">Dashboard</h2>
            <p className="text-muted mb-4">Resumen de las actividades del negocio</p>

            {/* === Tarjetas superiores === */}
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card text-white bg-primary h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fa fa-shopping-cart me-2"></i>Ventas Totales
                            </h5>
                            <h3 className="fw-bold">{salesSummary?.cantidadVentas || 0}</h3>
                            <p className="mb-0">Total: {formatCurrency(salesSummary?.totalVentas)}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-success h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fa fa-calendar me-2"></i>Este Mes
                            </h5>
                            <h3 className="fw-bold">{formatCurrency(salesSummary?.totalMes)}</h3>
                            <p className="mb-0">Promedio: {formatCurrency(salesSummary?.promedioVenta)}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-warning h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fa fa-exclamation-triangle me-2"></i>Stock Crítico
                            </h5>
                            <h3 className="fw-bold">{stockStatus.criticos}</h3>
                            <p className="mb-0">Productos con bajo stock</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-danger h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fa fa-times-circle me-2"></i>Agotados
                            </h5>
                            <h3 className="fw-bold">{stockStatus.agotados}</h3>
                            <p className="mb-0">Productos sin stock</p>
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

                {/* <div className="col-md-3 col-sm-6">
                    <Link to="/admin/reportes" className="text-decoration-none">
                        <div className="card h-100 shadow-sm text-center p-4 hover-scale">
                            <i className="fa fa-chart-bar fa-2x text-primary mb-3"></i>
                            <h6 className="fw-bold">Reportes</h6>
                            <p className="text-muted small">
                                Generación de informes detallados sobre las operaciones.
                            </p>
                        </div>
                    </Link>
                </div> */}

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
