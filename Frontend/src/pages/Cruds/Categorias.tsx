import { useState, useEffect } from 'react';
import DataTable from '../../components/Table/Datatable';
import FormModal from '../../components/Modal/FormModal';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import Swal from 'sweetalert2';
import * as api from '../../api/CategoriaApi';

export default function Categorias() {
  const [data, setData] = useState<api.Categoria[]>([]);
  const [selected, setSelected] = useState<api.Categoria | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const categorias = await api.getAllCategorias();
      setData(categorias);
    } catch (error) {
      Swal.fire('Error', 'Error al cargar categorías', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (value: string) => {
    try {
      if (selected) {
        await api.updateCategoria(selected.id_categoria, value);
      } else {
        await api.createCategoria(value);
      }
      await fetchData();
      Swal.fire('Éxito', 'Operación realizada correctamente', 'success');
    } catch (error) {
      Swal.fire('Error', 'Error al guardar la categoría', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    
    try {
      await api.deleteCategoria(selected.id_categoria);
      await fetchData();
      Swal.fire('Éxito', 'Categoría eliminada', 'success');
    } catch (error) {
      Swal.fire('Error', 'Error al eliminar la categoría', 'error');
    }
  };

  return (
    <div>
      <button 
        className="btn btn-primary mb-3"
        onClick={() => {
          setSelected(null);
          setShowForm(true);
        }}
      >
        Nueva Categoría
      </button>

      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <DataTable
          columns={[
            { key: 'id_categoria', label: 'ID' },
            { key: 'categoria', label: 'Nombre' }
          ]}
          data={data}
          renderActions={(row) => (
            <>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => {
                  setSelected(row);
                  setShowForm(true);
                }}
              >
                ✏️ Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  setSelected(row);
                  setShowConfirm(true);
                }}
              >
                🗑️ Eliminar
              </button>
            </>
          )}
        />
      )}

      <FormModal
        show={showForm}
        title={selected ? 'Editar Categoría' : 'Nueva Categoría'}
        defaultValue={selected?.categoria || ''}
        onHide={() => {
          setShowForm(false);
          setSelected(null);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        show={showConfirm}
        message={`¿Eliminar "${selected?.categoria}"?`}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}