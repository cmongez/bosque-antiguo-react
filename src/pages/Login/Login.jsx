import authApi from '../../apis/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react'
import './Login.css' // crea este archivo para estilos

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(null);

        try {
            const body = {
                email: email,
                password: password
            };

            // petición POST al backend con JSON
            const resp = await authApi.post("/auth/login", body);

            // datos que retorna tu backend
            const {
                token,        // o access_token dependiendo de cómo lo llamas
                role,
                refreshToken
            } = resp.data;

            // Guardar en localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("role", role);

            // Disparar evento personalizado para actualizar la UI
            window.dispatchEvent(new CustomEvent('authChange'));

            // Redirige a home o admin según el rol
            if (role === 'ADMIN' || role === 'VENDEDOR') {
                navigate("/admin");
            } else {
                navigate("/home");
            }

        } catch (error) {
            setErrorMsg("Correo o contraseña incorrectos.");
        }
    };
    return (
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center mt-4">
            <div className="card p-4 rounded-4 shadow-sm w-100 login-card">
                <h3 className="text-center mb-4">Iniciar Sesión</h3>

                <form id="loginForm" onSubmit={handleSubmit}>
                    {/* Correo */}
                    <div className="mb-3">
                        <label htmlFor="correoLogin" className="form-label">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="correoLogin"
                            placeholder="ejemplo@duoc.cl"
                            required
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="mb-3">
                        <label htmlFor="passwordLogin" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            id="passwordLogin"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    {/* Recordarme */}
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="recordarme" />
                        <label className="form-check-label" htmlFor="recordarme">
                            Recordarme
                        </label>
                    </div>

                    {/* Verificación simple */}
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="noRobot"
                            required
                        />
                        <label className="form-check-label" htmlFor="noRobot">
                            No soy un robot
                        </label>
                    </div>

                    {/* Botón */}
                    <button type="submit" className="btn btn-success w-100">
                        Ingresar
                    </button>
                </form>

                <p className="text-center mt-3 mb-0">
                    ¿No tienes cuenta?{' '}
                    <a href="/registro" className="link-register">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    )
}
