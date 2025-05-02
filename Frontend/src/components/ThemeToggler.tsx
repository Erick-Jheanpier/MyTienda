import React from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { MoonStars, Sun } from 'react-bootstrap-icons';

interface ThemeTogglerProps {
  className?: string; // Agregar esta línea
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({ className }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button 
      variant="outline-secondary"
      onClick={toggleTheme}
      className={className} // Usar la prop aquí
      aria-label="Cambiar tema"
    >
      {isDarkMode ? <Sun size={20} /> : <MoonStars size={20} />}
    </Button>
  );
};



