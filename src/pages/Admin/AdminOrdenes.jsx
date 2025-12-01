import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../api/orders";
import { getAllUsers } from "../../api/users";

export const AdminOrdenes = () => {
    const [filtro, setFiltro] = useState("");
    const [ordenes, setOrdenes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);
                const [ordenesData, usuariosData] = await Promise.all([
                    getAllOrders(),
                    getAllUsers()
                ]);
                setOrdenes(ordenesData);
                setUsuarios(usuariosData);
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError('Error al cargar las órdenes y usuarios');
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    // Función para obtener usuario por ID
    const getUsuarioById = (usuarioId) => {
        return usuarios.find(u => u.id === usuarioId);
    };

    const clp = (n) =>
        new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(n);

    const filtradas = ordenes
        .filter((o) => {
            const usuario = getUsuarioById(o.usuarioId);
            return usuario?.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
                   usuario?.email?.toLowerCase().includes(filtro.toLowerCase()) ||
                   o.id.toString().includes(filtro);
        })
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha desc (más reciente primero)

    if (loading) {
        return (
            <div className="container-fluid py-4">
                <div className="text-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Cargando órdenes...</span>
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
                    <button 
                        className="btn btn-outline-danger" 
                        onClick={() => window.location.reload()}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                    <i className="fa fa-file-invoice me-2"></i>Órdenes / Boletas
                </h2>
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    className="form-control w-auto"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table align-middle table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtradas.map((orden) => {
                                    const usuario = getUsuarioById(orden.usuarioId);
                                    return (
                                        <tr key={orden.id}>
                                            <td>#{orden.id}</td>
                                            <td>{new Date(orden.fecha).toLocaleDateString('es-CL')}</td>
                                            <td>
                                                <div>
                                                    <strong>{usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario no encontrado'}</strong>
                                                    <br />
                                                    <small className="text-muted">{usuario?.email || 'N/A'}</small>
                                                </div>
                                            </td>
                                            <td>{clp(orden.total)}</td>
                                            <td>
                                                <span className="badge bg-success">
                                                    Completada
                                                </span>
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/admin/ordenes/${orden.id}`}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    <i className="fa fa-eye me-1"></i> Ver detalles
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filtradas.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted py-4">
                                            No se encontraron órdenes.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
