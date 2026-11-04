import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiHeart, FiShoppingCart, FiX, FiStar } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const FavoritesWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const FavoritesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FavoritesHeader = styled.div`
  margin-bottom: 40px;
`;

const FavoritesTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  
  span {
    color: #ef4444;
  }
`;

const FavoritesContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const EmptyFavorites = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  color: #cbd5e1;
`;

const RemovedItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #fee2e2;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const RemovedItemInfo = styled.div`
  flex: 1;
  
  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  p {
    color: #ef4444;
    font-size: 0.875rem;
  }
`;

export default function Favorites() {
  const { removeFromCart } = useCart();
  const { addToast } = useToast();
  const [removedItems, setRemovedItems] = useState([]);

  const { favorites, removeFromFavorites } = useCart();

  // const favoriteProducts = [
  //   {
  //     id: 1,
  //     name: 'Смартфон Galaxy S24',
  //     category: 'Электроника',
  //     price: 79990,
  //     image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  //     rating: 4.8,
  //     reviews: 128
  //   },
  //   {
  //     id: 3,
  //     name: 'Умные часы Apple Watch Ultra',
  //     category: 'Гаджеты',
  //     price: 64990,
  //     image: 'https://images.unsplash.com/photo-1523275335684-37898b6a3d51?auto=format&fit=crop&w=800&q=80',
  //     rating: 4.7,
  //     reviews: 89
  //   }
  // ];

  const handleRemove = (productId) => {
    setRemovedItems(prev => [...prev, productId]);
    addToast('Удалено из избранного', 'warning');
  };

  return (
    <FavoritesWrapper>
      <FavoritesContainer>
        <FavoritesHeader>
          <FavoritesTitle>Избранное <FiHeart size={30} /></FavoritesTitle>
        </FavoritesHeader>

        {removedItems.length > 0 && (
          <RemovedItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiX size={30} style={{ color: '#ef4444' }} />
            <RemovedItemInfo>
              <h4>Удалено из избранного</h4>
              <p>Нажмите на товар, чтобы вернуть</p>
            </RemovedItemInfo>
          </RemovedItem>
        )}

        {favorites.length === 0 ? (
          <EmptyFavorites>
            <EmptyIcon>
              <FiHeart size={64} />
            </EmptyIcon>
            <h3>Избранное пусто</h3>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>
              Добавляйте товары в избранное, чтобы быстро найти их позже
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                favorites.forEach(product => {
                  addToast(`Добавлено в избранное: ${product.name}`, 'success');
                });
              }}
            >
              Смотреть товары
            </button>
          </EmptyFavorites>
        ) : (
          <FavoritesContent>
            <ProductsGrid>
              {favorites.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onRemove={() => handleRemove(product.id)}
                />
              ))}
            </ProductsGrid>
          </FavoritesContent>
        )}
      </FavoritesContainer>
    </FavoritesWrapper>
  );
}
