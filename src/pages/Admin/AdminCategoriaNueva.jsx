import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, createCategory } from "../../api/categories";

const slugify = (s) =>
  (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const AdminCategoriaNueva = () => {
  const nav = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const slug = useMemo(() => slugify(nombre), [nombre]);
  const [descripcion, setDescripcion] = useState("");
  const [activo, setActivo] = useState(true); // solo visual por ahora
  const [touched, setTouched] = useState(false);

  // cargar categorías existentes para validar duplicados de slug
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getCategories();
        setCategorias(data);
      } catch (e) {
        console.error("Error cargando categorías:", e);
      }
    };
    cargar();
  }, []);

  const exists = useMemo(
    () =>
      categorias.some(
        (c) => slugify(c.nombre) === slug // comparamos slug calculado
      ),
    [categorias, slug]
  );

  const submit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!nombre.trim() || !slug || exists) return;

    const payload = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      activo,
    };

    try {
      await createCategory(payload);
      alert("Categoría creada correctamente");
      nav("/admin/categorias", { replace: true });
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert("No se pudo crear la categoría");
    }
  };

  return (
    <div className="container py-3">
      <h2 className="mb-3">
        <i className="fa fa-plus me-2"></i>Nueva categoría
      </h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={submit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                className={`form-control ${
                  touched && (!nombre.trim() || exists) ? "is-invalid" : ""
                }`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="Ej: Plantas de interior"
                required
              />
              {touched && !nombre.trim() && (
                <div className="invalid-feedback">Ingresa un nombre.</div>
              )}
              {touched && exists && (
                <div className="invalid-feedback">
                  Ya existe una categoría con este nombre/slug.
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
                className="btn btn-success"
                disabled={!nombre.trim() || !slug || exists}
              >
                Guardar
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
