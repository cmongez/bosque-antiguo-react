// src/api/products.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // Vite hace proxy a http://localhost:8080
});

// Adaptamos el modelo del BACK al formato que espera la LISTA del FRONT
const adaptProduct = (p) => ({
  codigo: p.id,                       // id → codigo
  nombre: p.nombre,
  descripcion: p.descripcion,
  precio: Number(p.precio),           // BigDecimal → number
  img: p.imagenUrl,                   // imagenUrl → img (lo que usa ProductCard)
  categoria: p.categoria?.nombre ?? "",
  stock: p.stock ?? 15,
  stockCritico: p.stockCritico ?? 5,
});

//  LISTAR TODOS LOS PRODUCTOS
export const getProducts = async () => {
  const res = await api.get("/products");
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data.map(adaptProduct);
};

//  OBTENER PRODUCTO POR ID (PARA EDITAR)
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  const p = res.data;

  // Adaptamos al formato que espera el FORMULARIO de edición
  return {
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: Number(p.precio),                 // lo dejamos como número
    imagenUrl: p.imagenUrl,
    categoriaId: p.categoria?.id ?? "",       // sacamos el id de la categoría
  };
};

// PRODUCTOS DISPONIBLES 
export const getProductsDisponibles = async () => {
  const res = await api.get("/products?disponibles=true");
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data.map(adaptProduct);
};

//  CREAR PRODUCTO
export const createProduct = async (product) => {
  const res = await api.post("/products", product);
  return res.data;
};

//  ACTUALIZAR PRODUCTO
export const updateProduct = async (id, product) => {
  const res = await api.put(`/products/${id}`, product);
  return res.data;
};

//  ELIMINAR PRODUCTO
export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};
