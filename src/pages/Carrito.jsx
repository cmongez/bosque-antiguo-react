import React from 'react'

export const Carrito = () => {
    return ( <>
        <main class="container py-4">
            <h2 class="mb-4">Mi carrito de compras</h2>
            <div class="row">
                {/* <!-- Lista de productos --> */}
                <div class="col-md-8" id="lista-carrito"></div>

                {/* <!-- Resumen --> */}
                <div class="col-md-4">
                    <div class="card p-3">
                        <h5 class="d-flex justify-content-between">
                            <span>TOTAL:</span>
                            <span id="total">$0</span>
                        </h5>
                        <div class="mb-3">
                            <input type="text" class="form-control" placeholder="Ingrese el cupón de descuento"/>
                                <button class="btn btn-outline-secondary w-100 mt-2">Aplicar</button>
                        </div>
                        <button class="btn btn-success w-100 btn-lg">PAGAR</button>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}
