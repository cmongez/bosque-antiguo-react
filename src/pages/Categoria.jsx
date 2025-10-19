import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const clp = (n) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);

// Lee productos intentando varias keys comunes
function readProducts() {
    const keys = ["products", "productos", "catalog", "catalogo"];
    for (const k of keys) {
        try {
            const raw = localStorage.getItem(k);
            if (raw) {
                const arr = JSON.parse(raw);
                if (Array.isArray(arr) && arr.length) {
                    console.log(`[Categorias] leído desde localStorage clave: ${k}`, arr);
                    return arr;
                }
            }
        } catch { }
    }
    console.warn("[Categorias] No se encontraron productos en localStorage.");
    return [];
}

export const Categorias = () => {
    const [q, setQ] = useState("");          // búsqueda opcional
    const [active, setActive] = useState(""); // '' = Todas

    // productos según tu modelo: { codigo, nombre, descripcion, precio, stock, stockCritico, categoria, img }
    const productos = useMemo(() => readProducts(), []);

    // categorías únicas a partir de "categoria"
    const categorias = useMemo(() => {
        const set = new Set();
        productos.forEach((p) => {
            if (p && p.categoria) set.add(String(p.categoria));
        });
        return Array.from(set);
    }, [productos]);

    // Si no hay selección y sí hay categorías, mantenemos "Todas"
    useEffect(() => {
        if (!active && categorias.length) setActive("");
    }, [active, categorias]);

    // Filtro por categoría + búsqueda
    const filtrados = useMemo(() => {
        let list = productos;
        if (active) list = list.filter((p) => String(p.categoria) === active);
        if (q.trim()) list = list.filter((p) => (p.nombre || "").toLowerCase().includes(q.toLowerCase()));
        return list;
    }, [productos, active, q]);

    return (
        <section className="container py-5">
            <h1 className="mb-4 text-center">Categorías</h1>

            {/* filtros */}
            <div className="row justify-content-center g-2 mb-3">
                <div className="col-md-8">
                    <div className="input-group">
                        <input
                            className="form-control"
                            placeholder="Buscar por nombre..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <span className="input-group-text">
                            <i className="fa fa-search" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                <button
                    className={`btn btn-outline-success ${active === "" ? "active" : ""}`}
                    onClick={() => setActive("")}
                >
                    Todas
                </button>
                {categorias.map((c) => (
                    <button
                        key={c}
                        className={`btn btn-outline-success ${active === c ? "active" : ""}`}
                        onClick={() => setActive(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {/* mensajes de ayuda */}
            {!productos.length && (
                <div className="alert alert-warning">
                    No hay productos en memoria. Carga tu catálogo en <code>localStorage</code> con la clave
                    <code> products</code> (o <code>productos</code>) y asegúrate que cada item tenga
                    <code> categoria</code>.
                </div>
            )}

            {productos.length > 0 && !categorias.length && (
                <div className="alert alert-info">
                    Tus productos no tienen la propiedad <code>categoria</code>, por eso no se generan
                    botones de categorías.
                </div>
            )}

            {/* grid */}
            <div className="row g-4">
                {filtrados.map((p) => (
                    <div className="col-md-4 col-lg-3" key={p.codigo}>
                        <div className="card h-100">
                            <img src={p.img} className="card-img-top" alt={p.nombre} />
                            <div className="card-body text-center d-flex flex-column">
                                <h5 className="card-title">{p.nombre}</h5>
                                <p className="mb-1">{clp(p.precio || 0)}</p>
                                {p.categoria && (
                                    <span className="badge text-bg-secondary align-self-center mb-2">
                                        {p.categoria}
                                    </span>
                                )}
                                <Link to={`/detalle/${p.codigo}`} className="btn btn-success mt-auto">
                                    Ver detalle
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {productos.length > 0 && filtrados.length === 0 && (
                <p className="text-center text-muted mt-4">
                    No encontramos productos con esos filtros.
                </p>
            )}
        </section>
    );
};
