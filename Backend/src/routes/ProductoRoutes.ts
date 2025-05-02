import { Router } from "express";
import { createProduct, deleteProduct, getAllProduct, updateProduct, getProductById,getProductosConDetalle } from "../controllers/ProductoControllers";
import { upload } from '../config/multer';


const router = Router();

// Middleware Multer para subir imágenes
router.post("/createProduct", upload.single('imagen'), createProduct);
router.put("/updateProduct/:id", upload.single('imagen'), updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductById/:id", getProductById);
router.get("/getProductosConDetalle", getProductosConDetalle);

export default router;




