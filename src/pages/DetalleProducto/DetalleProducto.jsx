import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getProductById, getProducts } from '../../api/products'
import './DetalleProducto.css'

export const DetalleProducto = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const codigo = params.get('codigo')

    const [product, setProduct] = useState(null)
    const [qty, setQty] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [relacionados, setRelacionados] = useState([])

    useEffect(() => {
        const cargarProducto = async () => {
            if (!codigo) {
                setError('Código de producto no especificado')
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                const producto = await getProductById(codigo)
                setProduct(producto)
                
                // Cargar productos relacionados de la misma categoría
                const todos = await getProducts()
                const relacionadosFiltrados = todos
                    .filter(p => p.categoria === producto.categoria && p.codigo !== producto.codigo)
                    .slice(0, 4)
                setRelacionados(relacionadosFiltrados)
                
            } catch (err) {
                console.error('Error al cargar producto:', err)
                setError('Error al cargar el producto')
            } finally {
                setLoading(false)
            }
        }

        cargarProducto()
    }, [codigo])

    const fmt = n => n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })

    const getCart = () => JSON.parse(localStorage.getItem('carrito')) || []
    const saveCart = cart => localStorage.setItem('carrito', JSON.stringify(cart))

    const addToCart = () => {
        if (!product) return
        let cart = getCart()
        const existing = cart.find(i => i.codigo === product.codigo)
        if (existing) existing.cantidad += qty
        else cart.push({ ...product, cantidad: qty })
        saveCart(cart)

        // Actualiza contador en el Navbar
        window.dispatchEvent(new Event('updateCart'))

        alert(`${product.nombre} añadido al carrito`)
    }


    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Cargando producto...</span>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="container py-5 text-center">
                <p className="text-danger">{error || 'Producto no encontrado.'}</p>
                <a href="/productos" className="btn btn-primary">Volver a productos</a>
            </div>
        )
    }

    return (
        <div className="container py-4">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Inicio</a></li>
                    <li className="breadcrumb-item"><a href="/productos">Productos</a></li>
                    <li className="breadcrumb-item">{product.categoria}</li>
                    <li className="breadcrumb-item active" aria-current="page">{product.nombre}</li>
                </ol>
            </nav>

            <div className="row g-4">
                {/* Galería */}
                <div className="col-lg-7">
                    <img 
                        src={product.img ? new URL(product.img, import.meta.url).href : '/placeholder-image.jpg'} 
                        alt={product.nombre} 
                        className="gallery-main" 
                    />
                </div>

                {/* Info */}
                <div className="col-lg-5">
                    <div className="d-flex justify-content-between align-items-start">
                        <h1 className="h3">{product.nombre}</h1>
                        <div className="price">{fmt(product.precio)}</div>
                    </div>

                    <p className="text-muted">{product.descripcion}</p>

                    <div className="my-4">
                        <label className="form-label d-block">Cantidad</label>
                        <div className="input-group qty-input">
                            <button className="btn btn-outline-secondary" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                            <input type="number" className="form-control text-center" value={qty} min="1" onChange={e => setQty(Number(e.target.value))} />
                            <button className="btn btn-outline-secondary" onClick={() => setQty(qty + 1)}>+</button>
                        </div>
                    </div>

                    <button className="btn btn-success btn-lg w-100 mt-3" onClick={addToCart}>
                        Añadir al carrito
                    </button>

                    <hr className="my-4" />
                    <div className="small text-muted">
                        <p><strong>SKU:</strong> {product.codigo}</p>
                        <p><strong>Categoría:</strong> {product.categoria}</p>
                        <p><strong>Stock:</strong>{' '}
                            {product.stock <= product.stockCritico
                                ? `${product.stock} (¡Últimas unidades!)`
                                : product.stock}
                        </p>
                    </div>
                </div>
            </div>

            {/* Productos relacionados */}
            <hr className="my-5" />
            <h4 className="mb-3">Productos relacionados</h4>
            <div className="row g-3 related">
                {relacionados.map(r => (
                    <div key={r.codigo} className="col-6 col-md-3">
                        <a href={`/detalle?codigo=${r.codigo}`} className="text-decoration-none text-reset">
                            <div className="card h-100">
                                <img 
                                    src={r.img ? new URL(r.img, import.meta.url).href : '/placeholder-image.jpg'} 
                                    className="card-img-top" 
                                    alt={r.nombre} 
                                />
                                <div className="card-body">
                                    <div className="fw-semibold">{r.nombre}</div>
                                    <div className="text-success">{fmt(r.precio)}</div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
