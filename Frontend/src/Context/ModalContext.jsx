import React, { createContext, useContext, useState } from 'react';

// Create the modal context
const ModalContext = createContext();

// Create a custom hook to use the modal context
export const useModal = () => useContext(ModalContext);

// Create the ModalProvider component
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const value = {
    isOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
