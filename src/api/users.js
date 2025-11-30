// src/api/users.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // Vite hace proxy a http://localhost:8080 (puerto del servicio de usuarios)
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
  const res = await api.get("/users");
  return res.data;
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// Crear nuevo usuario
export const createUser = async (userData) => {
  const res = await api.post("/users", userData);
  return res.data;
};

// Actualizar usuario
export const updateUser = async (id, userData) => {
  const res = await api.put(`/users/${id}`, userData);
  return res.data;
};

// Actualizar rol de usuario (solo ADMIN)
export const updateUserRole = async (userId, roleId) => {
  const res = await api.put(`/users/${userId}/role`, { roleId });
  return res.data;
};

// Desactivar/Activar usuario
export const toggleUserStatus = async (id) => {
  const res = await api.put(`/users/${id}/toggle-status`);
  return res.data;
};

// Obtener roles disponibles
export const getRoles = async () => {
  const res = await api.get("/roles");
  return res.data;
};