import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { getProductosConDetalle } from '../../api/ProductoApi';
import { getAllCategorias } from '../../api/CategoriaApi';
import CatalogGrid from '../../components/Catalogos/CatalogGrid/CatalogGrid';
import CategoryFilter from '../../components/Filters/CategoryFilter';
import SearchFilter from '../../components/Filters/SearchFilter';
import PriceFilter from '../../components/Filters/PriceFilter';
import { ProductoDetalle } from '../../api/ProductoApi';
import {ThemeToggler} from '../../components/ThemeToggler';
import { ThemeProvider } from '../../context/ThemeContext';

const Catalogos: React.FC = () => {
  const [productos, setProductos] = useState<ProductoDetalle[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    categoria: '',
    busqueda: '',
    ordenPrecio: ''
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [productosData, categoriasData] = await Promise.all([
          getProductosConDetalle(),
          getAllCategorias()
        ]);
        setProductos(productosData);
        setCategorias(categoriasData);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const productosFiltrados = productos
    .filter(p => 
      !filtros.categoria || p.id_categoria.toString() === filtros.categoria
    )
    .filter(p =>
      [p.nombre, p.marca, p.modelo].some(valor =>
        valor.toLowerCase().includes(filtros.busqueda.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (filtros.ordenPrecio === 'desc') return b.precio - a.precio;
      if (filtros.ordenPrecio === 'asc') return a.precio - b.precio;
      return 0;
    });

  return (
    <ThemeProvider>
      <Container className="py-5 position-relative">
        <ThemeToggler className="position-fixed top-0 end-0 m-3 z-3" />
        
        <h1 className="mb-4 text-center">Catálogo de Productos</h1>
        
        <Row className="mb-4 g-3">
          <Col md={4}>
            <CategoryFilter
              categorias={categorias}
              selectedCategory={filtros.categoria}
              onCategoryChange={(e) => setFiltros({...filtros, categoria: e})}
            />
          </Col>
          <Col md={4}>
            <SearchFilter
              onSearch={(term) => setFiltros({...filtros, busqueda: term})}
            />
          </Col>
          <Col md={4}>
            <PriceFilter
              selectedOrder={filtros.ordenPrecio}
              onOrderChange={(order) => setFiltros({...filtros, ordenPrecio: order})}
            />
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Cargando productos...</p>
          </div>
        ) : (
          <CatalogGrid productos={productosFiltrados} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Catalogos;