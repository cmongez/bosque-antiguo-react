import React, { useState } from 'react'
import './Registro.css'

export const Registro = () => {
    const [form, setForm] = useState({
        nombre: '',
        apellidos: '',
        run: '',
        fechaNacimiento: '',
        genero: '',
        correo: '',
        direccion: '',
        codigoPostal: '',
        password: '',
        confirmPassword: '',
        noRobot: false,
    })

    const [errorPassword, setErrorPassword] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = e => {
        const { id, value, type, checked } = e.target
        setForm({
            ...form,
            [id]: type === 'checkbox' ? checked : value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (form.password !== form.confirmPassword) {
            setErrorPassword(true)
            return
        }
        setErrorPassword(false)

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/
        if (!passwordRegex.test(form.password)) {
            alert('La contraseña debe tener mínimo 6 caracteres, al menos una mayúscula y un número')
            return
        }

        const runRegex = /^[0-9]{7,8}[0-9kK]$/
        if (!runRegex.test(form.run)) {
            alert('RUN inválido. Ej: 19011022K')
            return
        }

        const correoRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/
        if (!correoRegex.test(form.correo)) {
            alert('Correo inválido. Solo se permiten @duoc.cl, @profesor.duoc.cl o @gmail.com')
            return
        }

        setSuccess(true)
        setTimeout(() => {
            setForm({
                nombre: '',
                apellidos: '',
                run: '',
                fechaNacimiento: '',
                genero: '',
                correo: '',
                direccion: '',
                codigoPostal: '',
                password: '',
                confirmPassword: '',
                noRobot: false,
            })
            setSuccess(false)
        }, 6000)
    }

    return (
        <div className="container my-4 d-flex justify-content-center align-items-center min-vh-100">
            <div className="card card-registro shadow p-4 w-100 w-md-75 w-lg-50">
                <h2 className="text-center mb-4">Registro</h2>

                <form id="registroForm" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                maxLength="50"
                                required
                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="apellidos" className="form-label">Apellidos</label>
                            <input
                                type="text"
                                className="form-control"
                                id="apellidos"
                                value={form.apellidos}
                                onChange={handleChange}
                                placeholder="Ingresa tus apellidos"
                                maxLength="100"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="run" className="form-label">RUN</label>
                        <input
                            type="text"
                            className="form-control"
                            id="run"
                            value={form.run}
                            onChange={handleChange}
                            placeholder="19011022K"
                            required
                        />
                        <div className="form-text">Sin puntos ni guion. Ej: 19011022K</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechaNacimiento"
                            value={form.fechaNacimiento}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="genero" className="form-label">Género</label>
                        <select
                            className="form-select"
                            id="genero"
                            value={form.genero}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona</option>
                            <option>Femenino</option>
                            <option>Masculino</option>
                            <option>Trans Femenino</option>
                            <option>Trans Masculino</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo electrónico (usuario)</label>
                        <input
                            type="email"
                            className="form-control"
                            id="correo"
                            value={form.correo}
                            onChange={handleChange}
                            placeholder="ejemplo@correo.com"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            id="direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            placeholder="Ingresa tu dirección"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="codigoPostal" className="form-label">Código Postal (opcional)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="codigoPostal"
                            value={form.codigoPostal}
                            onChange={handleChange}
                            placeholder="Ej: 123456"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Mínimo 6 caracteres, 1 mayúscula y 1 número"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Repetir contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repite tu contraseña"
                            required
                        />
                        {errorPassword && (
                            <div className="text-danger mt-1">
                                Las contraseñas no coinciden
                            </div>
                        )}
                    </div>

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="noRobot"
                            checked={form.noRobot}
                            onChange={handleChange}
                            required
                        />
                        <label className="form-check-label" htmlFor="noRobot">
                            No soy un robot
                        </label>
                    </div>

                    <button type="submit" className="btn btn-success w-100">Registrar</button>
                    <p className="mt-3 text-center">
                        ¿Ya tienes cuenta?
                        <a href="/login" className="text-success"> Inicia sesión aquí</a>
                    </p>
                </form>

                {success && (
                    <div className="alert alert-success mt-3 text-center">
                        Registro exitoso
                    </div>
                )}
            </div>
        </div>
    )
}
