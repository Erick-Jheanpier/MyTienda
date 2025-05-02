// src/components/Catalogos/ProductCard/ProductCard.tsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { ProductoDetalle } from '../../../api/ProductoApi';

interface ProductCardProps {
    producto: ProductoDetalle;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Img
                variant="top"
                src={producto.imagen}
                alt={producto.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-5 mb-3">{producto.nombre}</Card.Title>
                <div className="d-flex gap-2 mb-2">
                    <span className="badge bg-primary">{producto.categoria}</span>
                    <span className="badge bg-secondary">{producto.marca}</span>
                </div>
                <Card.Text className="text-muted flex-grow-1">
                    {producto.descripcion}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <h5 className="text-success mb-0">
                        ${typeof producto.precio === 'number'
                            ? producto.precio.toFixed(2)
                            : Number(producto.precio).toFixed(2)}
                    </h5>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;