import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FilterContainer = styled.div`
  margin-bottom: 30px;
`;

const FilterTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #1e293b;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CategoryButton = styled(motion.button)`
  padding: 8px 16px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e2e8f0'};
  border-radius: 20px;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#475569'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    color: #667eea;
  }
  
  ${props => props.active && `
    background: #667eea;
    color: white;
    border-color: #667eea;
  `}
`;

export default function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <FilterContainer>
      <FilterTitle>Категории</FilterTitle>
      <CategoryList>
        <CategoryButton
          active={activeCategory === 'all'}
          onClick={() => onSelectCategory('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Все
        </CategoryButton>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => onSelectCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryList>
    </FilterContainer>
  );
}
