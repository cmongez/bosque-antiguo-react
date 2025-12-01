import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getCategoryById, updateCategory } from "../../api/products";

const slugify = (s) =>
    (s || "")
        .toString()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

export const AdminCategoriaEditar = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [cats, setCats] = useState([]);
    const [cat, setCat] = useState(null);
    const [loading, setLoading] = useState(true);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [activo, setActivo] = useState(true);
    const slug = useMemo(() => slugify(nombre), [nombre]);
    const [touched, setTouched] = useState(false);

    // Cargar categoría por ID desde la API
    useEffect(() => {
        const cargarCategoria = async () => {
            try {
                setLoading(true);
                
                // Cargar la categoría específica y todas las categorías para validar duplicados
                const [categoriaData, todasCategorias] = await Promise.all([
                    getCategoryById(id),
                    getCategories()
                ]);
                
                setCat(categoriaData);
                setCats(todasCategorias);
                
                // Inicializar los campos del formulario
                setNombre(categoriaData.nombre || "");
                setDescripcion(categoriaData.descripcion || "");
                setActivo(categoriaData.activo ?? true);
                
            } catch (error) {
                console.error('Error al cargar categoría:', error);
                alert('Error al cargar la categoría');
                nav("/admin/categorias", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            cargarCategoria();
        }
    }, [id, nav]);

    const existsOther = useMemo(
        () => cats.some(c => c.slug === slug && c.id !== id),
        [cats, slug, id]
    );

    const save = async (e) => {
        e.preventDefault();
        setTouched(true);
        
        if (!nombre.trim()) {
            alert('El nombre de la categoría es requerido');
            return;
        }
        
        if (existsOther) {
            alert('Ya existe otra categoría con este nombre');
            return;
        }
        
        try {
            setLoading(true);
            
            // Actualizar la categoría usando la API
            const categoriaActualizada = {
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                activo,
                slug
            };
            
            await updateCategory(id, categoriaActualizada);
            
            alert('Categoría actualizada correctamente');
            nav("/admin/categorias", { replace: true });
            
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            alert('Error al actualizar la categoría: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container py-3">
                <div className="text-center py-4">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2 text-muted">Cargando categoría...</p>
                </div>
            </div>
        );
    }

    if (!cat) return null;

    return (
        <div className="container py-3">
            <h2 className="mb-3"><i className="fa fa-edit me-2"></i>Editar categoría</h2>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={save} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input
                                className={`form-control ${touched && (!nombre.trim() || existsOther) ? "is-invalid" : ""}`}
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                onBlur={() => setTouched(true)}
                                required
                            />
                            {touched && !nombre.trim() && <div className="invalid-feedback">Ingresa un nombre.</div>}
                            {touched && existsOther && <div className="invalid-feedback">Ya existe otra categoría con ese slug.</div>}
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
                            <button type="submit" className="btn btn-primary" disabled={loading || !nombre.trim() || existsOther}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Guardando...
                                    </>
                                ) : (
                                    'Guardar cambios'
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
