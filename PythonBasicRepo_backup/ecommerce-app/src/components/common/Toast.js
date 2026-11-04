import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastItem = styled(motion.div)`
  min-width: 300px;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-5px);
  }
  
  ${props => {
    switch (props.type) {
      case 'success':
        return `
          background: #dcfce7;
          border-left: 4px solid #22c55e;
        `;
      case 'error':
        return `
          background: #fee2e2;
          border-left: 4px solid #ef4444;
        `;
      case 'info':
        return `
          background: #e0f2fe;
          border-left: 4px solid #3b82f6;
        `;
      case 'warning':
        return `
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
        `;
      default:
        return '';
    }
  }}
`;

const ToastIcon = styled.span`
  font-size: 1.25rem;
`;

const ToastMessage = styled.span`
  flex: 1;
  font-size: 0.875rem;
  color: #333;
`;

const Toast = ({ toasts, removeToast }) => {
  return (
    <ToastContainer>
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          type={toast.type}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          onClick={() => removeToast(toast.id)}
        >
          <ToastIcon>
            {toast.type === 'success' && '✓'}
            {toast.type === 'error' && '✕'}
            {toast.type === 'info' && 'ℹ'}
            {toast.type === 'warning' && '⚠'}
          </ToastIcon>
          <ToastMessage>{toast.message}</ToastMessage>
        </ToastItem>
      ))}
    </ToastContainer>
  );
};

export default Toast;
