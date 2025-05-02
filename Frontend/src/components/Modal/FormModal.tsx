import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface FormModalProps {
  show: boolean;
  title: string;
  defaultValue: string;
  onHide: () => void;
  onSubmit: (value: string) => void;
  children?: React.ReactNode;
}

export default function FormModal({ show, title, defaultValue, onHide, onSubmit }: FormModalProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(defaultValue);
  }, [show, defaultValue]);

  const handleSubmit = () => {
    onSubmit(value.trim());
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre de la categoría</Form.Label>
            <Form.Control
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!value.trim()}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}