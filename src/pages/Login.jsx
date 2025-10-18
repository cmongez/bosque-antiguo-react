import React from 'react'

export const Login = () => {
    return (
        //  < !--CONTENIDO LOGIN-- >
        <div class="container flex-grow-1 d-flex justify-content-center align-items-center mt-4">
            <div class="card p-4 rounded-4 shadow-sm w-100" style="max-width: 400px;">
                <h3 class="text-center mb-4">Iniciar Sesión</h3>
                <form id="loginForm">
                    {/* <!-- Correo --> */}
                    <div class="mb-3">
                        <label for="correoLogin" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="correoLogin" placeholder="ejemplo@duoc.cl" required />
                    </div>

                    {/* <!-- Contraseña --> */}
                    <div class="mb-3">
                        <label for="passwordLogin" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="passwordLogin" placeholder="Ingresa tu contraseña" required />
                    </div>

                    {/* <!-- Recordarme --> */}
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="recordarme" />
                        <label class="form-check-label" for="recordarme">Recordarme</label>
                    </div>

                    {/* <!-- Verificación simple --> */}
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="noRobot" required />
                        <label class="form-check-label" for="noRobot">No soy un robot</label>
                    </div>

                    {/* <!-- Botón --> */}
                    <button type="submit" class="btn btn-success w-100">Ingresar</button>
                </form>

                <p class="text-center mt-3 mb-0">
                    ¿No tienes cuenta?
                    <a href="registro.html" class="link-register">Regístrate aquí</a>
                </p>
            </div>
        </div>

    )
}
