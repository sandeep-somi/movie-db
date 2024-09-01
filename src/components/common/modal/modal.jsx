import ReactDOM from "react-dom"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="mdb-modal">
      <div className="mdb-modal__content">
        <span className="mdb-modal__close" onClick={onClose}>&times;</span>
        <div className="mdb-modal__body">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-portal')
  );
}

export default Modal