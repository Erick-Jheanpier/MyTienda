import axios from 'axios';

export interface Categoria {
  id_categoria: number;
  categoria: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/categoria', // Ajusta si usas otro puerto o prefijo
});

// Obtener todas las categorías
export const getAllCategorias = async () => {
  const response = await api.get('/getAllCategorias');
  return response.data;
};

// Obtener categoría por ID
export const getCategoriaById = async (id: number) => {
  const response = await api.get(`/getCategoriaById/${id}`);
  return response.data;
};

// Crear categoría
export const createCategoria = async (categoria: string) => {
  const response = await api.post('/createCategoria', {
    categoria,
  });
  return response.data;
};

// Actualizar categoría
export const updateCategoria = async (id: number, categoria: string) => {
  const response = await api.put(`/updateCategoria/${id}`, {
    categoria,
  });
  return response.data;
};

// Eliminar categoría
export const deleteCategoria = async (id: number) => {
  const response = await api.delete(`/deleteCategoria/${id}`);
  return response.data;
};
