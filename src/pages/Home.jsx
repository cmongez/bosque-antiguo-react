import React from 'react'
import imagen1 from  './../assets/img/alto-angulo-de-plantas-en-macetas-negras.jpg'
import imagen2 from './../assets/img/close-up-manos-sosteniendo-plantas-de-interior.jpg'
import imagen3 from './../assets/img/fondo-de-planta-de-interior-verde-para-amantes-de-las-plantas.jpg'
import producto1 from './../assets/img/jardineria1.jpg'
import producto2 from './../assets/img/jardineria.jpg'
import producto3 from './../assets/img/close-up-manos-sosteniendo-plantas-de-interior.jpg'

export const Home = () => {
  return (
    <>  
    {/* <!-- HERO --> */}
  <section className="text-center py-5">
    <div className="container">
      <h1>Vivero Bosque Antiguo</h1>
      <p className="lead">Encuentra los mejores productos aquí</p>
    </div>
  </section>

  {/* <!-- CARRUSEL --> */}
  <div id="carouselExampleIndicators" className="carousel slide">
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
  </div>

  {/* <!-- PRODUCTOS --> */}
  <section className="container py-5">
    <h2 className="text-center mb-4">Nuestros productos destacados</h2>
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card h-100">
          <img src={producto1} className="card-img-top" alt="Ficus" />
          <div className="card-body text-center">
            <h5 className="card-title">Ficus</h5>
            <p className="card-text">
              Planta de interior de hojas brillantes, fácil de cuidar.
            </p>
            <p><strong>Precio:</strong> $10.000</p>
            <a href="detalle.html?codigo=PI001" className="btn btn-success">Ver detalle</a>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card h-100">
          <img src={producto2} className="card-img-top" alt="Sansevieria" />
          <div className="card-body text-center">
            <h5 className="card-title">Sansevieria</h5>
            <p className="card-text">
              Conocida como lengua de suegra, muy resistente.
            </p>
            <p><strong>Precio:</strong> $15.000</p>
            <a href="detalle.html?codigo=PI002" className="btn btn-success">Ver detalle</a>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card h-100">
          <img src={producto3} className="card-img-top" alt="Mandarino" />
          <div className="card-body text-center">
            <h5 className="card-title">Mandarino</h5>
            <p className="card-text">
              Árbol frutal de mandarinas dulces y jugosas.
            </p>
            <p><strong>Precio:</strong> $12.000</p>
            <a href="detalle.html?codigo=FR001" className="btn btn-success">Ver detalle</a>
          </div>
        </div>
      </div>
    </div>

    {/* <!-- Botón para ir a todos --> */}
    <div className="text-center mt-4">
      <a href="productos.html" className="btn btn-outline-success btn-lg">Ver todos los productos</a>
    </div>
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

  {/* <!-- BOTÓN VOLVER ARRIBA --> */}
  <button id="btnTop" title="Ir arriba">
    <i className="fa-solid fa-chevron-up"></i>
  </button>
</>
  )
}
