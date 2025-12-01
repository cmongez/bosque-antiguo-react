import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getProducts, deleteCategory, updateCategory } from "../../api/products";

// helpers LS
const readLS = (k, fb) => {
    try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb; } catch { return fb; }
};
const writeLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));


export const AdminCategorias = () => {
    const nav = useNavigate();
    const [cats, setCats] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar categorías y productos desde la API
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [categoriasData, productosData] = await Promise.all([
                    getCategories(),
                    getProducts()
                ]);
                setCats(categoriasData);
                setProductos(productosData);
            } catch (error) {
                console.error('Error al cargar datos:', error);
                // Fallback a datos del localStorage si la API falla
                setCats(readLS("categorias", []));
                setProductos(readLS("productos", []));
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    const totalPorCategoria = useMemo(() => {
        const map = {};
        productos.forEach(p => {
            if (!p?.categoria) return;
            map[p.categoria] = (map[p.categoria] || 0) + 1;
        });
        return map;
    }, [productos]);

    const toggleActiva = async (id) => {
        try {
            setLoading(true);
            const categoria = cats.find(c => c.id === id);
            if (!categoria) return;

            // Actualizar el estado activo usando la API
            const categoriaActualizada = await updateCategory(id, {
                ...categoria,
                activo: !categoria.activo
            });
            
            // Actualizar el estado local
            const next = cats.map(c => c.id === id ? categoriaActualizada : c);
            setCats(next);
            
            // También actualizar localStorage como respaldo
            writeLS("categorias", next);
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            alert('Error al actualizar la categoría');
        } finally {
            setLoading(false);
        }
    };

    const eliminar = async (id) => {
        const categoria = cats.find(c => c.id === id);
        if (!categoria) return;
        
        const productosEnCategoria = totalPorCategoria[categoria.nombre] || 0;
        
        let mensaje = `¿Eliminar la categoría "${categoria.nombre}"?`;
        if (productosEnCategoria > 0) {
            mensaje += `\n\nATENCIÓN: Esta categoría tiene ${productosEnCategoria} producto(s) asociado(s). Al eliminarla, estos productos quedarán sin categoría.`;
        }
        
        if (!confirm(mensaje)) return;
        
        try {
            setLoading(true);
            
            // Eliminar usando la API
            await deleteCategory(id);
            
            // Actualizar el estado local
            const next = cats.filter(c => c.id !== id);
            setCats(next);
            
            // También actualizar localStorage como respaldo
            writeLS("categorias", next);
            
            alert('Categoría eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            alert('Error al eliminar la categoría: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0"><i className="fa fa-tags me-2"></i>Categorías</h2>
                <div>
                    <button 
                        onClick={() => nav("/admin/categorias/nueva")}
                        className="btn btn-success"
                    >
                        <i className="fa fa-plus me-2"></i>Nueva categoría
                    </button>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-2 text-muted">Cargando categorías...</p>
                        </div>
                    ) : !cats.length ? (
                        <p className="text-muted mb-0">Sin categorías aún.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Nombre</th>
                                        <th className="text-center"># Productos</th>
                                        <th className="text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cats.map(c => (
                                        <tr key={c.id}>
                                            <td>{c.nombre}</td>

                                            <td className="text-center">{totalPorCategoria[c.nombre] || 0}</td>
                                            <td className="text-end">
                                                <button onClick={() => toggleActiva(c.id)} className="btn btn-sm btn-outline-warning me-2">
                                                    {c.activo ? "Desactivar" : "Activar"}
                                                </button>
                                                <button 
                                                    onClick={() => nav(`/admin/categorias/editar/${c.id}`)}
                                                    className="btn btn-sm btn-primary me-2"
                                                >
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button onClick={() => eliminar(c.id)} className="btn btn-sm btn-danger">
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <button className="btn btn-outline-secondary mt-3" onClick={() => nav(-1)}>
                        <i className="fa fa-arrow-left me-2"></i>Volver
                    </button>
                </div>
            </div>
        </div>
    );
};
