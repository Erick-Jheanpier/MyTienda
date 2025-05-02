// src/components/Catalogos/CatalogGrid/CatalogGrid.tsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard/ProductCard';
import { ProductoDetalle } from '../../../api/ProductoApi';

interface CatalogGridProps {
  productos: ProductoDetalle[];
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ productos }) => {
  if (!Array.isArray(productos) || productos.length === 0) {
    return <div className="text-center my-5">No se encontraron productos</div>;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {productos.map((producto) => (
        <Col key={producto.id_producto}>
          <ProductCard producto={producto} />
        </Col>
      ))}
    </Row>
  );
};

export default CatalogGrid;