import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Cruds from '../pages/Cruds/Cruds';
import Catalogos from '../pages/Catalogos/Catalogos';
import Categorias from '../pages/Cruds/Categorias';
import Marcas from '../pages/Cruds/Marcas';
import Productos from '../pages/Cruds/Productos';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/cruds" element={<Cruds />}>
            <Route path="categorias" element={<Categorias />} />
            <Route path="marcas" element={<Marcas />} />
            <Route path="productos" element={<Productos />} />
            <Route index element={<Navigate to="categorias" replace />} />
          </Route>
          <Route path="/catalogos" element={<Catalogos />} />
          <Route path="*" element={<Navigate to="/cruds" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}