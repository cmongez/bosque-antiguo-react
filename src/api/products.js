// src/api/products.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // Vite hace proxy a http://localhost:8080
});

// Adaptamos el modelo del BACK al formato que espera el FRONT
const adaptProduct = (p) => ({
  codigo: p.id,                       // id → codigo
  nombre: p.nombre,
  descripcion: p.descripcion,
  precio: Number(p.precio),           // BigDecimal → number
  img: p.imagenUrl,                   // imagenUrl → img (lo que usa ProductCard)
  categoria: p.categoria?.nombre ?? "",

  // Como el backend aún no tiene estos campos, ponemos valores por defecto
  stock: p.stock ?? 15,
  stockCritico: p.stockCritico ?? 5,
});

export const getProducts = async () => {
  const res = await api.get("/products"); // /api/v1/products
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  return data.map(adaptProduct);
};
