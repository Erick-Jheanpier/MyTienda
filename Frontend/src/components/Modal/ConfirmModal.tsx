// ConfirmModal.tsx
import { Modal, Button } from 'react-bootstrap';

interface ConfirmModalProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void; // Mantenemos para compatibilidad
  onHide?: () => void;  // Nueva prop alineada con react-bootstrap
}

export default function ConfirmModal({
  show,
  message,
  onConfirm,
  onCancel,
  onHide = onCancel // Valor por defecto para onHide
}: ConfirmModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}