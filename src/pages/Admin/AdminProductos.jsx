import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, updateProduct } from "../../api/products";

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
      if (!producto) return;
      
      // Actualizar en el backend
      await updateProduct(productId, { disponible: !producto.disponible });
      
      // Recargar la lista de productos desde el backend
      const data = await getProducts();
      setProductos(data);
      localStorage.setItem("productos", JSON.stringify(data));
      
      alert(`Producto ${!producto.disponible ? 'activado' : 'desactivado'} correctamente`);
    } catch (error) {
      console.error('Error al cambiar disponibilidad:', error);
      alert('Error al actualizar el producto');
    }
  };
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
                            <small className="text-warning">⚠️ Stock bajo</small>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${p.disponible ? 'bg-success' : 'bg-danger'}`}>
                          {p.disponible ? "Sí" : "No"}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button 
                            onClick={() => toggleDisponible(p.codigo)} 
                            className={`btn btn-sm ${p.disponible ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            title={p.disponible ? 'Desactivar producto' : 'Activar producto'}>
                            {p.disponible ? 'Desactivar' : 'Activar'}
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
