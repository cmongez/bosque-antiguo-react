import React from 'react'

export const Registro = () => {
    return (
        <>
    {/* //   < !--Formulario -- > */}
        <div class="container my-4 d-flex justify-content-center align-items-center min-vh-100">
            <div class="card shadow p-4 w-100 w-md-75 w-lg-50">
                <h2 class="text-center mb-4">Registro</h2>
                <form id="registroForm">
                    <div class="row">
                        {/* <!-- Nombre --> */}
                        <div class="mb-3 col-md-6">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" placeholder="Ingresa tu nombre" maxlength="50"
                                required />
                        </div>

                        {/* <!-- Apellidos --> */}
                        <div class="mb-3 col-md-6">
                            <label for="apellidos" class="form-label">Apellidos</label>
                            <input type="text" class="form-control" id="apellidos" placeholder="Ingresa tus apellidos" maxlength="100"
                                required />
                        </div>
                    </div>

                    {/* <!-- RUN --> */}
                    <div class="mb-3">
                        <label for="run" class="form-label">RUN</label>
                        <input type="text" class="form-control" id="run" placeholder="19011022K" required/>
                            <div class="form-text">Sin puntos ni guion. Ej: 19011022K</div>
                    </div>

                    {/* <!-- Fecha de nacimiento --> */}
                    <div class="mb-3">
                        <label for="fechaNacimiento" class="form-label">Fecha de nacimiento</label>
                        <input type="date" class="form-control" id="fechaNacimiento" required />
                    </div>

                    {/* <!-- Género --> */}
                    <div class="mb-3">
                        <label for="genero" class="form-label">Género</label>
                        <select class="form-select" id="genero" required>
                            <option value="">Selecciona</option>
                            <option>Femenino</option>
                            <option>Masculino</option>
                            <option>Trans Femenino</option>
                            <option>Trans Masculino</option>
                        </select>
                    </div>

                    {/* <!-- Correo --> */}
                    <div class="mb-3">
                        <label for="correo" class="form-label">Correo electrónico (usuario)</label>
                        <input type="email" class="form-control" id="correo" placeholder="ejemplo@correo.com" required />
                    </div>

                    {/* <!-- Dirección --> */}
                    <div class="mb-3">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="direccion" placeholder="Ingresa tu dirección" required />
                    </div>

                    {/* <!-- Código postal --> */}
                    <div class="mb-3">
                        <label for="codigoPostal" class="form-label">Código Postal (opcional)</label>
                        <input type="text" class="form-control" id="codigoPostal" placeholder="Ej: 123456" />
                    </div>

                    {/* <!-- Contraseña --> */}
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password"
                            placeholder="Mínimo 6 caracteres, 1 mayúscula y 1 número" required />
                    </div>

                    {/* <!-- Confirmación de contraseña --> */}
                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Repetir contraseña</label>
                        <input type="password" class="form-control" id="confirmPassword" placeholder="Repite tu contraseña"
                            required />
                        <div id="errorPassword" class="text-danger mt-1" style="display: none">
                            Las contraseñas no coinciden
                        </div>
                    </div>

                    {/* <!-- Checkbox para no soy un robot --> */}
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" value="" id="noRobot" required />
                        <label class="form-check-label" for="noRobot">No soy un robot</label>
                    </div>

                    {/* <!-- Botón para enviar --> */}
                    <button type="submit" class="btn btn-success w-100">Registrar</button>
                    <p class="mt-3 text-center">
                        ¿Ya tienes cuenta?
                        <a href="login.html" class="text-success">Inicia sesión aquí</a>
                    </p>
                </form>

                {/* <!-- Mensaje de éxito --> */}
                <div id="successMessage" class="alert alert-success mt-3 text-center" style="display: none">
                    Registro exitoso
                </div>
            </div>
        </div>
        </>
  )
}
