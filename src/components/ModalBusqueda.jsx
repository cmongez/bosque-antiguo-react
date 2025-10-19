import React from 'react'

export const ModalBusqueda = () => {
    return (
        <div className="modal fade" id="buscadorModal" tabIndex="-1" aria-labelledby="buscadorModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title" id="buscadorModalLabel">
                            Buscar productos
                        </h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div className="modal-body">
                        <form id="formBuscar">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Escribe tu búsqueda..." id="inputBuscar" />
                                <button className="btn btn-success" type="submit">Buscar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
