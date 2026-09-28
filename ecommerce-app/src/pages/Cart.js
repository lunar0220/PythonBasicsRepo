import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

const CartWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const CartContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CartTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #1e293b;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled(motion.div)`
  display: flex;
  gap: 20px;
  padding: 25px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const ProductImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 15px;
`;

const ProductActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  font-size: 1.125rem;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  color: #ef4444;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #dc2626;
  }
`;

const CartSummary = styled.div`
  align-self: flex-start;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1e293b;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
    padding-top: 20px;
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
  }
`;

const SummaryLabel = styled.span`
  color: #64748b;
`;

const SummaryValue = styled.span`
  font-weight: 500;
`;

const EmptyCart = styled.div`
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

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <CartWrapper>
        <CartContainer>
          <CartTitle>Корзина</CartTitle>
          <EmptyCart>
            <EmptyIcon>
              <FiShoppingCart size={64} />
            </EmptyIcon>
            <h3>Корзина пуста</h3>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>
              Добавьте товары в корзину, чтобы начать покупки
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Перейти к товарам
            </button>
          </EmptyCart>
        </CartContainer>
      </CartWrapper>
    );
  }

  return (
    <CartWrapper>
      <CartContainer>
        <CartTitle>Корзина ({cart.length} товаров)</CartTitle>
        <CartContent>
          <CartItems>
            {cart.map((item, index) => (
              <CartItem
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductImage>
                  <img src={item.image} alt={item.name} />
                </ProductImage>
                <ProductInfo>
                  <div>
                    <ProductName>{item.name}</ProductName>
                    <ProductPrice>{formatPrice(item.price)}</ProductPrice>
                  </div>
                  <ProductActions>
                    <QuantityControl>
                      <QuantityButton
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus size={16} />
                      </QuantityButton>
                      <Quantity>{item.quantity}</Quantity>
                      <QuantityButton
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FiPlus size={16} />
                      </QuantityButton>
                    </QuantityControl>
                    <RemoveButton onClick={() => removeFromCart(item.id)}>
                      <FiTrash2 size={20} />
                    </RemoveButton>
                  </ProductActions>
                </ProductInfo>
                <div style={{ minWidth: '120px', textAlign: 'right' }}>
                  <div style={{ fontWeight: 600 }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              </CartItem>
            ))}
          </CartItems>

          <CartSummary>
            <SummaryTitle>Итого</SummaryTitle>
            <SummaryItem>
              <SummaryLabel>Товары ({cart.length})</SummaryLabel>
              <SummaryValue>{formatPrice(cartTotal)}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Доставка</SummaryLabel>
              <SummaryValue>Бесплатно</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Скидка</SummaryLabel>
              <SummaryValue style={{ color: '#22c55e' }}>-0%</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>К оплате</SummaryLabel>
              <SummaryValue>{formatPrice(cartTotal)}</SummaryValue>
            </SummaryItem>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={handleCheckout}
            >
              Оформить заказ
              <FiArrowRight style={{ marginLeft: '8px' }} />
            </button>
          </CartSummary>
        </CartContent>
      </CartContainer>
    </CartWrapper>
  );
}
