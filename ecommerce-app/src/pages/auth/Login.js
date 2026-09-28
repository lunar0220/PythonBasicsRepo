import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/common/Button';
import { Input } from '../../components/common/Input';

const AuthWrapper = styled(motion.div)`
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const AuthContainer = styled(motion.div)`
  width: 100%;
  max-width: 450px;
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

const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ForgotPassword = styled(Link)`
  text-align: right;
  font-size: 0.875rem;
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #764ba2;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 30px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }
  
  span {
    color: #64748b;
    font-size: 0.875rem;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
  
  svg {
    width: 20px;
    height: 20px;
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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

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
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser) {
      login(savedUser);
      addToast(`Добро пожаловать, ${savedUser.name}!`, 'success');
      navigate('/');
    } else {
      addToast('Пользователь не найден', 'error');
    }
  } catch (error) {
    addToast('Ошибка при входе. Проверьте данные.', 'error');
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

        <AuthTitle>Войти</AuthTitle>
        <AuthSubtitle>Введите свои данные для входа в аккаунт</AuthSubtitle>

        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

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

          <FormActions>
            <Button
              type="submit"
              variant="primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </Button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Нет аккаунта?{' '}
                <Link to="/register" style={{ color: '#667eea', fontWeight: '500' }}>
                  Зарегистрироваться
                </Link>
              </span>
            </div>
          </FormActions>
        </Form>

        <Divider>
          <span>или продолжите с</span>
        </Divider>

        <SocialButton>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Войти с Google</span>
        </SocialButton>
      </AuthContainer>
    </AuthWrapper>
  );
}
