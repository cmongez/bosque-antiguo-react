import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";

export const AdminProductos = () => {
  const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const cargarProductos = async () => {
        try {
          const data = await getProducts()
          setProductos(data)
          localStorage.setItem("productos", JSON.stringify(data))
        } catch (error) {
          console.error("Error al cargar productos: ", error)
        } finally {
          setLoading(false)
        }
      }
  
      cargarProductos()
    }, [])


  const clp = (n) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(n);

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
                      <h2 className="mb-0"><i className="fa fa-tags me-2"></i>Productos</h2>
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
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => {
                  // Cambiamos './../' → './../../' para que coincida con la profundidad real
                  const fixedImgPath = p.img.replace("./../", "./../../");
                  const imageUrl = new URL(fixedImgPath, import.meta.url).href;

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

                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-primary">
                            <i className="fa fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                          {/*  nuevo botón para historial */}
                          <Link
                            to={`/admin/usuarios/${p.codigo}/historial`}
                            className="btn btn-sm btn-secondary"
                          >
                            <i className="fa fa-history"></i>
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
