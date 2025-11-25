import React, { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { getProductsDisponibles } from '../api/products'

export const Productos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProductsDisponibles()
        setProductos(data)
        localStorage.setItem("productos", JSON.stringify(data))
      } catch (error) {
        console.error("Error al cargar productos: ", error)
      } finally {
        setLoading(false)
      }
    }

    cargarProductos()
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

    localStorage.setItem('carrito', JSON.stringify(cart))
    window.dispatchEvent(new Event('updateCart'))
    alert(`${producto.nombre} añadido al carrito`)
  }

  if (loading) return <h2 className="text-center py-5">Cargando productos...</h2>

  return (
    <section className="container py-5">
      <h2 className="text-center mb-4">Nuestros productos</h2>
      <div className="row g-4">
        {productos.map(prod => (
          <ProductCard
            key={prod.codigo}
            producto={prod}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  )
}
