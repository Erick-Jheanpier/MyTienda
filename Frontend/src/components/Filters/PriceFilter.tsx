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
      className="form-select"
    >
      <option value="">Ordenar por precio</option>
      <option value="desc">Mayor a menor</option>
      <option value="asc">Menor a mayor</option>
    </Form.Select>
  </Form.Group>
);

export default PriceFilter;
