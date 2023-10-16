import { useEffect, useMemo} from "react";
import {createPortal} from "react-dom";
import {IModalProps} from "../types.ts";

const modalRoot = document.querySelector('#root');

const Modal = ({ children, title, isModalOpen, setIsModalOpen}: IModalProps) => {
  const modalElement = useMemo(() => document.createElement('div'), []);
  const modal = <div className='modal' onClick={() => (setIsModalOpen(false))}>
    <div className='modal__inner' onClick={(e) => e.stopPropagation()}>
      <div className='modal__header'>
        <div className='modal__title'>{title}</div>
        <div className='modal__btn-holder'>
          <span className='modal__close-btn' onClick={() => (setIsModalOpen(false))}>X</span>
        </div>
      </div>
      <div className='modal__content'>
        {children}
      </div>
    </div>
  </div>;

  useEffect(() => {
    if (isModalOpen && modalRoot) {
      modalRoot.appendChild(modalElement);

      return () => {
        modalRoot.removeChild(modalElement);
      };
    }
  });
  return isModalOpen && createPortal(modal, modalElement);
};

export default Modal;
