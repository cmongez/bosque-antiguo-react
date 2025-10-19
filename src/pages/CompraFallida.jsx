import React from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'

const clp = n => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n)

export const CompraFallida = () => {
    const { state } = useLocation()
    const { orderId } = useParams()
    const { rows, total } = state || {}

    return (
        <div className="container py-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h3 className="text-danger mb-3">
                        ❌ No se pudo realizar el pago. <small className="text-muted">nro #{orderId}</small>
                    </h3>

                    <div className="text-center mb-4">
                        <Link to="/checkout" className="btn btn-success">Volver a realizar el pago</Link>
                    </div>

                    <h5 className="mb-3">Detalle de los productos</h5>
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
                </div>
            </div>
        </div>
    )
}