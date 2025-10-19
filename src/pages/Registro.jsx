import React from 'react'

export const Registro = () => {
    return (
        <>
    {/* //   < !--Formulario -- > */}
        <div className="container my-4 d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4 w-100 w-md-75 w-lg-50">
                <h2 className="text-center mb-4">Registro</h2>
                <form id="registroForm">
                    <div className="row">
                        {/* <!-- Nombre --> */}
                        <div className="mb-3 col-md-6">
                            <label for="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" placeholder="Ingresa tu nombre" maxlength="50"
                                required />
                        </div>

                        {/* <!-- Apellidos --> */}
                        <div className="mb-3 col-md-6">
                            <label for="apellidos" className="form-label">Apellidos</label>
                            <input type="text" className="form-control" id="apellidos" placeholder="Ingresa tus apellidos" maxlength="100"
                                required />
                        </div>
                    </div>

                    {/* <!-- RUN --> */}
                    <div className="mb-3">
                        <label for="run" className="form-label">RUN</label>
                        <input type="text" className="form-control" id="run" placeholder="19011022K" required/>
                            <div className="form-text">Sin puntos ni guion. Ej: 19011022K</div>
                    </div>

                    {/* <!-- Fecha de nacimiento --> */}
                    <div className="mb-3">
                        <label for="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
                        <input type="date" className="form-control" id="fechaNacimiento" required />
                    </div>

                    {/* <!-- Género --> */}
                    <div className="mb-3">
                        <label for="genero" className="form-label">Género</label>
                        <select className="form-select" id="genero" required>
                            <option value="">Selecciona</option>
                            <option>Femenino</option>
                            <option>Masculino</option>
                            <option>Trans Femenino</option>
                            <option>Trans Masculino</option>
                        </select>
                    </div>

                    {/* <!-- Correo --> */}
                    <div className="mb-3">
                        <label for="correo" className="form-label">Correo electrónico (usuario)</label>
                        <input type="email" className="form-control" id="correo" placeholder="ejemplo@correo.com" required />
                    </div>

                    {/* <!-- Dirección --> */}
                    <div className="mb-3">
                        <label for="direccion" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="direccion" placeholder="Ingresa tu dirección" required />
                    </div>

                    {/* <!-- Código postal --> */}
                    <div className="mb-3">
                        <label for="codigoPostal" className="form-label">Código Postal (opcional)</label>
                        <input type="text" className="form-control" id="codigoPostal" placeholder="Ej: 123456" />
                    </div>

                    {/* <!-- Contraseña --> */}
                    <div className="mb-3">
                        <label for="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password"
                            placeholder="Mínimo 6 caracteres, 1 mayúscula y 1 número" required />
                    </div>

                    {/* <!-- Confirmación de contraseña --> */}
                    <div className="mb-3">
                        <label for="confirmPassword" className="form-label">Repetir contraseña</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Repite tu contraseña"
                            required />
                        <div id="errorPassword" className="text-danger mt-1" style="display: none">
                            Las contraseñas no coinciden
                        </div>
                    </div>

                    {/* <!-- Checkbox para no soy un robot --> */}
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="noRobot" required />
                        <label className="form-check-label" for="noRobot">No soy un robot</label>
                    </div>

                    {/* <!-- Botón para enviar --> */}
                    <button type="submit" className="btn btn-success w-100">Registrar</button>
                    <p className="mt-3 text-center">
                        ¿Ya tienes cuenta?
                        <a href="login.html" className="text-success">Inicia sesión aquí</a>
                    </p>
                </form>

                {/* <!-- Mensaje de éxito --> */}
                <div id="successMessage" className="alert alert-success mt-3 text-center" style="display: none">
                    Registro exitoso
                </div>
            </div>
        </div>
        </>
  )
}
