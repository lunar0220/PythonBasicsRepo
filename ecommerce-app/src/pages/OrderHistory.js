import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiShoppingBag, FiEye, FiStar, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const OrdersWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const OrdersContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const OrdersHeader = styled.div`
  margin-bottom: 40px;
`;

const OrdersTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
`;

const OrdersContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const OrderCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e2e8f0;
`;

const OrderInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 5px;
  }
  
  .order-date {
    color: #64748b;
    font-size: 0.875rem;
  }
  
  .order-total {
    font-size: 1.25rem;
    font-weight: 700;
    color: #667eea;
    margin-top: 5px;
  }
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.875rem;
  
  &.processing {
    background: #fef3c7;
    color: #92400e;
  }
  
  &.shipped {
    background: #dbeafe;
    color: #1e40af;
  }
  
  &.delivered {
    background: #dcfce7;
    color: #166534;
  }
`;

const OrderItems = styled.div`
  margin-bottom: 25px;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderItemImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OrderItemInfo = styled.div`
  flex: 1;
  
  .item-name {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 5px;
  }
  
  .item-quantity {
    color: #64748b;
    font-size: 0.875rem;
  }
  
  .item-price {
    font-weight: 600;
    color: #667eea;
    margin-top: 5px;
  }
`;

const OrderActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.view {
    background: #f1f5f9;
    color: #334155;
    
    &:hover {
      background: #e2e8f0;
    }
  }
  
  &.review {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
  }
`;

const EmptyOrders = styled.div`
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

export default function OrderHistory() {
  const navigate = useNavigate();
  
  const orders = [
    {
      id: '#ORD-001',
      date: '15 дек 2026, 14:30',
      total: '129 990 ₽',
      items: 3,
      status: 'delivered'
    },
    {
      id: '#ORD-002',
      date: '10 дек 2026, 09:15',
      total: '45 990 ₽',
      items: 2,
      status: 'shipped'
    },
    {
      id: '#ORD-003',
      date: '5 дек 2026, 18:45',
      total: '29 990 ₽',
      items: 1,
      status: 'processing'
    }
  ];

  return (
    <OrdersWrapper>
      <OrdersContainer>
        <OrdersHeader>
          <OrdersTitle>Мои заказы</OrdersTitle>
        </OrdersHeader>

        <OrdersContent>
          {orders.length === 0 ? (
            <EmptyOrders>
              <EmptyIcon>
                <FiShoppingBag size={64} />
              </EmptyIcon>
              <h3>У вас пока нет заказов</h3>
              <p style={{ color: '#64748b', marginBottom: '30px' }}>
                Начните с поиска товаров в нашем каталоге
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/products')}
              >
                Кatalog товаров
              </button>
            </EmptyOrders>
          ) : (
            orders.map((order, index) => (
              <OrderCard
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <OrderHeader>
                  <OrderInfo>
                    <h3>{order.id}</h3>
                    <div className="order-date">{order.date}</div>
                    <div className="order-total">{order.total}</div>
                  </OrderInfo>
                  <OrderStatus className={order.status}>
                    {order.status === 'processing' && <FiClock size={16} />}
                    {order.status === 'shipped' && <FiCheckCircle size={16} />}
                    {order.status === 'delivered' && <FiCheckCircle size={16} />}
                    {order.status === 'processing' && 'В обработке'}
                    {order.status === 'shipped' && 'Отправлено'}
                    {order.status === 'delivered' && 'Доставлено'}
                  </OrderStatus>
                </OrderHeader>

                <OrderItems>
                  {Array.from({ length: order.items }).map((_, i) => (
                    <OrderItem key={i}>
                      <OrderItemImage>
                        <img 
                          src={`https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80`} 
                          alt="Product"
                        />
                      </OrderItemImage>
                      <OrderItemInfo>
                        <div className="item-name">Смартфон Galaxy S24</div>
                        <div className="item-quantity">x1</div>
                        <div className="item-price">79 990 ₽</div>
                      </OrderItemInfo>
                    </OrderItem>
                  ))}
                </OrderItems>

                <OrderActions>
                  <ActionButton className="view" onClick={() => navigate(`/orders/${order.id}`)}>
                    <FiEye size={18} />
                    <span style={{ marginLeft: '8px' }}>Просмотр</span>
                  </ActionButton>
                  <ActionButton className="review">
                    <FiStar size={18} />
                    <span style={{ marginLeft: '8px' }}>Отзыв</span>
                  </ActionButton>
                </OrderActions>
              </OrderCard>
            ))
          )}
        </OrdersContent>
      </OrdersContainer>
    </OrdersWrapper>
  );
}
