"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriaById = exports.getAllCategorias = exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = void 0;
const database_1 = __importDefault(require("../config/database"));
// Crear Categoría
const createCategoria = async (req, res) => {
    try {
        const { categoria } = req.body;
        // Llamada al procedimiento almacenado 'insertar_categoria'
        const [result] = await database_1.default.query('CALL insertar_categoria(?)', [categoria]);
        res.json({ message: 'Categoría creada correctamente', result });
    }
    catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};
exports.createCategoria = createCategoria;
// Actualizar Categoría
const updateCategoria = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { categoria } = req.body;
        // Llamada al procedimiento almacenado 'actualizar_categoria'
        const [result] = await database_1.default.query('CALL actualizar_categoria(?, ?)', [id, categoria]);
        res.json({ message: 'Categoría actualizada correctamente', result });
    }
    catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};
exports.updateCategoria = updateCategoria;
// Eliminar Categoría
const deleteCategoria = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Llamada al procedimiento almacenado 'eliminar_categoria'
        const [result] = await database_1.default.query('CALL eliminar_categoria(?)', [id]);
        res.json({ message: 'Categoría eliminada correctamente', result });
    }
    catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};
exports.deleteCategoria = deleteCategoria;
// Obtener todas las Categorías
const getAllCategorias = async (req, res) => {
    try {
        const [result] = await database_1.default.query('SELECT * FROM categoria');
        res.json(result);
    }
    catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};
exports.getAllCategorias = getAllCategorias;
// Obtener Categoría por ID
const getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await database_1.default.query('SELECT * FROM categoria WHERE id_categoria = ?', [id]);
        if (Array.isArray(result) && result.length > 0) {
            res.json(result[0]);
        }
        else {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al obtener categoría:', error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
};
exports.getCategoriaById = getCategoriaById;
