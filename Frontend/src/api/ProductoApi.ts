import axios from 'axios';

export interface Producto {
  id_producto: number;
  nombre: string;
  modelo: string;
  descripcion: string;
  imagen: string;
  id_categoria: number;
  id_marca: number;
  precio: number;
}

export interface ProductoDetalle {
  id_producto: number;
  id_categoria: number;  // <- Agregar ID de categoría
  categoria: string;     // Nombre de categoría
  id_marca: number;      // <- Agregar ID de marca
  marca: string;         // Nombre de marca
  modelo: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/producto'
});

export const getAllProductos = async (): Promise<Producto[]> => {
  try {
    const response = await api.get('/getAllProduct');
    return response.data.data; // ← Ahora recibe directamente el array
  } catch (error) {
    throw new Error('Error al obtener productos');
  }
};

// En la función getProductosConDetalle
export const getProductosConDetalle = async (): Promise<ProductoDetalle[]> => {
  try {
    const response = await api.get('/getProductosConDetalle');
    
    if (!response.data.success || !Array.isArray(response.data.data)) {
      return [];
    }

    // Mapear y convertir tipos
    return response.data.data.map((producto: any) => ({
      ...producto,
      precio: Number(producto.precio), // Conversión explícita
      id_producto: Number(producto.id_producto)
    }));
    
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const createProducto = async (formData: FormData): Promise<Producto> => {
  try {
    const response = await api.post('/createProduct', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear producto');
  }
};

export const updateProducto = async (id: number, formData: FormData): Promise<Producto> => {
  try {
    const response = await api.put(`/updateProduct/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar producto');
  }
};

export const deleteProducto = async (id: number): Promise<void> => {
  try {
    await api.delete(`/deleteProduct/${id}`);
  } catch (error) {
    throw new Error('Error al eliminar producto');
  }
};