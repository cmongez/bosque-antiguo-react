// src/api/orders.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // Proxy hacia ventas en puerto 8081
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
  // orderData debe tener: clienteId, productos: [{productoId, cantidad, precio}], total
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