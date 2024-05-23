import { useMemo, useState } from 'react';
import './Toast.css';
import { ToastContext } from './ToastContext';

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description }) => {
    const newToast = {
      id: Date.now(),
      title,
      description,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => hideToast(newToast.id), 3000);
  };

  const hideToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const contextValue = useMemo(() => ({ toasts, toast }), [toasts]);
  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toasts-container">
        {toasts.length !== 0 &&
          toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              title={toast.title}
              description={toast.description}
            />
          ))}
      </div>
    </ToastContext.Provider>
  );
}

const Toast = ({ id, title, description }) => {
  return (
      <div key={id} className="Toast">
        <h1 className="toast-title">{title}</h1>
        <p>{description}</p>
      </div>
  );
};

export default Toast;