import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiHeart } from 'react-icons/fi';

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  color: #475569;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
  
  &.active {
    color: #667eea;
    font-weight: 600;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
  color: #475569;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const MobileMenuButton = styled.button`
  display: none;
  font-size: 1.5rem;
  color: #475569;
  background: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 999;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 15px 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
  
  &.active {
    color: #667eea;
  }
`;

const MobileNavIcons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
`;

const MobileAuthButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <HeaderWrapper
        animate={{
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.15)' : '0 2px 20px rgba(0, 0, 0, 0.1)',
          background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
          backdropFilter: scrolled ? 'blur(10px)' : 'none'
        }}
      >
        <HeaderContainer>
          <Logo to="/">ReactShop</Logo>

          <Nav>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/products">Товары</NavLink>
            <NavLink to="/contact">Контакты</NavLink>
          </Nav>

          <NavIcons>
            <IconWrapper onClick={() => navigate('/products')}>
              <FiSearch size={24} />
            </IconWrapper>
            <IconWrapper onClick={() => navigate('/favorites')}>
              <FiHeart size={24} />
            </IconWrapper>
            <IconWrapper as={Link} to="/cart">
              <FiShoppingCart size={24} />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </IconWrapper>
            <IconWrapper>
              <FiUser size={24} />
              {user ? (
                <div style={{ position: 'relative' }}>
                  <span>{user.name}</span>
                  <button
                    onClick={handleLogout}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <Link to="/login" style={{ fontSize: '0.875rem' }}>Войти</Link>
              )}
            </IconWrapper>
          </NavIcons>

          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
            <FiMenu />
          </MobileMenuButton>
        </HeaderContainer>
      </HeaderWrapper>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                <FiX />
              </button>
            </div>
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Главная
            </MobileNavLink>
            <MobileNavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>
              Товары
            </MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Контакты
            </MobileNavLink>
            <MobileNavLink to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
              Корзина
            </MobileNavLink>
            {user ? (
              <>
                <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  Личный кабинет
                </MobileNavLink>
                <MobileNavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  Профиль
                </MobileNavLink>
                <MobileNavLink to="/orders" onClick={() => setIsMobileMenuOpen(false)}>
                  Заказы
                </MobileNavLink>
                <MobileNavLink to="/favorites" onClick={() => setIsMobileMenuOpen(false)}>
                  Избранное
                </MobileNavLink>
                <MobileAuthButton onClick={handleLogout}>
                  Выйти
                </MobileAuthButton>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Войти
                </MobileNavLink>
                <MobileNavLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  Регистрация
                </MobileNavLink>
              </>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
