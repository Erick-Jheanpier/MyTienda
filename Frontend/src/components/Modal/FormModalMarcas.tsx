import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Categoria {
    id_categoria: number;
    categoria: string;
}

interface FormModalMarcasProps {
    show: boolean;
    title: string;
    defaultValue?: string;
    selectedCategoryId: number;
    categories: Categoria[];
    onHide: () => void;
    onSubmit: (data: { marca: string; id_categoria: number }) => void;
}

export default function FormModalMarcas({
    show,
    title,
    defaultValue = '',
    selectedCategoryId,
    categories,
    onHide,
    onSubmit
}: FormModalMarcasProps) {
    const [marca, setMarca] = useState('');
    const [id_categoria, setIdCategoria] = useState<number>(0);

    useEffect(() => {
        setMarca(defaultValue);
        setIdCategoria(selectedCategoryId);
    }, [defaultValue, selectedCategoryId]);

    // en FormModalMarcas.tsx
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ marca, id_categoria });
  };
  

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type="text"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            placeholder="Ingrese el nombre de la marca"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                            value={id_categoria}
                            onChange={(e) => setIdCategoria(Number(e.target.value))}
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id_categoria} value={cat.id_categoria}>
                                    {cat.categoria}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
