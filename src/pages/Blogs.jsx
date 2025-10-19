import React from 'react'

export const Blogs = () => {
    return (<>
        {/* <!-- Contenido --> */}
        <div className="container my-5">
            <h2 className="text-center mb-4">Noticias Importantes</h2>

            {/* <!-- Blog 1 --> */}
            <div className="row mb-4 align-items-center">
                <div className="col-md-6">
                    <h3>CASO CURIOSO #1</h3>
                    <p>Descubre cómo las plantas purifican el aire y ayudan a mejorar tu bienestar en el hogar.</p>
                    <a href="blog-detalle1.html" className="btn btn-success">Ver Caso</a>
                </div>
                <div className="col-md-6">
                    <img src="./img/aire-puro.png" alt="Plantas purificadoras" className="img-fluid rounded shadow" />
                </div>
            </div>

            {/* <!-- Blog 2 --> */}
            <div className="row mb-4 align-items-center">
                <div className="col-md-6">
                    <h3>CASO CURIOSO #2</h3>
                    <p>Conoce la historia de las suculentas y por qué se han vuelto tan populares en los últimos años.</p>
                    <a href="blog-detalle2.html" className="btn btn-success">Ver Caso</a>
                </div>
                <div className="col-md-6">
                    <img src="./img/suculentas.png" alt="Suculentas" className="img-fluid rounded shadow" />                 </div>
            </div>
        </div>


    </>
    )
}
