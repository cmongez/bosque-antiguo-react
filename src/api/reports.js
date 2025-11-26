// src/api/reports.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1/reports", // Proxy hacia reportes en puerto 8083
});

// Agregar interceptor para JWT automático
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Resumen de ventas
export const getSalesSummary = async () => {
  const res = await api.get("/sales/summary");
  return res.data;
};

// Top productos más vendidos
export const getTopProducts = async () => {
  const res = await api.get("/products/top");
  return res.data;
};

// Ventas por categoría
export const getSalesByCategory = async () => {
  const res = await api.get("/sales/by-category");
  return res.data;
};

// Top clientes
export const getTopClients = async () => {
  const res = await api.get("/clients/top");
  return res.data;
};

// Estado del stock
export const getStockStatus = async () => {
  const res = await api.get("/stock/status");
  return res.data;
};