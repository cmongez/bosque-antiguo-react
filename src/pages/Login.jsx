import React from 'react'

export const Login = () => {
    return (
        //  < !--CONTENIDO LOGIN-- >
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center mt-4">
            <div className="card p-4 rounded-4 shadow-sm w-100" style="max-width: 400px;">
                <h3 className="text-center mb-4">Iniciar Sesión</h3>
                <form id="loginForm">
                    {/* <!-- Correo --> */}
                    <div className="mb-3">
                        <label for="correoLogin" className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control" id="correoLogin" placeholder="ejemplo@duoc.cl" required />
                    </div>

                    {/* <!-- Contraseña --> */}
                    <div className="mb-3">
                        <label for="passwordLogin" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="passwordLogin" placeholder="Ingresa tu contraseña" required />
                    </div>

                    {/* <!-- Recordarme --> */}
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="recordarme" />
                        <label className="form-check-label" for="recordarme">Recordarme</label>
                    </div>

                    {/* <!-- Verificación simple --> */}
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="noRobot" required />
                        <label className="form-check-label" for="noRobot">No soy un robot</label>
                    </div>

                    {/* <!-- Botón --> */}
                    <button type="submit" className="btn btn-success w-100">Ingresar</button>
                </form>

                <p className="text-center mt-3 mb-0">
                    ¿No tienes cuenta?
                    <a href="registro.html" className="link-register">Regístrate aquí</a>
                </p>
            </div>
        </div>

    )
}
