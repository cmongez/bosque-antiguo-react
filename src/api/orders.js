// src/api/orders.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://100.31.23.11:8081/api/v1", // EC2 - Microservicio ventas
});

// Agregar interceptor para JWT automático
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Crear nueva orden
export const createOrder = async (orderData) => {
  // orderData debe tener: detalles: [{productoId, cantidad}]
  // El usuarioId se extrae del JWT en el backend
  const res = await api.post("/sales", orderData);
  return res.data;
};

// Obtener orden por ID
export const getOrderById = async (id) => {
  const res = await api.get(`/sales/${id}`);
  return res.data;
};

// Obtener órdenes por usuario
export const getOrdersByUser = async (userId) => {
  const res = await api.get(`/sales/user/${userId}`);
  return res.data;
};

// Listar todas las órdenes (solo admin)
export const getAllOrders = async () => {
  const res = await api.get("/sales");
  return res.data;
};

// Obtener mis compras (usuario autenticado)
export const getMisCompras = async () => {
  const res = await api.get("/sales/mis-compras");
  return res.data;
};

// Obtener órdenes por usuario específico (para admin)
export const getOrdersByUserId = async (userId) => {
  const res = await api.get(`/sales/user/${userId}`);
  return res.data;
};