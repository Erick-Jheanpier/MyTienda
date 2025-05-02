// components/Filters/CategoryFilter.tsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { Categoria } from '../../api/CategoriaApi';

interface CategoryFilterProps {
  categorias: Categoria[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categorias, 
  selectedCategory, 
  onCategoryChange 
}) => (
  <Form.Group controlId="categoryFilter">
    <Form.Select 
      value={selectedCategory} 
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="">Todas las categorías</option>
      {categorias.map((categoria) => (
        <option key={categoria.id_categoria} value={categoria.id_categoria}>
          {categoria.categoria}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
);

export default CategoryFilter;