import React from "react";
import { useParams, Link } from "react-router-dom";

export const AdminBoleta = () => {
    const { id } = useParams();

    const orden = {
        id,
        fecha: "2025-10-19",
        cliente: "Juan Pérez",
        correo: "juan@gmail.com",
        direccion: "Av. Siempre Viva 123, Santiago",
        total: 40000,
        estado: "Pagada",
        productos: [
            { nombre: "Ficus", cantidad: 1, precio: 10000 },
            { nombre: "Sansevieria", cantidad: 1, precio: 15000 },
            { nombre: "Compost", cantidad: 1, precio: 15000 },
        ],
    };


    const clp = (n) =>
        new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);

    return (
        <div className="container-fluid py-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>
                    <i className="fa fa-file-invoice me-2"></i>Boleta #{orden.id}
                </h2>
                <Link to="/admin/ordenes" className="btn btn-outline-secondary">
                    <i className="fa fa-arrow-left me-2"></i>Volver a Órdenes
                </Link>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5>Información del cliente</h5>
                    <p className="mb-1"><strong>Nombre:</strong> {orden.cliente}</p>
                    <p className="mb-1"><strong>Correo:</strong> {orden.correo}</p>
                    <p className="mb-1"><strong>Dirección:</strong> {orden.direccion}</p>
                    <p><strong>Fecha:</strong> {orden.fecha}</p>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5>Detalle de productos</h5>
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Producto</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-end">Precio</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orden.productos.map((p, i) => (
                                    <tr key={i}>
                                        <td>{p.nombre}</td>
                                        <td className="text-center">{p.cantidad}</td>
                                        <td className="text-end">{clp(p.precio)}</td>
                                        <td className="text-end">{clp(p.precio * p.cantidad)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="3" className="text-end">Total</th>
                                    <th className="text-end">{clp(orden.total)}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="mt-3">
                        <span className={`badge ${orden.estado === "Pagada" ? "bg-success" : "bg-warning text-dark"}`}>
                            {orden.estado}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
