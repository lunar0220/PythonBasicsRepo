import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiHome, FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiActivity, FiDollarSign } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const DashboardWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const DashboardHeader = styled.div`
  margin-bottom: 40px;
`;

const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
`;

const DashboardSubtitle = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  margin-top: 10px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 40px;
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
  height: fit-content;
`;

const SidebarTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1e293b;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: #475569;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 8px;
  
  &.active {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
  }
  
  &:hover:not(.active) {
    background: #f8fafc;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const StatTitle = styled.h4`
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 15px;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const RecentOrders = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 15px;
    font-weight: 600;
    color: #475569;
    border-bottom: 2px solid #e2e8f0;
  }
  
  td {
    padding: 15px;
    border-bottom: 1px solid #e2e8f0;
    color: #64748b;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  .status {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .status-processing {
    background: #fef3c7;
    color: #92400e;
  }
  
  .status-shipped {
    background: #dbeafe;
    color: #1e40af;
  }
  
  .status-delivered {
    background: #dcfce7;
    color: #166534;
  }
`;

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const orders = [
    {
      id: '#ORD-001',
      date: '15 дек 2026',
      total: '129 990 ₽',
      items: 3,
      status: 'delivered'
    },
    {
      id: '#ORD-002',
      date: '10 дек 2026',
      total: '45 990 ₽',
      items: 2,
      status: 'shipped'
    },
    {
      id: '#ORD-003',
      date: '5 дек 2026',
      total: '29 990 ₽',
      items: 1,
      status: 'processing'
    }
  ];

  return (
    <DashboardWrapper>
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Личный кабинет</DashboardTitle>
          <DashboardSubtitle>Добро пожаловать, {user?.name}!</DashboardSubtitle>
        </DashboardHeader>

        <DashboardGrid>
          <Sidebar>
            <SidebarTitle>Меню</SidebarTitle>
            <SidebarLink 
              to="/dashboard" 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              <FiHome />
              Обзор
            </SidebarLink>
            <SidebarLink 
              to="/profile" 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser />
              Профиль
            </SidebarLink>
            <SidebarLink 
              to="/orders" 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              <FiShoppingBag />
              Заказы
            </SidebarLink>
            <SidebarLink 
              to="/favorites" 
              className={activeTab === 'favorites' ? 'active' : ''}
              onClick={() => setActiveTab('favorites')}
            >
              <FiHeart />
              Избранное
            </SidebarLink>
            <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #e2e8f0' }}>
              <SidebarLink to="/settings">
                <FiSettings />
                Настройки
              </SidebarLink>
              <SidebarLink to="/" onClick={() => navigate('/')}>
                <FiLogOut />
                Выйти
              </SidebarLink>
            </div>
          </Sidebar>

          <DashboardContent>
            <StatsGrid>
              <StatCard>
                <StatIcon>
                  <FiActivity />
                </StatIcon>
                <StatTitle>Всего заказов</StatTitle>
                <StatValue>12</StatValue>
              </StatCard>
              <StatCard>
                <StatIcon>
                  <FiDollar />
                </StatIcon>
                <StatTitle>Потрачено</StatTitle>
                <StatValue>350 000 ₽</StatValue>
              </StatCard>
            </StatsGrid>

            <RecentOrders>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '20px' }}>
                Последние заказы
              </h3>
              <OrdersTable>
                <thead>
                  <tr>
                    <th>Заказ</th>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Товаров</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <Link to={`/orders/${order.id}`} style={{ color: '#667eea' }}>
                          {order.id}
                        </Link>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.total}</td>
                      <td>{order.items}</td>
                      <td>
                        <span className={`status status-${order.status}`}>
                          {order.status === 'processing' && 'В обработке'}
                          {order.status === 'shipped' && 'Отправлено'}
                          {order.status === 'delivered' && 'Доставлено'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </OrdersTable>
            </RecentOrders>
          </DashboardContent>
        </DashboardGrid>
      </DashboardContainer>
    </DashboardWrapper>
  );
}
