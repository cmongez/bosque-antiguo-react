// src/api/sales.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://100.31.23.11:8081/api/v1", // EC2 - Microservicio ventas
});

// Interceptor para agregar JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Crear una nueva venta
export const createSale = async (ventaData) => {
  const res = await api.post("/sales", ventaData);
  return res.data;
};

// Obtener todas las ventas (solo ADMIN y VENDEDOR)
export const getAllSales = async () => {
  const res = await api.get("/sales");
  return res.data;
};

// Obtener venta por ID
export const getSaleById = async (id) => {
  const res = await api.get(`/sales/${id}`);
  return res.data;
};

// Obtener mis compras (usuario autenticado)
export const getMySales = async () => {
  const res = await api.get("/sales/mis-compras");
  return res.data;
};

// Obtener ventas por usuario (ADMIN puede ver de cualquier usuario)
export const getSalesByUser = async (userId) => {
  const res = await api.get(`/sales/usuario/${userId}`);
  return res.data;
};

// Anular venta (solo ADMIN)
export const cancelSale = async (id) => {
  const res = await api.delete(`/sales/${id}`);
  return res.data;
};