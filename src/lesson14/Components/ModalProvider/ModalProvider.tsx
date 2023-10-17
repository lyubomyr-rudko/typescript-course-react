import React, { useState, createContext, PropsWithChildren } from "react";

interface IModalContext {
  handleOpenModal: () => void,
  handleCloseModal: () => void,
  isOpenModal: boolean,
}

export const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  // const [modalType, setModalType] = useState<string>('');

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
    // setModalType(modaType);
  }

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  }

  return (
    <ModalContext.Provider
      value={{
        handleOpenModal,
        handleCloseModal,
        isOpenModal
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}