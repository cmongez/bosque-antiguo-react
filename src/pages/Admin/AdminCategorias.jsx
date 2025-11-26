// src/pages/Admin/AdminCategorias.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, deleteCategory } from "../../api/categories";

const slugify = (s) =>
  (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const AdminCategorias = () => {
  const nav = useNavigate();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarCategorias = async () => {
    try {
      const data = await getCategories();
      setCats(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      alert("No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Desactivar esta categoría?")) return;
    try {
      await deleteCategory(id);
      await cargarCategorias();
    } catch (error) {
      console.error("Error al desactivar categoría:", error);
      alert("No se pudo desactivar la categoría");
    }
  };

  if (loading) return <p className="text-center py-4">Cargando categorías...</p>;

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Categorías</h2>
        <Link to="/admin/categorias/nueva" className="btn btn-success">
          + Nueva categoría
        </Link>
      </div>

      {cats.length === 0 ? (
        <p>No hay categorías todavía.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Slug</th>
              <th>Activa</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>
                  <span className="badge text-bg-secondary">
                    {slugify(c.nombre)}
                  </span>
                </td>
                <td>{c.activo ? "Sí" : "No"}</td>
                <td className="text-end">
                  <Link
                    to={`/admin/categorias/editar/${c.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminar(c.id)}
                  >
                    Desactivar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="btn btn-outline-secondary mt-3"
        onClick={() => nav(-1)}
      >
        Volver
      </button>
    </div>
  );
};
