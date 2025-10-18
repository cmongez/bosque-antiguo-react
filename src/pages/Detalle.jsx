import React from 'react'

export const Detalle = () => {
    return (
        <div class="container py-4">

            {/* <!-- Breadcrumb --> */}
            <nav aria-label="breadcrumb" class="mb-3">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="./index.html">Inicio</a></li>
                    <li class="breadcrumb-item"><a href="./productos.html">Productos</a></li>
                    <li class="breadcrumb-item"><span id="crumbCategory">Categoría</span></li>
                    <li class="breadcrumb-item active" aria-current="page" id="crumbTitle">Producto</li>
                </ol>
            </nav>

            <div class="row g-4">
                {/* <!-- Galería --> */}
                <div class="col-lg-7">
                    <img id="mainImg" class="gallery-main" src="" alt="Producto" />
                    <div id="thumbs" class="d-flex gap-2 mt-3 flex-wrap"></div>
                </div>

                {/* <!-- Info producto --> */}
                <div class="col-lg-5">
                    <div class="d-flex justify-content-between align-items-start">
                        <h1 class="h3" id="productName">Nombre Producto</h1>
                        <div class="price" id="productPrice">$0</div>
                    </div>

                    <p class="text-muted" id="productDesc"></p>

                    <div class="my-4">
                        <label class="form-label d-block">Cantidad</label>
                        <div class="input-group qty-input">
                            <button class="btn btn-outline-secondary" id="btnMinus" type="button">-</button>
                            <input id="qty" type="number" class="form-control text-center" value="1" min="1" step="1" />
                            <button class="btn btn-outline-secondary" id="btnPlus" type="button">+</button>
                        </div>
                    </div>

                    <button id="btnAdd" class="btn btn-primary btn-lg w-100 mt-3">
                        Añadir al carrito
                    </button>

                    <hr class="my-4" />

                    <div class="small text-muted">
                        <p class="mb-1"><strong>SKU:</strong> <span id="sku">---</span></p>
                        <p class="mb-1"><strong>Categoría:</strong> <span id="category">---</span></p>
                        <p class="mb-0"><strong>Stock:</strong> <span id="stock">---</span></p>
                    </div>
                </div>
            </div>

            {/* <!-- Relacionados --> */}
            <hr class="my-5" />
            <h4 class="mb-3">Productos relacionados</h4>
            <div id="related" class="row g-3 related"></div>
        </div>

    )
}
