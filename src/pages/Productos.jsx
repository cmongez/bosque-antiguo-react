import React, { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'

export const Productos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/productos.json')
      .then(res => res.json())
      .then(data => {
        setProductos(data)
        localStorage.setItem("productos", JSON.stringify(data))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const addToCart = codigo => {
    let cart = JSON.parse(localStorage.getItem('carrito')) || []
    const producto = productos.find(p => p.codigo === codigo)
    if (!producto) return

    const existente = cart.find(p => p.codigo === codigo)
    if (existente) {
      existente.cantidad += 1
    } else {
      cart.push({ ...producto, cantidad: 1 })
    }

    // Guardar carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(cart))

    //  Notificar al Navbar para que actualice el contador
    window.dispatchEvent(new Event('updateCart'))

    // Feedback visual
    alert(`${producto.nombre} añadido al carrito`)
  }


  if (loading) return <h2 className="text-center py-5">Cargando productos...</h2>

  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">Nuestros productos</h2>
      <div className="row g-4">
        {productos.map(prod => (
          <ProductCard key={prod.codigo} producto={prod} addToCart={addToCart} />
        ))}
      </div>
    </section>
  )
}
