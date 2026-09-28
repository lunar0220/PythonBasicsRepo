import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiCheck, FiArrowLeft, FiCreditCard, FiShield } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Input } from '../components/common/Input';

const CheckoutWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const CheckoutContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CheckoutTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #1e293b;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1e293b;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
`;

const FormSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-weight: 500;
  padding: 12px 24px;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8fafc;
    color: #334155;
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  align-self: flex-start;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OrderItemInfo = styled.div`
  flex: 1;
`;

const OrderItemName = styled.div`
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 5px;
`;

const OrderItemQuantity = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const OrderItemPrice = styled.div`
  font-weight: 600;
  color: #667eea;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 2px solid #e2e8f0;
  margin-top: 20px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
`;

const PaymentMethod = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const PaymentOption = styled.div`
  flex: 1;
  padding: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &.selected {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
  
  &:hover:not(.selected) {
    border-color: #cbd5e1;
    background: #f8fafc;
  }
`;

const PaymentIcon = styled.div`
  margin-bottom: 10px;
  font-size: 2rem;
`;

const PaymentName = styled.div`
  font-weight: 500;
  color: #1e293b;
`;

const CheckoutSuccess = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 0 auto;
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: white;
  font-size: 3rem;
`;

const OrderNumber = styled.div`
  font-size: 1.25rem;
  color: #64748b;
  margin: 10px 0 30px;
`;

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock checkout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addToast('Заказ оформлен успешно!', 'success');
      clearCart();
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/orders');
      }, 3000);
    } catch (error) {
      addToast('Ошибка при оформлении заказа', 'error');
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  if (success) {
    return (
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutSuccess>
            <SuccessIcon>
              <FiCheck size={60} />
            </SuccessIcon>
            <h2>Заказ оформлен!</h2>
            <p style={{ color: '#64748b', fontSize: '1.125rem', margin: '20px 0' }}>
              Мы отправили подтверждение на ваш email
            </p>
            <OrderNumber>
              Номер заказа: #{Date.now().toString().slice(-8)}
            </OrderNumber>
            <p style={{ color: '#64748b' }}>
              Перенаправление в личный кабинет...
            </p>
          </CheckoutSuccess>
        </CheckoutContainer>
      </CheckoutWrapper>
    );
  }

  return (
    <CheckoutWrapper>
      <CheckoutContainer>
        <CheckoutTitle>Оформление заказа</CheckoutTitle>
        <CheckoutGrid>
          <CheckoutForm onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>Контактная информация</SectionTitle>
              <FormRow>
                <Input
                  label="Имя"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Фамилия"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </FormRow>
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Телефон"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormSection>

            <FormSection>
              <SectionTitle>Адрес доставки</SectionTitle>
              <Input
                label="Адрес"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Город, улица, дом, квартира"
                required
              />
              <FormRow>
                <Input
                  label="Город"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Индекс"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </FormRow>
            </FormSection>

            <FormSection>
              <SectionTitle>Способ оплаты</SectionTitle>
              <PaymentMethod>
                <PaymentOption 
                  className={paymentMethod === 'card' ? 'selected' : ''}
                  onClick={() => setPaymentMethod('card')}
                >
                  <PaymentIcon>
                    <FiCreditCard size={32} />
                  </PaymentIcon>
                  <PaymentName>Карта</PaymentName>
                </PaymentOption>
                <PaymentOption 
                  className={paymentMethod === 'cash' ? 'selected' : ''}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <PaymentIcon>
                    <FiShield size={32} />
                  </PaymentIcon>
                  <PaymentName>Наличные</PaymentName>
                </PaymentOption>
              </PaymentMethod>
            </FormSection>

            <FormActions>
              <BackButton type="button" onClick={() => navigate('/cart')}>
                <FiArrowLeft size={20} />
                Назад в корзину
              </BackButton>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ padding: '16px 40px' }}
              >
                {loading ? 'Обработка...' : `Оплатить ${formatPrice(cartTotal)}`}
              </button>
            </FormActions>
          </CheckoutForm>

          <OrderSummary>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '20px' }}>
              Сводка заказа
            </h3>
            {cart.map((item, index) => (
              <OrderItem key={item.id}>
                <OrderItemImage>
                  <img src={item.image} alt={item.name} />
                </OrderItemImage>
                <OrderItemInfo>
                  <OrderItemName>{item.name}</OrderItemName>
                  <OrderItemQuantity>x{item.quantity}</OrderItemQuantity>
                </OrderItemInfo>
                <OrderItemPrice>{formatPrice(item.price * item.quantity)}</OrderItemPrice>
              </OrderItem>
            ))}
            <SummaryTotal>
              <span>Итого</span>
              <span>{formatPrice(cartTotal)}</span>
            </SummaryTotal>
            <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                <FiShield size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Безопасная оплата
              </div>
            </div>
          </OrderSummary>
        </CheckoutGrid>
      </CheckoutContainer>
    </CheckoutWrapper>
  );
}
