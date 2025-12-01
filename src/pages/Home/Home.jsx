import React, { useEffect, useState } from 'react'
import imagen1 from './../../assets/img/alto-angulo-de-plantas-en-macetas-negras.jpg'
import imagen2 from './../../assets/img/close-up-manos-sosteniendo-plantas-de-interior.jpg'
import imagen3 from './../../assets/img/fondo-de-planta-de-interior-verde-para-amantes-de-las-plantas.jpg'
import producto3 from './../../assets/img/close-up-manos-sosteniendo-plantas-de-interior.jpg'
import { Link } from 'react-router-dom'
import { getProductsDisponibles } from '../../api/products'
import { ProductCard } from '../../components/ProductCard'

import './Home.css'

export const Home = () => {

  const [showButton, setShowButton] = useState(false)
  const [productosDestacados, setProductosDestacados] = useState([])
  const [loading, setLoading] = useState(true)

  // Cargar productos destacados desde la API
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productos = await getProductsDisponibles()
        // Tomar solo los primeros 3 productos disponibles
        setProductosDestacados(productos.slice(0, 4))
      } catch (error) {
        console.error("Error al cargar productos destacados:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarProductos()
  }, [])

  // Escucha el scroll para mostrar u ocultar el botón
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Función para añadir al carrito
  const addToCart = codigo => {
    let cart = JSON.parse(localStorage.getItem('carrito')) || []
    const producto = productosDestacados.find(p => p.codigo === codigo)
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
  return (
    <>
      {/* HERO SECTION */}
      <header className="text-center py-5">
        <div className="container">
          <h1>Vivero Bosque Antiguo</h1>
          <p className="lead">Encuentra los mejores productos aquí</p>
        </div>
      </header>

      {/* CARRUSEL PRINCIPAL */}
      <section id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={imagen1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={imagen2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={imagen3} className="d-block w-100"
              alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Nuestros productos destacados</h2>
        
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Cargando productos destacados...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {productosDestacados.map(producto => (
                <ProductCard
                  key={producto.codigo}
                  producto={producto}
                  addToCart={addToCart}
                />
              ))}
            </div>

            {/* Botón para ir a todos los productos */}
            <div className="text-center mt-4">
              <Link to="/productos" className="btn btn-outline-success btn-lg">
                Ver todos los productos
              </Link>
            </div>
          </>
        )}
      </section>
      {/* <!-- Carrusel 2 --> */}
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* <!-- Slide 1 --> */}
          <div className="carousel-item active">
            <img src={imagen1} className="d-block w-100" alt="Bienvenida Marca" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="carousel-title">Bienvenido a Vivero Bosque Antiguo</h2>
              <p className="carousel-subtitle">
                Descubre la magia de la naturaleza con nuestra selección de
                árboles y plantas nativas
              </p>
              <div className="mt-3">
                <a href="comprar.html" className="btn btn-success">Comprar ahora</a>
                <a href="contacto.html" className="btn btn-success">Contáctanos</a>
              </div>
            </div>
          </div>

          {/* <!-- Slide 2 --> */}
          <div className="carousel-item">
            <img src={producto3} className="d-block w-100"
              alt="Promoción de árboles" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="carousel-title">Árboles que dan vida</h2>
              <p className="carousel-subtitle">
                Frutales, ornamentales y de sombra para tu jardín o proyecto.
                Calidad garantizada desde nuestro vivero a tu hogar.
              </p>
              <div className="mt-3">
                <a href="comprar.html" className="btn btn-success">Ver Catálogo</a>
                <a href="contacto.html" className="btn btn-success">Pide asesoría</a>
              </div>
            </div>
          </div>

          {/* <!-- Slide 3 --> */}
          <div className="carousel-item">
            <img src={imagen3} className="d-block w-100"
              alt="Compromiso Ecológico" />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="carousel-title">Planta hoy, respira mañana</h2>
              <p className="carousel-subtitle">
                Con cada árbol que compras, ayudas a un planeta más verde y
                sostenible. ¡Únete al cambio!
              </p>
              <div className="mt-3">
                <a href="comprar.html" className="btn btn-success">Compra tu árbol</a>
                <a href="contacto.html" className="btn btn-success">Más información</a>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Controles del carrusel --> */}
        <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* BOTÓN VOLVER ARRIBA */}
      {showButton && (
        <button id="btnTop" title="Ir arriba" onClick={scrollToTop}>
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      )}
    </>
  )
}