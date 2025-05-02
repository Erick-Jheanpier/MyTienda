import React from 'react';
import { Card } from 'react-bootstrap';
import { ProductoDetalle } from '../../../api/ProductoApi';

const ProductCard: React.FC<{ producto: ProductoDetalle }> = ({ producto }) => (
  <Card 
    className="h-100 shadow-sm" 
    style={{
      backgroundColor: 'var(--card-bg)',
      color: 'var(--card-text)',
      border: '1px solid var(--card-border)',
      transition: 'all 0.3s ease'
    }}
  >
    <Card.Img
      variant="top"
      src={producto.imagen}
      alt={producto.nombre}
      style={{ 
        height: '200px',
        objectFit: 'cover',
        borderBottom: '1px solid var(--card-border)'
      }}
      onError={(e) => {
        e.currentTarget.src = '/placeholder.jpg';
      }}
    />
    
    <Card.Body className="d-flex flex-column">
      <Card.Title className="fs-5 mb-3" style={{ color: 'var(--card-text)' }}>
        {producto.nombre}
      </Card.Title>
      
      <div className="d-flex gap-2 mb-2">
        <span 
          className="badge" 
          style={{ 
            backgroundColor: 'var(--badge-primary)',
            color: 'white'
          }}
        >
          {producto.categoria}
        </span>
        <span 
          className="badge" 
          style={{ 
            backgroundColor: 'var(--badge-secondary)',
            color: 'white'
          }}
        >
          {producto.marca}
        </span>
      </div>

      <Card.Text className="flex-grow-1" style={{ color: 'var(--card-text)' }}>
        {producto.descripcion}
      </Card.Text>

      <div className="mt-3">
        <h5 
          className="text-success m-0"
          style={{ color: 'var(--card-text)' }}
        >
          ${producto.precio.toFixed(2)}
        </h5>
      </div>
    </Card.Body>
  </Card>
);

export default ProductCard;