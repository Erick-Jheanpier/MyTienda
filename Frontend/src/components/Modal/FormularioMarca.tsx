import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioMarca = () => {
  const [categorias, setCategorias] = useState<any[]>([]); // Para almacenar las categorías
  const [marca, setMarca] = useState<string>(''); // Nombre de la marca
  const [idCategoria, setIdCategoria] = useState<number>(0); // id_categoria de la marca seleccionada

  // Cargar las categorías desde el backend
  useEffect(() => {
    axios.get('/categorias') // Aquí asumes que el endpoint '/categorias' te devuelve las categorías
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las categorías:', error);
      });
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviar al backend solo el id_categoria
      await axios.post('/createMarca', { marca, id_categoria: idCategoria });
      alert('Marca creada exitosamente');
    } catch (error) {
      console.error('Error al crear la marca:', error);
      alert('Hubo un error al crear la marca');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="marca">Marca:</label>
        <input
          type="text"
          id="marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="categoria">Categoría:</label>
        <select
          id="categoria"
          value={idCategoria}
          onChange={(e) => setIdCategoria(Number(e.target.value))}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.categoria}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Crear Marca</button>
    </form>
  );
};

export default FormularioMarca;
