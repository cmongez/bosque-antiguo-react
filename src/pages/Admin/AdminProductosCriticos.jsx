import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/products";

export const AdminProductosCriticos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await getProducts();
                setProductos(data);
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError("Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, []);

    const productosCriticos = productos.filter((p) => p.stock > 0 && p.stock <= p.stockCritico);
    const productosAgotados = productos.filter((p) => p.stock === 0);

    const clp = (n) =>
        new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(n);

    if (loading) {
        return (
            <div className="container-fluid py-3">
                <div className="text-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Cargando productos...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-fluid py-3">
                <div className="alert alert-danger text-center">
                    <h4>Error</h4>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>
                        <i className="fa fa-exclamation-triangle me-2 text-warning"></i>
                        Gestión de Stock
                    </h2>
                    <p className="text-muted mb-0">
                        Stock crítico: {productosCriticos.length} | Agotados: {productosAgotados.length}
                    </p>
                </div>
            </div>

            {/* Productos en Stock Crítico */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-warning">
                    <h5 className="mb-0">
                        <i className="fa fa-exclamation-triangle me-2"></i>
                        Productos en Stock Crítico ({productosCriticos.length})
                    </h5>
                </div>
                <div className="card-body">
                    {productosCriticos.length === 0 ? (
                        <p className="text-muted text-center py-3">
                            ¡Excelente! No hay productos con stock crítico.
                        </p>
                    ) : (
                        <>
                            <p className="text-muted">
                                Los siguientes productos tienen un stock igual o inferior al nivel
                                crítico definido.
                            </p>
                            <div className="table-responsive">
                                <table className="table align-middle table-hover">
                                    <thead className="table-danger">
                                        <tr>
                                            <th>Código</th>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Categoría</th>
                                            <th>Precio</th>
                                            <th>Stock actual</th>
                                            <th>Stock crítico</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productosCriticos.map((p) => {
                                            const imageUrl = p.img ? new URL(p.img, import.meta.url).href : '/placeholder-image.jpg';

                                            return (
                                                <tr key={p.codigo}>
                                                    <td>{p.codigo}</td>
                                                    <td>
                                                        <img
                                                            src={imageUrl}
                                                            alt={p.nombre}
                                                            style={{
                                                                width: "60px",
                                                                height: "60px",
                                                                objectFit: "cover",
                                                                borderRadius: "5px",
                                                            }}
                                                        />
                                                    </td>
                                                    <td>{p.nombre}</td>
                                                    <td>{p.categoria}</td>
                                                    <td>{clp(p.precio)}</td>
                                                    <td className="text-danger fw-bold">{p.stock}</td>
                                                    <td>{p.stockCritico}</td>
                                        
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Productos Agotados */}
            <div className="card shadow-sm">
                <div className="card-header bg-danger text-white">
                    <h5 className="mb-0">
                        <i className="fa fa-times-circle me-2"></i>
                        Productos Agotados ({productosAgotados.length})
                    </h5>
                </div>
                <div className="card-body">
                    {productosAgotados.length === 0 ? (
                        <p className="text-muted text-center py-3">
                            ¡Perfecto! No hay productos agotados.
                        </p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table align-middle table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Código</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosAgotados.map((p) => {
                                        const imageUrl = p.img ? new URL(p.img, import.meta.url).href : '/placeholder-image.jpg';

                                        return (
                                            <tr key={p.codigo}>
                                                <td>{p.codigo}</td>
                                                <td>
                                                    <img
                                                        src={imageUrl}
                                                        alt={p.nombre}
                                                        style={{
                                                            width: "60px",
                                                            height: "60px",
                                                            objectFit: "cover",
                                                            borderRadius: "5px",
                                                        }}
                                                    />
                                                </td>
                                                <td>{p.nombre}</td>
                                                <td>{p.categoria}</td>
                                                <td>{clp(p.precio)}</td>
                                                <td className="text-danger fw-bold">AGOTADO</td>
                             
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
