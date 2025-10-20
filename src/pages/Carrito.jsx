import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
export const Carrito = () => {
    const [carrito, setCarrito] = useState([])
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    // Leer carrito desde localStorage al montar el componente
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("carrito")) || []
        setCarrito(cart)
    }, [])

    // Recalcular el total cada vez que cambie el carrito
    useEffect(() => {
        const newTotal = carrito.reduce(
            (acc, item) => acc + item.precio * item.cantidad,
            0
        )
        setTotal(newTotal)
    }, [carrito])

    const guardarCarrito = nuevo => {
        setCarrito(nuevo)
        localStorage.setItem("carrito", JSON.stringify(nuevo))

        window.dispatchEvent(new Event("updateCart"))
    }

    const eliminarProducto = codigo => {
        const nuevo = carrito.filter(item => item.codigo !== codigo)
        guardarCarrito(nuevo)
    }

    const cambiarCantidad = (codigo, nuevaCantidad) => {
        if (nuevaCantidad < 1) return
        const nuevo = carrito.map(item =>
            item.codigo === codigo ? { ...item, cantidad: nuevaCantidad } : item
        )
        guardarCarrito(nuevo)
    }

    const fmt = n =>
        n.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0,
        })

    return (
        <main className="container py-4">
            <h2 className="mb-4">Mi carrito de compras</h2>

            {carrito.length === 0 ? (
                <p>No hay productos en el carrito </p>
            ) : (
                <div className="row">
                    {/* Lista de productos */}
                    <div className="col-md-8">
                        {carrito.map(item => (
                            <div
                                key={item.codigo}
                                className="card mb-3 shadow-sm p-3 d-flex flex-row align-items-center justify-content-between"
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src={new URL(`${item.img}`, import.meta.url)
                                            .href}
                                        alt={item.nombre}
                                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        className="rounded me-3"
                                    />
                                    <div>
                                        <h5 className="mb-1">{item.nombre}</h5>
                                        <p className="mb-0 text-muted">
                                            {fmt(item.precio)} c/u
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() =>
                                            cambiarCantidad(item.codigo, item.cantidad - 1)
                                        }
                                    >
                                        -
                                    </button>
                                    <span>{item.cantidad}</span>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() =>
                                            cambiarCantidad(item.codigo, item.cantidad + 1)
                                        }
                                    >
                                        +
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarProducto(item.codigo)}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Resumen */}
                    <div className="col-md-4">
                        <div className="card p-3">
                            <h5 className="d-flex justify-content-between">
                                <span>Total:</span>
                                <span>{fmt(total)}</span>
                            </h5>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese cupón de descuento"
                                />
                                <button className="btn btn-outline-secondary w-100 mt-2">
                                    Aplicar
                                </button>
                            </div>
                            <button className="btn btn-success w-100 btn-lg" onClick={() => navigate('/checkout')}>
                                Pagar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
