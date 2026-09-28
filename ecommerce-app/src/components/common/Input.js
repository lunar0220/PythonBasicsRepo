import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: ${props => props.marginBottom || '20px'};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #475569;
  font-size: 0.875rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${props => props.size === 'small' ? '8px 12px' : '12px 16px'};
  border: 2px solid ${props => props.error ? '#ef4444' : '#e2e8f0'};
  border-radius: 8px;
  font-size: ${props => props.size === 'small' ? '0.875rem' : '1rem'};
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

export const Input = ({ 
  label, 
  error, 
  marginBottom,
  size = 'medium',
  ...props 
}) => {
  return (
    <InputContainer marginBottom={marginBottom}>
      {label && <Label>{label}</Label>}
      <StyledInput 
        error={error} 
        size={size}
        {...props}
      />
      {error && (
        <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>
          {error}
        </div>
      )}
    </InputContainer>
  );
};

export const Select = ({ 
  label, 
  options, 
  error, 
  marginBottom,
  ...props 
}) => {
  return (
    <InputContainer marginBottom={marginBottom}>
      {label && <Label>{label}</Label>}
      <StyledInput 
        as="select"
        error={error}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledInput>
      {error && (
        <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>
          {error}
        </div>
      )}
    </InputContainer>
  );
};

export const TextArea = ({ 
  label, 
  error, 
  marginBottom,
  rows = 4,
  ...props 
}) => {
  return (
    <InputContainer marginBottom={marginBottom}>
      {label && <Label>{label}</Label>}
      <StyledInput 
        as="textarea"
        error={error}
        rows={rows}
        {...props}
      />
      {error && (
        <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>
          {error}
        </div>
      )}
    </InputContainer>
  );
};
