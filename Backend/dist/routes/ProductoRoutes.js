"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductoControllers_1 = require("../controllers/ProductoControllers");
const multer_1 = require("../config/multer");
const router = (0, express_1.Router)();
// Middleware Multer para subir imágenes
router.post("/createProduct", multer_1.upload.single('imagen'), ProductoControllers_1.createProduct);
router.put("/updateProduct/:id", multer_1.upload.single('imagen'), ProductoControllers_1.updateProduct);
router.delete("/deleteProduct/:id", ProductoControllers_1.deleteProduct);
router.get("/getAllProduct", ProductoControllers_1.getAllProduct);
router.get("/getProductById/:id", ProductoControllers_1.getProductById);
router.get("/getProductosConDetalle", ProductoControllers_1.getProductosConDetalle);
exports.default = router;
