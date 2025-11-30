import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, updateProductDisponibilidad } from "../../api/products";

export const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProducts();
        setProductos(data);
        localStorage.setItem("productos", JSON.stringify(data));
      } catch (error) {
        console.error("Error al cargar productos: ", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const clp = (n) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(n);

  const toggleDisponible = async (productId) => {
    try {
      const producto = productos.find(p => p.codigo === productId);
      if (!producto) {
        console.error('Producto no encontrado con ID:', productId);
        return;
      }
      
      
      const disponibilidadActual = producto.disponible === true;
      
      // Actualizar solo la disponibilidad en el backend usando PATCH
      await updateProductDisponibilidad(productId, !disponibilidadActual);
      // Recargar la lista de productos desde el backend
      const data = await getProducts();
      setProductos(data);
      localStorage.setItem("productos", JSON.stringify(data));
      
      alert(`Producto ${!disponibilidadActual ? 'activado' : 'desactivado'} correctamente`);
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      alert('Error al actualizar el producto: ' + error.message);
    }
  };
  if (loading) {
    return (
      <div className="container-fluid py-3">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fa fa-tags me-2"></i>Productos
        </h2>
        <div>
          <Link to="/admin/productos/nuevo" className="btn btn-success">
            <i className="fa fa-plus me-2"></i>Nuevo Producto
          </Link>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-success">
                <tr>
                  <th>Código</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Disponible</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => {
                  // Usar la imagen directamente desde el backend o placeholder
                  const imageUrl = p.img || 'https://via.placeholder.com/60x60?text=Sin+Imagen';

                  return (
                    <tr key={p.codigo}>
                      <td>#{p.codigo}</td>
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
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60x60?text=Sin+Imagen';
                          }}
                        />
                      </td>
                      <td>
                        <div>
                          <strong>{p.nombre}</strong>
                          {p.descripcion && <div className="text-muted small">{p.descripcion.substring(0, 50)}...</div>}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{p.categoria}</span>
                      </td>
                      <td>{clp(p.precio)}</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className={`badge ${p.stock <= (p.stockCritico || 5) ? 'bg-warning text-dark' : 'bg-info'}`}>
                            {p.stock || 0} unidades
                          </span>
                          {p.stock <= (p.stockCritico || 5) && (
                            <small className="text-warning">Stock bajo</small>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${p.disponible === true ? 'bg-success' : 'bg-danger'}`}>
                          {p.disponible === true ? "Sí" : "No"}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button 
                            onClick={() => toggleDisponible(p.codigo)} 
                            className={`btn btn-sm ${p.disponible === true ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            title={p.disponible === true ? 'Desactivar producto' : 'Activar producto'}>
                            {p.disponible === true ? 'Desactivar' : 'Activar'}
                          </button>
                          <Link 
                            to={`/admin/productos/editar/${p.codigo}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Editar producto">
                            <i className="fa fa-edit"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {productos.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No se han registrado productos.
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
