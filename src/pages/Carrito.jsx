import React from 'react'

export const Carrito = () => {
    return (<>
        <main className="container py-4">
            <h2 className="mb-4">Mi carrito de compras</h2>
            <div className="row">
                {/* <!-- Lista de productos --> */}
                <div className="col-md-8" id="lista-carrito"></div>

                {/* <!-- Resumen --> */}
                <div className="col-md-4">
                    <div className="card p-3">
                        <h5 className="d-flex justify-content-between">
                            <span>TOTAL:</span>
                            <span id="total">$0</span>
                        </h5>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Ingrese el cupón de descuento" />
                            <button className="btn btn-outline-secondary w-100 mt-2">Aplicar</button>
                        </div>
                        <button className="btn btn-success w-100 btn-lg">PAGAR</button>
                    </div>
                </div>
            </div>
        </main>
    </>
    )
}
