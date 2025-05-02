"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MarcaController_1 = require("../controllers/MarcaController");
const router = (0, express_1.Router)();
router.post("/createMarca", MarcaController_1.createMarca);
router.put("/updateMarca/:id", MarcaController_1.updateMarca);
router.delete("/deleteMarca/:id", MarcaController_1.deleteMarca);
router.get("/getAllMarcas", MarcaController_1.getAllMarcas);
router.get("/getMarcaById/:id", MarcaController_1.getMarcaById);
// Exportar el router
exports.default = router;
