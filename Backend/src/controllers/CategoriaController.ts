import { Request, Response } from 'express';
import { OkPacket } from 'mysql2';
import pool from '../config/database';

// Crear Categoría
export const createCategoria = async (req: Request, res: Response) => {
  try {
    const { categoria } = req.body;

    // Llamada al procedimiento almacenado 'insertar_categoria'
    const [result] = await pool.query<OkPacket[]>(
      'CALL insertar_categoria(?)',
      [categoria]
    );

    res.json({ message: 'Categoría creada correctamente', result });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

// Actualizar Categoría
export const updateCategoria = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { categoria } = req.body;

    // Llamada al procedimiento almacenado 'actualizar_categoria'
    const [result] = await pool.query<OkPacket[]>(
      'CALL actualizar_categoria(?, ?)',
      [id, categoria]
    );

    res.json({ message: 'Categoría actualizada correctamente', result });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

// Eliminar Categoría
export const deleteCategoria = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    // Llamada al procedimiento almacenado 'eliminar_categoria'
    const [result] = await pool.query<OkPacket[]>(
      'CALL eliminar_categoria(?)',
      [id]
    );

    res.json({ message: 'Categoría eliminada correctamente', result });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

// Obtener todas las Categorías
export const getAllCategorias = async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query('SELECT * FROM categoria');
    res.json(result);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

// Obtener Categoría por ID
export const getCategoriaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result]: any = await pool.query('SELECT * FROM categoria WHERE id_categoria = ?', [id]);

    if (Array.isArray(result) && result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};
