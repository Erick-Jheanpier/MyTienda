import { Modal, Button } from 'react-bootstrap';
import { FormEvent } from 'react';

interface MultiFormModalProps {
  show: boolean;
  title: string;
  onHide: () => void;
  onSubmit: (formData: FormData) => void;
  children: React.ReactNode;
}

export default function MultiFormModal({
  show,
  title,
  onHide,
  onSubmit,
  children
}: MultiFormModalProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Body>
          <div className="container-fluid">
            <div className="row g-3">
              {children}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancelar</Button>
          <Button variant="primary" type="submit">Guardar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}