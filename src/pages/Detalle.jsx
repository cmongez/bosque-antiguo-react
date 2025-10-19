import React from 'react'

export const Detalle = () => {
    return (
        <div className="container py-4">

            {/* <!-- Breadcrumb --> */}
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./index.html">Inicio</a></li>
                    <li className="breadcrumb-item"><a href="./productos.html">Productos</a></li>
                    <li className="breadcrumb-item"><span id="crumbCategory">Categoría</span></li>
                    <li className="breadcrumb-item active" aria-current="page" id="crumbTitle">Producto</li>
                </ol>
            </nav>

            <div className="row g-4">
                {/* <!-- Galería --> */}
                <div className="col-lg-7">
                    <img id="mainImg" className="gallery-main" src="" alt="Producto" />
                    <div id="thumbs" className="d-flex gap-2 mt-3 flex-wrap"></div>
                </div>

                {/* <!-- Info producto --> */}
                <div className="col-lg-5">
                    <div className="d-flex justify-content-between align-items-start">
                        <h1 className="h3" id="productName">Nombre Producto</h1>
                        <div className="price" id="productPrice">$0</div>
                    </div>

                    <p className="text-muted" id="productDesc"></p>

                    <div className="my-4">
                        <label className="form-label d-block">Cantidad</label>
                        <div className="input-group qty-input">
                            <button className="btn btn-outline-secondary" id="btnMinus" type="button">-</button>
                            <input id="qty" type="number" className="form-control text-center" value="1" min="1" step="1" />
                            <button className="btn btn-outline-secondary" id="btnPlus" type="button">+</button>
                        </div>
                    </div>

                    <button id="btnAdd" className="btn btn-primary btn-lg w-100 mt-3">
                        Añadir al carrito
                    </button>

                    <hr className="my-4" />

                    <div className="small text-muted">
                        <p className="mb-1"><strong>SKU:</strong> <span id="sku">---</span></p>
                        <p className="mb-1"><strong>Categoría:</strong> <span id="category">---</span></p>
                        <p className="mb-0"><strong>Stock:</strong> <span id="stock">---</span></p>
                    </div>
                </div>
            </div>

            {/* <!-- Relacionados --> */}
            <hr className="my-5" />
            <h4 className="mb-3">Productos relacionados</h4>
            <div id="related" className="row g-3 related"></div>
        </div>

    )
}
