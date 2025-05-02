import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable, { Column } from '../../components/Table/Datatable';
import MultiFormModal from '../../components/Modal/MultiFormModal';
import { ConfirmDeleteProductoModal } from '../../components/Modal/ConfirmDeleteProductoModal';
import ImageUploader from '../../components/ImageUploader';
import { Producto, createProducto, deleteProducto, getAllProductos, updateProducto } from '../../api/ProductoApi';
import { Categoria, getAllCategorias } from '../../api/CategoriaApi';
import { Marca, getAllMarcas } from '../../api/MarcaApi';
import Swal from 'sweetalert2';

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [filteredMarcas, setFilteredMarcas] = useState<Marca[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<number>(
    () => editingProducto?.id_categoria || 0
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productosResponse, categoriasData, marcasData] = await Promise.all([
          getAllProductos(),
          getAllCategorias(),
          getAllMarcas()
        ]);
        
        setProductos(Array.isArray(productosResponse) ? productosResponse : []);
        setCategorias(Array.isArray(categoriasData) ? categoriasData : []);
        setMarcas(Array.isArray(marcasData) ? marcasData : []);
        
        if (editingProducto) {
          setSelectedCategoria(editingProducto.id_categoria);
        }
      } catch (error) {
        Swal.fire('Error', 'Error al cargar los datos', 'error');
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategoria > 0) {
      const filtered = marcas.filter(m => m.id_categoria === selectedCategoria);
      setFilteredMarcas(filtered);
    } else {
      setFilteredMarcas([]);
    }
  }, [selectedCategoria, marcas]);

  const columns: Column<Producto>[] = [
    { key: 'id_producto', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'modelo', label: 'Modelo' },
    { 
      key: 'precio', 
      label: 'Precio',
      formatter: (value: any) => `$${Number(value).toFixed(2)}`
    },
    { 
      key: 'id_categoria',
      label: 'Categoría',
      formatter: (value: number) => categorias.find(c => c.id_categoria === value)?.categoria || 'N/A'
    },
    { 
      key: 'id_marca',
      label: 'Marca',
      formatter: (value: number) => marcas.find(m => m.id_marca === value)?.marca || 'N/A'
    },
    { 
      key: 'imagen',
      label: 'Imagen',
      formatter: (value: string) => value && (
        <img 
          src={value} 
          alt="Producto" 
          className="img-thumbnail"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
      )
    }
  ];

  const handleSubmit = async (formData: FormData) => {
    try {
      // Convertir campos numéricos
      const numericFields = {
        id_categoria: Number(formData.get('id_categoria')),
        id_marca: Number(formData.get('id_marca')),
        precio: Number(formData.get('precio'))
      };

      // Actualizar FormData
      formData.set('id_categoria', numericFields.id_categoria.toString());
      formData.set('id_marca', numericFields.id_marca.toString());
      formData.set('precio', numericFields.precio.toString());

      if (editingProducto) {
        await updateProducto(editingProducto.id_producto, formData);
      } else {
        await createProducto(formData);
      }

      const updatedData = await getAllProductos();
      setProductos(Array.isArray(updatedData) ? updatedData : []);
      setShowModal(false);
      Swal.fire('Éxito', 'Operación exitosa', 'success');
    } catch (error) {
      Swal.fire('Error', 'Error al guardar el producto', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteProducto(selectedId);
      setProductos(prev => prev.filter(p => p.id_producto !== selectedId));
      Swal.fire('Éxito', 'Producto eliminado correctamente', 'success');
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
    } finally {
      setShowDeleteModal(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Productos</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Nuevo Producto
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={productos}
        renderActions={(row: Producto) => (
          <div className="d-flex gap-2">
            <Button 
              variant="warning" 
              size="sm" 
              onClick={() => {
                setEditingProducto(row);
                setSelectedCategoria(row.id_categoria);
                setShowModal(true);
              }}
            >
              Editar
            </Button>
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => {
                setSelectedId(row.id_producto);
                setShowDeleteModal(true);
              }}
            >
              Eliminar
            </Button>
          </div>
        )}
      />

      <MultiFormModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingProducto(null);
          setSelectedCategoria(0);
        }}
        title={editingProducto ? 'Editar Producto' : 'Nuevo Producto'}
        onSubmit={handleSubmit}
      >
        <div className="row g-3">
          <div className="col-12">
            <ImageUploader
              name="imagen"
              label="Imagen del producto"
              required={!editingProducto}
              initialImage={editingProducto?.imagen}
            />
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Nombre *</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                defaultValue={editingProducto?.nombre || ''}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Modelo *</label>
              <input
                type="text"
                className="form-control"
                name="modelo"
                defaultValue={editingProducto?.modelo || ''}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Categoría *</label>
              <select
                className="form-select"
                name="id_categoria"
                value={selectedCategoria}
                onChange={(e) => setSelectedCategoria(Number(e.target.value))}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Marca *</label>
              <select
                className="form-select"
                name="id_marca"
                defaultValue={editingProducto?.id_marca || ''}
                required
                disabled={!selectedCategoria}
              >
                <option value="">Seleccionar marca</option>
                {filteredMarcas.map(mar => (
                  <option key={mar.id_marca} value={mar.id_marca}>
                    {mar.marca}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Precio *</label>
              <input
                type="number"
                className="form-control"
                name="precio"
                step="0.01"
                min="0"
                defaultValue={editingProducto?.precio || ''}
                required
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                defaultValue={editingProducto?.descripcion || ''}
                rows={3}
              />
            </div>
          </div>
        </div>
      </MultiFormModal>

      <ConfirmDeleteProductoModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Eliminar Producto"
        message="¿Estás seguro de eliminar este producto permanentemente?"
      />
    </div>
  );
};

export default Productos;