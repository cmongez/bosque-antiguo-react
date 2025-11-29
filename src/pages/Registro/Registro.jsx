import authApi from '../../apis/authApi';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Registro.css';

export const Registro = () => {
    const navigate = useNavigate();
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
    });

    const [errorPassword, setErrorPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [apiError, setApiError] = useState(null); // Estado para errores del backend

    const handleChange = e => {
        const { id, value, type, checked } = e.target;
        setForm({
            ...form,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    // 🔑 Función Principal: Maneja validaciones y llama a la API
    const handleSubmit = async e => {
        e.preventDefault();

        // Limpiar mensajes de error/éxito anteriores
        setErrorPassword(false);
        setApiError(null);
        setSuccess(false);

        // --- 1. Validaciones Locales ---
        if (form.password !== form.confirmPassword) {
            setErrorPassword(true);
            return;
        }

        const passwordRegex = /^.{4,10}$/;
        if (!passwordRegex.test(form.password)) {
            alert('La contraseña debe tener entre 4 y 10 caracteres');
            return;
        }

        const runRegex = /^[0-9]{7,8}[0-9kK]$/;
        if (!runRegex.test(form.run)) {
            alert('RUN inválido. Ej: 19011022K');
            return;
        }

        const correoRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        if (!correoRegex.test(form.correo)) {
            alert('Correo inválido. Solo se permiten @duoc.cl, @profesor.duoc.cl o @gmail.com');
            return;
        }

        // --- 2. Construir el BODY ANIDADO para el Backend (UsuarioRegistroRequest) ---
        const requestBody = {
            "usuario": {
                // Mapeo de campos de Frontend a Backend (Spring)
                "nombre": form.nombre,
                // Mapeo: apellidos (Front) -> apellido (Back)
                "apellido": form.apellidos,
                // Mapeo: run (Front) -> rut (Back)
                "rut": form.run,
                // Mapeo: correo (Front) -> email (Back)
                "email": form.correo,
                "direccion": form.direccion,
                "passwordHash": form.password
                // Los campos restantes se omiten o se dejan como nulos si no son requeridos en la entidad Usuario.
            },
            "nombreRol": "CLIENTE" // Rol por defecto
        };

        // --- 3. Llamada a la API ---
        try {
            // Usa la ruta relativa /auth/register
            const resp = await authApi.post("/auth/register", requestBody);

            console.log("Registro Exitoso:", resp.data);

            setSuccess(true);

            // Redirigir a login después de un registro exitoso
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error("Error al registrar:", error.response);

            // Extraer el mensaje de error de Spring Boot (si es un ResponseStatusException)
            const msg = error.response?.data?.message || "Error desconocido al registrar.";
            setApiError(msg);
        }
    }; // ⬅️ Cierre correcto de handleSubmit

    // --- Renderizado JSX ---
    return (
        <div className="container my-4 d-flex justify-content-center align-items-center min-vh-100">
            <div className="card card-registro shadow p-4 w-100 w-md-75 w-lg-50">
                <h2 className="text-center mb-4">Registro</h2>

                <form id="registroForm" onSubmit={handleSubmit}>
                    {/* Sección Nombre/Apellidos */}
                    <div className="row">
                        {/* Campo Nombre */}
                        <div className="mb-3 col-md-6">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" value={form.nombre} onChange={handleChange} placeholder="Ingresa tu nombre" maxLength="50" required />
                        </div>
                        {/* Campo Apellidos */}
                        <div className="mb-3 col-md-6">
                            <label htmlFor="apellidos" className="form-label">Apellidos</label>
                            <input type="text" className="form-control" id="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Ingresa tus apellidos" maxLength="100" required />
                        </div>
                    </div>

                    {/* Campo RUN */}
                    <div className="mb-3">
                        <label htmlFor="run" className="form-label">RUN</label>
                        <input type="text" className="form-control" id="run" value={form.run} onChange={handleChange} placeholder="19011022K" required />
                        <div className="form-text">Sin puntos ni guion. Ej: 19011022K</div>
                    </div>

                    {/* Campo Fecha Nacimiento (Se mantiene pero no se envía al backend) */}
                    <div className="mb-3">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
                        <input type="date" className="form-control" id="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required />
                    </div>

                    {/* Campo Género (Se mantiene pero no se envía al backend) */}
                    <div className="mb-3">
                        <label htmlFor="genero" className="form-label">Género</label>
                        <select className="form-select" id="genero" value={form.genero} onChange={handleChange} required>
                            <option value="">Selecciona</option>
                            <option>Femenino</option>
                            <option>Masculino</option>
                            <option>Trans Femenino</option>
                            <option>Trans Masculino</option>
                        </select>
                    </div>

                    {/* Campo Correo */}
                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo electrónico (usuario)</label>
                        <input type="email" className="form-control" id="correo" value={form.correo} onChange={handleChange} placeholder="ejemplo@correo.com" required />
                    </div>

                    {/* Campo Dirección */}
                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="direccion" value={form.direccion} onChange={handleChange} placeholder="Ingresa tu dirección" required />
                    </div>

                    {/* Campo Código Postal (Se mantiene pero no se envía al backend) */}
                    <div className="mb-3">
                        <label htmlFor="codigoPostal" className="form-label">Código Postal (opcional)</label>
                        <input type="text" className="form-control" id="codigoPostal" value={form.codigoPostal} onChange={handleChange} placeholder="Ej: 123456" />
                    </div>

                    {/* Campo Contraseña */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" value={form.password} onChange={handleChange} placeholder="Mínimo 6 caracteres, 1 mayúscula y 1 número" required />
                    </div>

                    {/* Campo Confirmar Contraseña */}
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Repetir contraseña</label>
                        <input type="password" className="form-control" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repite tu contraseña" required />
                        {errorPassword && (<div className="text-danger mt-1">Las contraseñas no coinciden</div>)}
                    </div>

                    {/* Checkbox No Robot */}
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="noRobot" checked={form.noRobot} onChange={handleChange} required />
                        <label className="form-check-label" htmlFor="noRobot">No soy un robot</label>
                    </div>

                    <button type="submit" className="btn btn-success w-100">Registrar</button>

                    {/* Mensaje de Error de API */}
                    {apiError && (
                        <div className="alert alert-danger mt-3 text-center">
                            {apiError}
                        </div>
                    )}

                    {/* Mensaje de Éxito */}
                    {success && (
                        <div className="alert alert-success mt-3 text-center">
                            Registro exitoso
                        </div>
                    )}

                    <p className="mt-3 text-center">
                        ¿Ya tienes cuenta?
                        <a href="/login" className="text-success"> Inicia sesión aquí</a>
                    </p>
                </form>
            </div>
        </div>
    );
};