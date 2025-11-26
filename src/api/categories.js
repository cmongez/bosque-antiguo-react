// src/api/categories.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

// LISTAR TODAS
export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data; // [{id, nombre, descripcion}, ...]
};

// CREAR
export const createCategory = async (category) => {
  const res = await api.post("/categories", category);
  return res.data;
};

// OBTENER POR ID
export const getCategoryById = async (id) => {
  const res = await api.get(`/categories/${id}`);
  return res.data;
};

// ACTUALIZAR
export const updateCategory = async (id, category) => {
  const res = await api.put(`/categories/${id}`, category);
  return res.data;
};

// ELIMINAR
export const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}`);
};
