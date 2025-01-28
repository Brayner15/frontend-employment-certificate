import '../styles/Modal.css';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;