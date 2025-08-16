import React from 'react';
import ToastManager from 'toastify-react-native';

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}

      <ToastManager />
    </>
  );
};
