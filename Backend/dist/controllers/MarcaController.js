"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarcaById = exports.getAllMarcas = exports.deleteMarca = exports.updateMarca = exports.createMarca = void 0;
const database_1 = __importDefault(require("../config/database"));
// Crear Marca
const createMarca = async (req, res) => {
    try {
        const { marca, id_categoria } = req.body;
        const [result] = await database_1.default.query('CALL insertar_marca(?, ?)', [marca, id_categoria]);
        res.json({ message: 'Marca creada correctamente', result });
    }
    catch (error) {
        console.error('Error al crear marca:', error);
        res.status(500).json({ error: 'Error al crear la marca' });
    }
};
exports.createMarca = createMarca;
// Actualizar Marca
const updateMarca = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { marca, id_categoria } = req.body;
        const [result] = await database_1.default.query('CALL actualizar_marca(?, ?, ?)', [id, marca, id_categoria]);
        res.json({ message: 'Marca actualizada correctamente', result });
    }
    catch (error) {
        console.error('Error al actualizar marca:', error);
        res.status(500).json({ error: 'Error al actualizar la marca' });
    }
};
exports.updateMarca = updateMarca;
// Eliminar Marca
const deleteMarca = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [result] = await database_1.default.query('CALL eliminar_marca(?)', [id]);
        res.json({ message: 'Marca eliminada correctamente', result });
    }
    catch (error) {
        console.error('Error al eliminar marca:', error);
        res.status(500).json({ error: 'Error al eliminar la marca' });
    }
};
exports.deleteMarca = deleteMarca;
// Obtener todas las Marcas con el nombre de la Categoría
const getAllMarcas = async (req, res) => {
    try {
        const query = `
      SELECT marca.id_marca, marca.marca, marca.id_categoria, categoria.categoria AS categoria
      FROM marca
      JOIN categoria ON marca.id_categoria = categoria.id_categoria

    `;
        const [result] = await database_1.default.query(query);
        res.json(result);
    }
    catch (error) {
        console.error('Error al obtener marcas:', error);
        res.status(500).json({ error: 'Error al obtener las marcas' });
    }
};
exports.getAllMarcas = getAllMarcas;
// Obtener Marca por ID
const getMarcaById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await database_1.default.query('SELECT * FROM marca WHERE id_marca = ?', [id]);
        if (Array.isArray(result) && result.length > 0) {
            res.json(result[0]);
        }
        else {
            res.status(404).json({ message: 'Marca no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al obtener marca:', error);
        res.status(500).json({ error: 'Error al obtener la marca' });
    }
};
exports.getMarcaById = getMarcaById;
