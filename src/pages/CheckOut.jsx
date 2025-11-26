import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const clp = n => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n)
const isEmail = (v) => /\S+@\S+\.\S+/.test(v)

// Helpers de almacenamiento local (para funcionar sin Context)
function readLS(key, fallback) {
    try {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : fallback
    } catch {
        return fallback
    }
}

export const CheckOut = () => {
    const nav = useNavigate()
    const [isPaying, setIsPaying] = useState(false)

    // Cart esperado: [{id:'p1', qty:2}, ...]
    const cart = readLS('carrito', [])
    // Products esperado: [{id:'p1', name:'...', price: 9990, image:'/img...'}, ...]
    const products = readLS('productos', [])

    // Si no hay items, volvemos al carrito
    useEffect(() => {
        if (!isPaying && (!cart || cart.length === 0)) {
            nav('/carrito', { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Array.isArray(cart) ? cart.length : 0, isPaying])
    // Armar filas del resumen
    const rows = useMemo(() => {
        return (cart || []).map(item => {
            const p = (products || []).find(x => x.codigo === item.codigo)
            const precio = p?.precio ?? 0
            return {
                codigo: item.codigo,
                nombre: p?.nombre ?? 'Producto',
                precio,
                cantidad: item.cantidad,
                subtotal: precio * (item.cantidad || 0)
            }
        })
    }, [cart, products])

    const total = useMemo(() => rows.reduce((acc, r) => acc + r.subtotal, 0), [rows])

    // Formulario controlado
    const [form, setForm] = useState({ name: '', email: '', address: '', notes: '' })
    const [touched, setTouched] = useState({})

    const onChange = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))
    const touch = (k) => () => setTouched(t => ({ ...t, [k]: true }))

    const errors = {
        name: form.name.trim() === '' ? 'Ingresa tu nombre completo' : '',
        email: !isEmail(form.email) ? 'Ingresa un correo válido' : '',
        address: form.address.trim() === '' ? 'Ingresa tu dirección' : ''
    }
    const isValid = !errors.name && !errors.email && !errors.address

    const pay = async (e) => {
        e.preventDefault()
        setTouched({ name: true, email: true, address: true })
        if (!isValid) return

        localStorage.setItem('checkoutUser', JSON.stringify(form))
        setIsPaying(true)

        try {
            // Crear orden en el microservicio de ventas
            const orderData = {
                detalles: rows.map(row => ({
                    productoId: row.codigo, // Extraer ID numérico
                    cantidad: row.cantidad
                }))
            };

            const { createOrder } = await import('../api/orders');
            const orderResponse = await createOrder(orderData);
            console.log('orderResponse', orderResponse)
            // Limpiar carrito solo si la orden se creó exitosamente
            localStorage.setItem('carrito', JSON.stringify([]))
            window.dispatchEvent(new Event('updateCart'))

            nav(`/compra-exitosa/${orderResponse.id}`, { 
                state: { form, rows, total, order: orderResponse } 
            })
        } catch (error) {
            console.error('Error al procesar la orden:', error)
            const orderId = Date.now()
            nav(`/compra-fallida/${orderId}`, { 
                state: { form, rows, total, error: error.message } 
            })
        }
    }



    return (
        <div className="container py-5">
            <h1 className="mb-4">Checkout</h1>

            <div className="row g-4">
                {/* Formulario */}
                <div className="col-lg-7">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Tus datos</h5>

                            <form onSubmit={pay} noValidate className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Nombre completo</label>
                                    <input
                                        className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                        value={form.name}
                                        onChange={onChange('name')}
                                        onBlur={touch('name')}
                                        required
                                        placeholder="Ej: Constanza Contador"
                                    />
                                    {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                        value={form.email}
                                        onChange={onChange('email')}
                                        onBlur={touch('email')}
                                        required
                                        placeholder="tucorreo@dominio.com"
                                    />
                                    {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Dirección</label>
                                    <input
                                        className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`}
                                        value={form.address}
                                        onChange={onChange('address')}
                                        onBlur={touch('address')}
                                        required
                                        placeholder="Calle, número, comuna, región"
                                    />
                                    {touched.address && errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Notas (opcional)</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={form.notes}
                                        onChange={onChange('notes')}
                                        placeholder="Instrucciones de entrega, referencias, etc."
                                    />
                                </div>

                                <div className="col-12 d-flex gap-2">
                                    <button className="btn btn-success" type="submit" disabled={!isValid}>
                                        Pagar {clp(total)}
                                    </button>
                                    <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Resumen de compra */}
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Resumen de compra</h5>

                            {!rows.length ? (
                                <p className="text-muted mb-0">Tu carrito está vacío.</p>
                            ) : (
                                <>
                                    <div className="table-responsive">
                                        <table className="table align-middle">
                                            <thead>
                                                <tr>
                                                    <th>Producto</th>
                                                    <th className="text-center">Cant.</th>
                                                    <th className="text-end">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map(r => (
                                                    <tr key={r.codigo}>
                                                        <td>{r.nombre}</td>
                                                        <td className="text-center">{r.cantidad}</td>
                                                        <td className="text-end">{clp(r.subtotal)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th colSpan="2" className="text-end">Total</th>
                                                    <th className="text-end">{clp(total)}</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <small className="text-muted">* Precios en CLP.</small>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
