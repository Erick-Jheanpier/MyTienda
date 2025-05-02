import { Modal, Button } from 'react-bootstrap';

export interface ConfirmDeleteProductoModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
}

// 2. Usar la interfaz renombrada en el componente
export const ConfirmDeleteProductoModal: React.FC<ConfirmDeleteProductoModalProps> = ({
  show,
  onHide,
  onConfirm,
  title,
  message
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};