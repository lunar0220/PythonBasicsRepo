import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Button = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'small' ? '8px 16px' : props.size === 'large' ? '16px 32px' : '12px 24px'};
  border-radius: ${props => props.rounded ? '50px' : '8px'};
  font-weight: 500;
  font-size: ${props => props.size === 'small' ? '0.875rem' : props.size === 'large' ? '1.125rem' : '1rem'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
          }
        `;
      case 'secondary':
        return `
          background: #f1f5f9;
          color: #334155;
          
          &:hover {
            background: #e2e8f0;
          }
        `;
      case 'outline':
        return `
          border: 2px solid #667eea;
          color: #667eea;
          background: transparent;
          
          &:hover {
            background: #667eea;
            color: white;
          }
        `;
      case 'danger':
        return `
          background: #ef4444;
          color: white;
          
          &:hover {
            background: #dc2626;
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #64748b;
          
          &:hover {
            background: #f1f5f9;
            color: #334155;
          }
        `;
      default:
        return '';
    }
  }}
`;

export default Button;
