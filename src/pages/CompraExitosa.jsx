import React from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'

const clp = n => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n)

export const CompraExitosa = () => {
    const { state } = useLocation()
    const { orderId } = useParams()
    const { form, rows, total } = state || {}

    return (
        <div className="container py-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h3 className="text-success mb-3">
                        ✅ Se ha realizado la compra. <small className="text-muted">nro #{orderId}</small>
                    </h3>

                    <h5 className="mb-3">Dirección de entrega</h5>
                    <p className="mb-1"><strong>Nombre:</strong> {form?.name}</p>
                    <p className="mb-1"><strong>Correo:</strong> {form?.email}</p>
                    <p className="mb-3"><strong>Dirección:</strong> {form?.address}</p>
                    {form?.notes && <p><strong>Notas:</strong> {form.notes}</p>}

                    <h5 className="mt-4 mb-2">Detalle de la compra</h5>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows?.map(r => (
                                    <tr key={r.codigo}>
                                        <td>{r.nombre}</td>
                                        <td className="text-center">{r.cantidad}</td>
                                        <td className="text-end">{clp(r.subtotal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-end fw-bold h5 mt-3">
                        Total pagado: {clp(total)}
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button className="btn btn-outline-danger">Imprimir boleta en PDF</button>
                        <button className="btn btn-success">Enviar boleta por email</button>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/productos" className="btn btn-outline-secondary">Volver a la tienda</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
