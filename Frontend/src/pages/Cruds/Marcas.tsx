import { useState, useEffect } from 'react';
import DataTable from '../../components/Table/Datatable';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import FormModalMarcas from '../../components/Modal/FormModalMarcas';
import Swal from 'sweetalert2';
import * as marcaApi from '../../api/MarcaApi';
import * as categoriaApi from '../../api/CategoriaApi';
import { Marca } from '../../api/MarcaApi';

interface Categoria {
  id_categoria: number;
  categoria: string;
}

export default function Marcas() {
  const [data, setData] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selected, setSelected] = useState<Marca | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [marcas, cats] = await Promise.all([
        marcaApi.getAllMarcas(),
        categoriaApi.getAllCategorias()
      ]);
      setData(marcas);
      setCategorias(cats);
    } catch {
      Swal.fire('Error', 'Error al cargar datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // NUEVO: recibe los datos directos del modal
  const handleSave = async (marca: string, id_categoria: number) => {
    if (!marca.trim() || !id_categoria) {
      Swal.fire('Error', 'Marca y categoría son obligatorias', 'error');
      return;
    }
    try {
      if (selected) {
        await marcaApi.updateMarca(selected.id_marca, marca, id_categoria);
      } else {
        await marcaApi.createMarca(marca, id_categoria);
      }
      await fetchData();
      setShowForm(false);
      Swal.fire('Éxito', 'Operación exitosa', 'success');
    } catch {
      Swal.fire('Error', 'Error al guardar', 'error');
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await marcaApi.deleteMarca(selected.id_marca);
      await fetchData();
      setShowConfirm(false);
      Swal.fire('Éxito', 'Marca eliminada', 'success');
    } catch {
      Swal.fire('Error', 'Error al eliminar', 'error');
    }
  };

  // Cuando abra el modal en “Nueva Marca” o “Editar”
  const openForm = (m?: Marca) => {
    setSelected(m || null);
    setShowForm(true);
  };

  return (
    <div>
      <button className="btn btn-primary mb-3" onClick={() => openForm()}>
        Nueva Marca
      </button>

      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <DataTable
          columns={[
            { key: 'marca', label: 'Marca' },
            {
              key: 'id_categoria',
              label: 'Categoría',
              formatter: (value) =>
                categorias.find(c => c.id_categoria === value)?.categoria || 'Desconocida'
            }
          ]}
          data={data}
          renderActions={row => (
            <>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => openForm(row)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => { setSelected(row); setShowConfirm(true); }}
              >
                Eliminar
              </button>
            </>
          )}
        />
      )}

      <FormModalMarcas
        show={showForm}
        title={selected ? 'Editar Marca' : 'Nueva Marca'}
        defaultValue={selected?.marca || ''}
        selectedCategoryId={selected?.id_categoria || categorias[0]?.id_categoria || 0}
        categories={categorias}
        onHide={() => setShowForm(false)}
        onSubmit={(data) => handleSave(data.marca, data.id_categoria)}
      />

      <ConfirmModal
        show={showConfirm}
        message={`¿Eliminar "${selected?.marca}"?`}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

