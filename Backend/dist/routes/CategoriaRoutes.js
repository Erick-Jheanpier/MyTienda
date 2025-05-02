"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriaController_1 = require("../controllers/CategoriaController");
const router = (0, express_1.Router)();
// Crear Categoría
router.post("/createCategoria", CategoriaController_1.createCategoria);
// Actualizar Categoría
router.put("/updateCategoria/:id", CategoriaController_1.updateCategoria);
// Eliminar Categoría
router.delete("/deleteCategoria/:id", CategoriaController_1.deleteCategoria);
// Obtener todas las Categorías
router.get("/getAllCategorias", CategoriaController_1.getAllCategorias);
// Obtener Categoría por ID
router.get("/getCategoriaById/:id", CategoriaController_1.getCategoriaById);
// Exportar el router
exports.default = router;
