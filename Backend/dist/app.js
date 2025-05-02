"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const CategoriaRoutes_1 = __importDefault(require("./routes/CategoriaRoutes"));
const MarcaRoutes_1 = __importDefault(require("./routes/MarcaRoutes"));
const ProductoRoutes_1 = __importDefault(require("./routes/ProductoRoutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Configuración clave para servir imágenes
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../images')));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/categoria", CategoriaRoutes_1.default);
app.use('/marca', MarcaRoutes_1.default);
app.use('/producto', ProductoRoutes_1.default);
exports.default = app;
