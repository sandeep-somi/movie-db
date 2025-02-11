import React from "react"
import ReactDOM from "react-dom"

type TModal = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<TModal> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="mdb-modal" data-testid="modal">
      <div className="mdb-modal__content">
        <span className="mdb-modal__close" onClick={onClose}>
          &times;
        </span>
        <div className="mdb-modal__body">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-portal") as HTMLElement
  );
};

export default Modal