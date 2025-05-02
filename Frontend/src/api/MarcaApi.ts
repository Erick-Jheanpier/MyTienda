import axios from 'axios';

export interface Marca {
  id_marca: number;
  marca: string;
  id_categoria: number;
  categoria?: string; // Nueva propiedad opcional
}

const api = axios.create({
  baseURL: 'http://localhost:3000/marca',
});

// Obtener todas las marcas
export const getAllMarcas = async (): Promise<Marca[]> => {
  const response = await api.get('/getAllMarcas');
  return response.data;
};

// Crear nueva marca
export const createMarca = async (marca: string, id_categoria: number): Promise<Marca> => {
  const response = await api.post('/createMarca', { marca, id_categoria });
  return response.data;
};

// Actualizar marca (CORRECCIÓN: Template strings)
export const updateMarca = async (id: number, marca: string, id_categoria: number): Promise<Marca> => {
  const response = await api.put(`/updateMarca/${id}`, { marca, id_categoria }); // <-- Backticks
  return response.data;
};

// Eliminar marca (CORRECCIÓN: Template strings)
export const deleteMarca = async (id: number): Promise<void> => {
  await api.delete(`/deleteMarca/${id}`); // <-- Backticks
};

// Obtener marca por ID (CORRECCIÓN: Template strings)
export const getMarcaById = async (id: number): Promise<Marca> => {
  const response = await api.get(`/getMarcaById/${id}`); // <-- Backticks
  return response.data;
};