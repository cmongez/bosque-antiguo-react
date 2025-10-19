import React from 'react'

export const ModalBusqueda = () => {
    return (
        <div class="modal fade" id="buscadorModal" tabindex="-1" aria-labelledby="buscadorModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="buscadorModalLabel">
                            Buscar productos
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formBuscar">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Escribe tu búsqueda..." id="inputBuscar" />
                                <button class="btn btn-success" type="submit">Buscar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
