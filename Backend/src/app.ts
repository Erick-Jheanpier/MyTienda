import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import CategoriaRoutes from "./routes/CategoriaRoutes";
import MarcaRoutes from "./routes/MarcaRoutes";
import ProductoRoutes from "./routes/ProductoRoutes";
import path from "path";

const app = express();

// Configuración clave para servir imágenes
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use(cors());
app.use(bodyParser.json());
app.use("/categoria", CategoriaRoutes);
app.use('/marca', MarcaRoutes);
app.use('/producto', ProductoRoutes);

export default app;