import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './DetalleProducto.css'

// Importa imágenes base
import img1 from './../../assets/img/jardineria1.jpg'
import img2 from './../../assets/img/jardineria.jpg'
import img3 from './../../assets/img/close-up-manos-sosteniendo-plantas-de-interior.jpg'

// Catálogo base
const products = [
    { codigo: 'PI001', nombre: 'Ficus', descripcion: 'Planta de interior de hojas brillantes, fácil de cuidar.', precio: 10000, stock: 25, stockCritico: 5, categoria: 'Plantas de interior', img: img1 },
    { codigo: 'PI002', nombre: 'Sansevieria', descripcion: 'Conocida como lengua de suegra, muy resistente.', precio: 15000, stock: 40, stockCritico: 10, categoria: 'Plantas de interior', img: img2 },
    { codigo: 'PI003', nombre: 'Afelandra', descripcion: 'Planta tropical con hojas llamativas y flores amarillas.', precio: 12000, stock: 15, stockCritico: 3, categoria: 'Plantas de interior', img: img3 },
    { codigo: 'FR001', nombre: 'Mandarino', descripcion: 'Árbol frutal de mandarinas dulces y jugosas.', precio: 12000, stock: 20, stockCritico: 4, categoria: 'Frutales', img: img3 },
    { codigo: 'FR002', nombre: 'Palto', descripcion: 'Árbol frutal que produce paltas (aguacates).', precio: 18000, stock: 10, stockCritico: 2, categoria: 'Frutales', img: img1 },
]

export const DetalleProducto = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const codigo = params.get('codigo')

    const [product, setProduct] = useState(null)
    const [qty, setQty] = useState(1)

    useEffect(() => {
        const found = products.find(p => p.codigo === codigo)
        setProduct(found)
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


    if (!product) {
        return (
            <div className="container py-5 text-center">
                <p className="text-danger">Producto no encontrado.</p>
            </div>
        )
    }

    const relacionados = products
        .filter(p => p.categoria === product.categoria && p.codigo !== product.codigo)
        .slice(0, 4)

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
                    <img src={product.img} alt={product.nombre} className="gallery-main" />
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
                                <img src={r.img} className="card-img-top" alt={r.nombre} />
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
