import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, createCategory } from "../../api/products";

const slugify = (s) =>
    (s || "")
        .toString()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

export const AdminCategoriaNueva = () => {
    const nav = useNavigate();
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState("");
    const slug = useMemo(() => slugify(nombre), [nombre]);
    const [descripcion, setDescripcion] = useState("");
    const [activo, setActivo] = useState(true);
    const [touched, setTouched] = useState(false);

    // Cargar categorías existentes para validar duplicados
    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const categoriasData = await getCategories();
                setCats(categoriasData);
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
        };
        
        cargarCategorias();
    }, []);

    const exists = useMemo(
        () => cats.some(c => c.slug === slug),
        [cats, slug]
    );

    const submit = async (e) => {
        e.preventDefault();
        setTouched(true);
        
        if (!nombre.trim()) {
            alert('El nombre de la categoría es requerido');
            return;
        }
        
        if (!slug) {
            alert('No se pudo generar el slug para la categoría');
            return;
        }
        
        if (exists) {
            alert('Ya existe una categoría con este nombre');
            return;
        }
        
        try {
            setLoading(true);
            
            // Crear nueva categoría usando la API
            const nuevaCategoria = {
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                activo,
                slug
            };
            
            await createCategory(nuevaCategoria);
            
            alert('Categoría creada correctamente');
            nav("/admin/categorias", { replace: true });
            
        } catch (error) {
            console.error('Error al crear categoría:', error);
            alert('Error al crear la categoría: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-3">
            <h2 className="mb-3"><i className="fa fa-plus me-2"></i>Nueva categoría</h2>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={submit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input
                                className={`form-control ${touched && (!nombre.trim() || exists) ? "is-invalid" : ""}`}
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                onBlur={() => setTouched(true)}
                                placeholder="Ej: Plantas de interior"
                                required
                            />
                            {touched && !nombre.trim() && <div className="invalid-feedback">Ingresa un nombre.</div>}
                            {touched && exists && <div className="invalid-feedback">Ya existe una categoría con este nombre/slug.</div>}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Slug</label>
                            <input className="form-control" value={slug} disabled />
                        </div>

                        <div className="col-12">
                            <label className="form-label">Descripción (opcional)</label>
                            <textarea className="form-control" rows="3" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                        </div>

                        <div className="col-12 form-check">
                            <input id="chk" type="checkbox" className="form-check-input" checked={activo} onChange={e => setActivo(e.target.checked)} />
                            <label htmlFor="chk" className="form-check-label">Activa</label>
                        </div>

                        <div className="col-12 d-flex gap-2">
                            <button type="submit" className="btn btn-success" disabled={loading || !nombre.trim() || !slug || exists}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Guardando...
                                    </>
                                ) : (
                                    'Guardar'
                                )}
                            </button>
                            <button type="button" className="btn btn-outline-secondary" onClick={() => nav("/admin/categorias")}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
