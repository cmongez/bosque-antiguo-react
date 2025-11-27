import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const clp = (n) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);

export const MisCompras = () => {
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMisCompras = async () => {
            try {
                const { getMisCompras } = await import('../api/orders');
                const data = await getMisCompras(); // Esto llamará a /sales/mis-compras
                setCompras(data || []);
            } catch (err) {
                console.error('Error al cargar compras:', err);
                setError('No se pudieron cargar las compras. ¿Estás autenticado?');
            } finally {
                setLoading(false);
            }
        };

        cargarMisCompras();
    }, []);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando tus compras...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Mis Compras</h2>
                <Link to="/productos" className="btn btn-success">
                    <i className="fa fa-plus me-2"></i>Seguir Comprando
                </Link>
            </div>

            {compras.length === 0 ? (
                <div className="text-center py-5">
                    <i className="fa fa-shopping-bag fa-3x text-muted mb-3"></i>
                    <h4>No tienes compras aún</h4>
                    <p className="text-muted">Explora nuestros productos y haz tu primera compra.</p>
                    <Link to="/productos" className="btn btn-primary">Ver Productos</Link>
                </div>
            ) : (
                <div className="row g-3">
                    {compras.map((compra) => (
                        <div key={compra.id} className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5 className="card-title">
                                                Orden #{compra.id}
                                            </h5>
                                            <p className="text-muted mb-2">
                                                <i className="fa fa-calendar me-2"></i>
                                                {new Date(compra.fecha).toLocaleDateString('es-CL', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <p className="mb-2">
                                                <strong>Productos:</strong> {compra.detalles?.length || 0} items
                                            </p>
                                            {compra.detalles && compra.detalles.length > 0 && (
                                                <div className="small text-muted">
                                                    {compra.detalles.map((detalle, idx) => (
                                                        <span key={idx}>
                                                            Producto {detalle.productoId} (x{detalle.cantidad})
                                                            {idx < compra.detalles.length - 1 && ', '}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-4 text-md-end">
                                            <h4 className="text-success mb-3">
                                                {clp(compra.total)}
                                            </h4>
                                            <Link 
                                                to={`/compra-detalle/${compra.id}`} 
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                Ver Detalle
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};