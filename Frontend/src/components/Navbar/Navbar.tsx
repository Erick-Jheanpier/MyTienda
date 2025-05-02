import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">MiApp CRUD</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink 
                to="/cruds" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                CRUDs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/catalogos" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Catálogos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}