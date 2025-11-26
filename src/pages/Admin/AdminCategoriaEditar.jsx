import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryById,
  getCategories,
  updateCategory,
} from "../../api/categories";

const slugify = (s) =>
  (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const AdminCategoriaEditar = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState(true); // solo visual
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(true);

  const slug = useMemo(() => slugify(nombre), [nombre]);

  // Cargar categoría y lista para validar duplicados
  useEffect(() => {
    const cargar = async () => {
      try {
        const [lista, cat] = await Promise.all([
          getCategories(),
          getCategoryById(id),
        ]);
        setCategorias(lista);

        if (!cat) {
          nav("/admin/categorias", { replace: true });
          return;
        }

        setNombre(cat.nombre ?? "");
        setDescripcion(cat.descripcion ?? "");
        setActivo(cat.activo ?? true); //leer del backend
      } catch (e) {
        console.error("Error cargando categoría:", e);
        nav("/admin/categorias", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [id, nav]);

  const existsOther = useMemo(
    () =>
      categorias.some(
        (c) => slugify(c.nombre) === slug && String(c.id) !== String(id)
      ),
    [categorias, slug, id]
  );

  const save = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!nombre.trim() || existsOther) return;

    const payload = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      activo,
    };

    try {
      await updateCategory(id, payload);
      alert("Categoría actualizada correctamente");
      nav("/admin/categorias", { replace: true });
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      alert("No se pudo actualizar la categoría");
    }
  };

  if (loading) return <p className="text-center py-4">Cargando categoría...</p>;

  return (
    <div className="container py-3">
      <h2 className="mb-3">
        <i className="fa fa-edit me-2"></i>Editar categoría
      </h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={save} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                className={`form-control ${
                  touched && (!nombre.trim() || existsOther) ? "is-invalid" : ""
                }`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onBlur={() => setTouched(true)}
                required
              />
              {touched && !nombre.trim() && (
                <div className="invalid-feedback">Ingresa un nombre.</div>
              )}
              {touched && existsOther && (
                <div className="invalid-feedback">
                  Ya existe otra categoría con ese slug.
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Slug</label>
              <input className="form-control" value={slug} disabled />
            </div>

            <div className="col-12">
              <label className="form-label">Descripción (opcional)</label>
              <textarea
                className="form-control"
                rows="3"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="col-12 form-check">
              <input
                id="chk"
                type="checkbox"
                className="form-check-input"
                checked={activo}
                onChange={(e) => setActivo(e.target.checked)}
              />
              <label htmlFor="chk" className="form-check-label">
                Activa
              </label>
              <div className="form-text">
              </div>
            </div>

            <div className="col-12 d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!nombre.trim() || existsOther}
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => nav("/admin/categorias")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
