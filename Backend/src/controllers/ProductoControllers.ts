import { Request, Response } from 'express';
import { OkPacket } from 'mysql2';
import pool from '../config/database';
import { RequestHandler } from 'express';

// Función para generar URLs completas de imágenes
const generateImageUrl = (imagePath: string | null) => {
  return imagePath ? `http://localhost:3000/${imagePath}` : null;
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { id_categoria, id_marca, modelo, nombre, precio, descripcion } = req.body;
    
    // Manejo de imagen con URL completa
    const imagen = req.file ? `images/${req.file.filename}` : null;

    const [result] = await pool.query<OkPacket[]>(
      'CALL insertar_producto(?, ?, ?, ?, ?, ?, ?)',
      [id_categoria, id_marca, modelo, nombre, precio, imagen, descripcion]
    );

    res.json({
      success: true,
      message: 'Producto creado correctamente',
      data: {
        ...result,
        imagen: generateImageUrl(imagen) // Incluir URL completa
      }
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear el producto'
    });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const id_producto = parseInt(req.params.id);
    const { id_categoria, id_marca, modelo, nombre, precio, descripcion, imagen_actual } = req.body;

    // Mantener imagen existente si no se sube nueva
    const imagen = req.file ? 
      `images/${req.file.filename}` : 
      imagen_actual;

    const [result] = await pool.query(
      'CALL actualizar_producto(?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id_producto,
        Number(id_categoria),
        Number(id_marca),
        modelo,
        nombre,
        Number(precio),
        imagen,
        descripcion
      ]
    );

    res.json({ 
      success: true,
      message: 'Producto actualizado',
      data: {
        ...result,
        imagen: generateImageUrl(imagen)
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error en el servidor'
    });
  }
};

export const getProductosConDetalle = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('CALL obtener_productos_con_detalle()');
    
    // Formatear respuesta con URLs completas y conversión numérica
    const productos = rows[0].map((producto: any) => ({
      ...producto,
      precio: Number(producto.precio),
      imagen: generateImageUrl(producto.imagen)
    }));

    res.json({ 
      success: true, 
      data: productos 
    });
  } catch (error) {
    console.error('Error al obtener productos con detalle:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los productos con detalle'
    });
  }
};

// Métodos restantes con mejoras similares
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const [result]: any = await pool.query('CALL obtener_productos()');
    
    const productos = result[0].map((p: any) => ({
      ...p,
      precio: Number(p.precio),
      imagen: generateImageUrl(p.imagen)
    }));
    
    res.json({ 
      success: true, 
      data: productos 
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los productos'
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id_producto = parseInt(req.params.id);
    const [result]: any = await pool.query(
      'CALL obtener_producto_por_id(?)', 
      [id_producto]
    );
    
    const producto = result[0][0];
    
    res.json({ 
      success: true, 
      data: {
        ...producto,
        precio: Number(producto.precio),
        imagen: generateImageUrl(producto.imagen)
      }
    });
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el producto'
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id_producto = parseInt(req.params.id);
    await pool.query('CALL eliminar_producto(?)', [id_producto]);
    res.json({ 
      success: true, 
      message: 'Producto eliminado' 
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el producto'
    });
  }
};