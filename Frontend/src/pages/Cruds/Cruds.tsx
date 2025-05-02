import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function Cruds() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener la vista actual desde la URL
  const currentPath = location.pathname.split('/').pop() || 'categorias';

  // Tipos válidos para las vistas
  type VistaCruds = 'categorias' | 'marcas' | 'productos';
  
  // Botones de navegación
  const botones: { vista: VistaCruds; texto: string }[] = [
    { vista: 'categorias', texto: 'Categorías' },
    { vista: 'marcas', texto: 'Marcas' },
    { vista: 'productos', texto: 'Productos' }
  ];

  return (
    <div>
      <div className="btn-group mb-4" role="group">
        {botones.map(({ vista, texto }) => (
          <button
            key={vista}
            className={`btn ${
              currentPath === vista ? 'btn-primary' : 'btn-secondary'
            }`}
            onClick={() => navigate(`/cruds/${vista}`)}
          >
            {texto}
          </button>
        ))}
      </div>
      <Outlet />
    </div>
  );
}