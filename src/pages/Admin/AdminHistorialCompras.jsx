import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrdersByUserId } from "../../api/orders";
import { getUserById } from "../../api/users";

export const AdminHistorialCompras = () => {
    const { id } = useParams();
    const [compras, setCompras] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const [comprasData, usuarioData] = await Promise.all([
                    getOrdersByUserId(parseInt(id)),
                    getUserById(parseInt(id))
                ]);
                setCompras(comprasData);
                setUsuario(usuarioData);
            } catch (err) {
                console.error('Error al cargar historial:', err);
                setError('Error al cargar el historial de compras');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            cargarDatos();
        }
    }, [id]);

    const clp = (n) =>
        new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(n);

    if (loading) {
        return (
            <div className="container-fluid py-4">
                <div className="text-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Cargando historial...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-fluid py-4">
                <div className="alert alert-danger text-center">
                    <h4>Error</h4>
                    <p>{error}</p>
                    <Link to="/admin/usuarios" className="btn btn-outline-danger">
                        Volver a Usuarios
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0">
                        <i className="fa fa-history me-2"></i>Historial de Compras
                    </h2>
                    {usuario && (
                        <p className="text-muted mb-0">
                            {usuario.nombre} {usuario.apellido} ({usuario.email})
                        </p>
                    )}
                </div>
                <Link to="/admin/usuarios" className="btn btn-outline-secondary">
                    <i className="fa fa-arrow-left me-1"></i> Volver
                </Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    {compras.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fa fa-shopping-cart fa-3x text-muted mb-3"></i>
                            <h4>Sin compras registradas</h4>
                            <p className="text-muted">
                                Este usuario aún no ha realizado ninguna compra.
                            </p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table align-middle table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID Compra</th>
                                        <th>Fecha</th>
                                        <th>Productos</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {compras.map((c) => (
                                        <tr key={c.id}>
                                            <td>#{c.id}</td>
                                            <td>{new Date(c.fecha).toLocaleDateString('es-CL')}</td>
                                            <td>
                                                <span className="badge bg-info">
                                                    {c.detalles?.length || 0} productos
                                                </span>
                                            </td>
                                            <td>{clp(c.total)}</td>
                                            <td>
                                                <span className="badge bg-success">
                                                    Completada
                                                </span>
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/admin/ordenes/${c.id}`}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    <i className="fa fa-eye me-1"></i> Ver detalles
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
