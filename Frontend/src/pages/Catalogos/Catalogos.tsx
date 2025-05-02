import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { getProductosConDetalle } from '../../api/ProductoApi';
import CatalogGrid from '../../components/Catalogos/CatalogGrid/CatalogGrid';

const Catalogos: React.FC = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProductosConDetalle();
        setProductos(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Catálogo de Productos</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando productos...</p>
        </div>
      ) : productos.length > 0 ? (
        <CatalogGrid productos={productos} />
      ) : (
        <Alert variant="warning">No se encontraron productos</Alert>
      )}
    </Container>
  );
};

export default Catalogos;