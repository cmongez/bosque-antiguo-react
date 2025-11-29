// src/api/products.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // Vite hace proxy a http://localhost:8080
});

// Interceptor para agregar JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Adaptamos el modelo del BACK al formato que espera el FRONT
const adaptProduct = (p) => ({
  codigo: p.id,                       // id → codigo
  nombre: p.nombre,
  descripcion: p.descripcion,
  precio: Number(p.precio),           // BigDecimal → number
  img: p.imagenUrl,                   // imagenUrl → img (lo que usa ProductCard)
  categoria: p.categoria?.nombre ?? "",
  disponible: p.disponible,           // disponible → disponible

  // Como el backend aún no tiene estos campos, ponemos valores por defecto
  stock: p.stock ?? 15,
  stockCritico: p.stockCritico ?? 5,
});

export const getProducts = async () => {
  const res = await api.get("/products"); // /api/v1/products
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data.map(adaptProduct);
};
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data; // ← devuelves el objeto directamente
};

export const getProductsDisponibles = async () => {
  const res = await api.get("/products?disponibles=true"); // /api/v1/products
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data.map(adaptProduct);
};
export const getCategories = async () => {
  const res = await api.get("/categories"); // /api/v1/categories
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data


};

export const createProduct = async (product) =>{
  const res = await api.post("/products",product); // /api/v1/products
  return res.data;
};

export const createCategory = async (category) => {
  const res = await api.post("/categories", category); // /api/v1/categories
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await api.put(`/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`); // /api/v1/products/id
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data.map(adaptProduct);
};

// Actualizar solo la disponibilidad del producto usando PATCH
export const updateProductDisponibilidad = async (id, disponible) => {
  const res = await api.patch(`/products/${id}/disponibilidad`, { disponible });
  return res.data;
};