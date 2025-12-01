// src/api/users.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://100.31.23.11:8082/api/v1", // EC2 - Microservicio usuarios
});

// Interceptor para agregar JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Obtener todos los usuarios (solo ADMIN)
export const getAllUsers = async () => {
  const res = await api.get("/usuarios"); // Endpoint correcto
  // Manejar formato HAL: _embedded.usuarioList
  return res.data._embedded?.usuarioList || [];
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const res = await api.get(`/usuarios/${id}`);
  return res.data;
};

// Crear nuevo usuario
export const createUser = async (userData) => {
  const res = await api.post("/usuarios", userData);
  return res.data;
};

// Actualizar usuario
export const updateUser = async (id, userData) => {
  const res = await api.put(`/usuarios/${id}`, userData);
  return res.data;
};

export const updateUserRole = async (userId, roleId) => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        roleId: roleId,
        message: 'Rol actualizado correctamente (simulación)'
      });
    }, 500); 
  });
  

};

// Desactivar/Activar usuario
export const toggleUserStatus = async (id) => {
  const res = await api.put(`/usuarios/${id}/toggle-status`);
  return res.data;
};

// Obtener roles disponibles
export const getRoles = async () => {
  // Por ahora retornamos roles estáticos ya que el backend no tiene este endpoint
  return [
    { id: 1, nombre: "ADMIN" },
    { id: 2, nombre: "VENDEDOR" }, 
    { id: 3, nombre: "CLIENTE" }
  ];
};