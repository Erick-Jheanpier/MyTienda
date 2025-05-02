import { Request, Response } from 'express';
import { OkPacket } from 'mysql2';
import pool from '../config/database';

// Crear Marca
export const createMarca = async (req: Request, res: Response) => {
  try {
    const { marca, id_categoria } = req.body;

    const [result] = await pool.query<OkPacket[]>(
      'CALL insertar_marca(?, ?)',
      [marca, id_categoria]
    );

    res.json({ message: 'Marca creada correctamente', result });
  } catch (error) {
    console.error('Error al crear marca:', error);
    res.status(500).json({ error: 'Error al crear la marca' });
  }
};

// Actualizar Marca
export const updateMarca = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { marca, id_categoria } = req.body;

    const [result] = await pool.query<OkPacket[]>(
      'CALL actualizar_marca(?, ?, ?)',
      [id, marca, id_categoria]
    );

    res.json({ message: 'Marca actualizada correctamente', result });
  } catch (error) {
    console.error('Error al actualizar marca:', error);
    res.status(500).json({ error: 'Error al actualizar la marca' });
  }
};

// Eliminar Marca
export const deleteMarca = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const [result] = await pool.query<OkPacket[]>(
      'CALL eliminar_marca(?)',
      [id]
    );

    res.json({ message: 'Marca eliminada correctamente', result });
  } catch (error) {
    console.error('Error al eliminar marca:', error);
    res.status(500).json({ error: 'Error al eliminar la marca' });
  }
};

// Obtener todas las Marcas con el nombre de la Categoría
export const getAllMarcas = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT marca.id_marca, marca.marca, marca.id_categoria, categoria.categoria AS categoria
      FROM marca
      JOIN categoria ON marca.id_categoria = categoria.id_categoria

    `;

    const [result] = await pool.query(query);
    res.json(result);
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    res.status(500).json({ error: 'Error al obtener las marcas' });
  }
};


// Obtener Marca por ID
export const getMarcaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [result]: any = await pool.query('SELECT * FROM marca WHERE id_marca = ?', [id]);

    if (Array.isArray(result) && result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Marca no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener marca:', error);
    res.status(500).json({ error: 'Error al obtener la marca' });
  }
};
