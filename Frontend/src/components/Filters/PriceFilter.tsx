// components/Filters/PriceFilter.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

interface PriceFilterProps {
  selectedOrder: string;
  onOrderChange: (order: string) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ 
  selectedOrder, 
  onOrderChange 
}) => (
  <Form.Group controlId="priceFilter">
    <Form.Select
      value={selectedOrder}
      onChange={(e) => onOrderChange(e.target.value)}
    >
      <option value="">Ordenar por precio</option>
      <option value="asc">Menor a mayor</option>
      <option value="desc">Mayor a menor</option>
    </Form.Select>
  </Form.Group>
);

export default PriceFilter;