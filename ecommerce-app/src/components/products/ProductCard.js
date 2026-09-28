import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const ProductCardWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const ProductContent = styled.div`
  padding: 20px;
`;

const ProductCategory = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const ProductTitle = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  display: block;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 15px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:first-child {
    background: #f1f5f9;
    color: #334155;
    
    &:hover {
      background: #e2e8f0;
    }
  }
  
  &:last-child {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
svg {
  color: ${props => props.$active ? '#ef4444' : '#cbd5e1'};
  transition: all 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.1);
    background: #f1f5f9;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
  
  .rating-star {
    color: #fbbf24;
    font-size: 0.875rem;
  }
  
  .rating-text {
    font-size: 0.75rem;
    color: #64748b;
  }
`;

export default function ProductCard({ product, showCategory = true }) {
  const {
    addToCart,
    addToFavorites,
    removeFromFavorites,
    isInFavorites
  } = useCart();

const { addToast } = useToast();

const isFavorite = isInFavorites(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    addToast('Товар добавлен в корзину', 'success');
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();

    if (isFavorite) {
      removeFromFavorites(product.id);
      addToast('Удалено из избранного', 'warning');
    } else {
      addToFavorites(product);
      addToast('Добавлено в избранное', 'success');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  return (
    <ProductCardWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
    <ProductImage>
      <img src={product.image} alt={product.name} />

      <FavoriteButton
        onClick={handleToggleFavorite}
        $active={isFavorite}
      >
        <FiHeart />
      </FavoriteButton>
    </ProductImage>
      
      <ProductContent>
        {showCategory && (
          <ProductCategory>{product.category}</ProductCategory>
        )}
        
        <ProductTitle to={`/products/${product.id}`}>
          {product.name}
        </ProductTitle>
        
        <ProductPrice>{formatPrice(product.price)}</ProductPrice>
        
        <ProductActions>
          <ActionButton onClick={handleAddToCart}>
            <FiShoppingCart size={18} />
            <span style={{ marginLeft: '8px' }}>В корзину</span>
          </ActionButton>
        </ProductActions>
      </ProductContent>
    </ProductCardWrapper>
  );
}
