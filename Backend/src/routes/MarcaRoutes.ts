import { Router } from "express";
import { createMarca, deleteMarca, getAllMarcas, updateMarca, getMarcaById } from "../controllers/MarcaController";
const router = Router();
router.post("/createMarca", createMarca);
router.put("/updateMarca/:id", updateMarca);
router.delete("/deleteMarca/:id", deleteMarca);
router.get("/getAllMarcas", getAllMarcas);
router.get("/getMarcaById/:id", getMarcaById);
// Exportar el router
export default router;