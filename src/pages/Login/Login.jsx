import authApi from '../../apis/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import './Login.css';

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
                password: password,
            };

            // petición POST al backend con JSON
            const resp = await authApi.post('/auth/login', body);

            console.log('Respuesta login:', resp.data); // <- para ver qué llega

            // datos que retorna tu backend
            const {
                token,        // o access_token dependiendo de cómo lo llamas
                refreshToken,
                role,         // algunas APIs lo envían así
                roles,        // otras como array
                authorities,  // otras como [{ authority: "ROLE_ADMIN" }]
            } = resp.data;

            // --------- detectar el rol final de forma flexible ---------
            let finalRole = role || '';

            if (!finalRole && Array.isArray(roles) && roles.length > 0) {
                finalRole = roles[0]; // por ejemplo "ADMIN" o "ROLE_ADMIN"
            }

            if (!finalRole && Array.isArray(authorities) && authorities.length > 0) {
                finalRole = authorities[0].authority; // por ejemplo "ROLE_ADMIN"
            }

            // Guardar en localStorage (limpiando primero por si había algo viejo)
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('role');

            if (token) localStorage.setItem('token', token);
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
            if (finalRole) localStorage.setItem('role', finalRole);

            // Redirige a home
            navigate('/home');
        } catch (error) {
            console.error(error);
            setErrorMsg('Correo o contraseña incorrectos.');
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
                            value={password}
                            className="form-control"
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

                    {/* Error */}
                    {errorMsg && (
                        <div className="alert alert-danger py-2" role="alert">
                            {errorMsg}
                        </div>
                    )}

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
    );
};
