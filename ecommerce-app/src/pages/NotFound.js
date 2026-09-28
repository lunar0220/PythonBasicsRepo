import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiHome, FiArrowRight } from 'react-icons/fi';

const NotFoundWrapper = styled(motion.div)`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 80px 40px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const NotFoundCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: #667eea;
  line-height: 1;
  margin-bottom: 20px;
`;

const NotFoundTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
`;

const NotFoundText = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 40px;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

export default function NotFound() {
  return (
    <NotFoundWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NotFoundContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NotFoundCode>404</NotFoundCode>
        <NotFoundTitle>Страница не найдена</NotFoundTitle>
        <NotFoundText>
          К сожалению, запрашиваемая страница не существует. 
          Она могла быть удалена, переименована или временно недоступна.
        </NotFoundText>
        <HomeButton to="/">
          <FiHome size={24} />
          На главную
          <FiArrowRight size={20} />
        </HomeButton>
      </NotFoundContainer>
    </NotFoundWrapper>
  );
}
