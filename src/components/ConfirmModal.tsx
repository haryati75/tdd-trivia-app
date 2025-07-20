import { useEffect } from 'react';
import Button from './Button';
import Text from './Text';
import './ConfirmModal.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="confirm-modal-backdrop" 
      data-testid="confirm-modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div 
        className="confirm-modal" 
        data-testid="confirm-modal"
      >
        <div 
          className="confirm-modal-content"
          data-testid="confirm-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="confirm-modal-header">
            <Text variant="heading" level={3}>{title}</Text>
          </div>
          
          <div className="confirm-modal-body">
            <Text>{message}</Text>
          </div>
          
          <div className="confirm-modal-footer">
            <Button 
              data-testid="confirm-modal-cancel"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              data-testid="confirm-modal-ok"
              onClick={onConfirm}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
