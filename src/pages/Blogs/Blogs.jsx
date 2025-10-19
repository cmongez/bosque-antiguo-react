import React, { useState, useEffect } from 'react'
import './Blogs.css'

import airePuro from './../../assets/img/aire-puro.png'
import suculentas from './../../assets/img/suculentas.png'

export const Blogs = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            {/* HERO BLOGS */}
            <section className="hero-blogs text-center text-white">
                <div className="container">
                    <h1 className="mb-3">Noticias Importantes</h1>
                    <p className="lead">Descubre historias, consejos y curiosidades del mundo vegetal 🌿</p>
                </div>
            </section>

            {/* CONTENIDO */}
            <div className="container my-5">
                <div className="row mb-4 align-items-center">
                    <div className="col-md-6">
                        <h3>CASO CURIOSO #1</h3>
                        <p>Descubre cómo las plantas purifican el aire y ayudan a mejorar tu bienestar en el hogar.</p>
                        <a href="/blog-detalle1" className="btn btn-success">Ver Caso</a>
                    </div>
                    <div className="col-md-6">
                        <img src={airePuro} alt="Plantas purificadoras" className="img-fluid rounded shadow" />
                    </div>
                </div>

                <div className="row mb-4 align-items-center">
                    <div className="col-md-6">
                        <h3>CASO CURIOSO #2</h3>
                        <p>Conoce la historia de las suculentas y por qué se han vuelto tan populares en los últimos años.</p>
                        <a href="/blog-detalle2" className="btn btn-success">Ver Caso</a>
                    </div>
                    <div className="col-md-6">
                        <img src={suculentas} alt="Suculentas" className="img-fluid rounded shadow" />
                    </div>
                </div>
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
