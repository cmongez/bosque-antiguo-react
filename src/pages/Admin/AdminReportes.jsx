import React from 'react'
import { Link } from 'react-router-dom'

export const AdminReportes = () => {
    return (
        <div className="container py-4">
            <h2 className="mb-4">Reportes</h2>
            <div className="card p-4">
                <p>Genera informes sobre ventas, usuarios y productos.</p>
                <Link to="/admin" className="btn btn-success mt-3">
                    <i className="fa fa-arrow-left me-2"></i>Volver al Dashboard
                </Link>
            </div>
        </div>
    )
}
