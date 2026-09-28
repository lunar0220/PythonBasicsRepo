import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/common/Button';
import { Input, Select } from '../../components/common/Input';

const AuthWrapper = styled(motion.div)`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: 50px;
`;

const AuthTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  color: #1e293b;
  
  span {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const AuthSubtitle = styled.p`
  text-align: center;
  color: #64748b;
  margin-bottom: 40px;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TermsLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  color: #64748b;
  font-size: 0.875rem;
  margin: 10px 0;
`;

const TermsText = styled.div`
  flex: 1;
  
  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 30px;
  transition: gap 0.3s ease;
  
  &:hover {
    gap: 12px;
  }
`;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      addToast('Примите условия соглашения', 'warning');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      addToast('Пароли не совпадают', 'error');
      return;
    }

    setLoading(true);

    try {
      // Mock registration
      const mockUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'customer'
      };
      
      register(mockUser);
      addToast('Регистрация успешна!', 'success');
      navigate('/login');
    } catch (error) {
      addToast('Ошибка при регистрации', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AuthContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackLink to="/">
          <FiArrowLeft />
          Назад
        </BackLink>

        <AuthTitle>Регистрация</AuthTitle>
        <AuthSubtitle>Создайте аккаунт для покупок</AuthSubtitle>

        <Form onSubmit={handleSubmit}>
          <Input
            label="Имя"
            name="name"
            type="text"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Телефон"
            name="phone"
            type="tel"
            placeholder="+7 (999) 000-00-00"
            value={formData.phone}
            onChange={handleChange}
          />

          <div>
            <Input
              label="Пароль"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div style={{ textAlign: 'right', marginTop: '-10px' }}>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                {showPassword ? 'Скрыть' : 'Показать'}
              </button>
            </div>
          </div>

          <Input
            label="Подтверждение пароля"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <FormActions>
            <TermsLabel>
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={handleCheckboxChange}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  marginTop: '2px'
                }}
              />
              <TermsText>
                Я согласен с <a href="#">условиями соглашения</a> и политикой конфиденциальности
              </TermsText>
            </TermsLabel>

            <Button
              type="submit"
              variant="primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Уже есть аккаунт?{' '}
                <Link to="/login" style={{ color: '#667eea', fontWeight: '500' }}>
                  Войти
                </Link>
              </span>
            </div>
          </FormActions>
        </Form>
      </AuthContainer>
    </AuthWrapper>
  );
}
