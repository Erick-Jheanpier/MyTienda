import { Router } from "express";
import { createCategoria, deleteCategoria, getAllCategorias, updateCategoria, getCategoriaById } from "../controllers/CategoriaController";

const router = Router();
// Crear Categoría
router.post("/createCategoria", createCategoria);
// Actualizar Categoría
router.put("/updateCategoria/:id", updateCategoria);
// Eliminar Categoría
router.delete("/deleteCategoria/:id", deleteCategoria);
// Obtener todas las Categorías
router.get("/getAllCategorias", getAllCategorias);
// Obtener Categoría por ID
router.get("/getCategoriaById/:id", getCategoriaById);
// Exportar el router
export default router;