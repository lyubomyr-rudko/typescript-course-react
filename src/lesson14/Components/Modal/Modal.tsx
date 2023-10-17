import React, { useContext } from 'react';
import { createPortal } from 'react-dom';

import { ModalWrapper, ModalContent, CloseButton, Title } from './Modal.styled';
import { ModalContext } from '../../Components';

interface Iprops {
  children: React.ReactNode
}

const Modal = ({ children }: Iprops) => {

  const { handleCloseModal, isOpenModal } = useContext(ModalContext);

  return isOpenModal ? createPortal(
    <ModalWrapper active={isOpenModal} >
      <ModalContent>
        <CloseButton onClick={() => handleCloseModal()}>&#x2716;</CloseButton>
        <Title>Create New User</Title>
        {children}
      </ModalContent>
    </ModalWrapper>,
    document.getElementById("modal-root") as HTMLElement
  ) : null
}

export default Modal;
