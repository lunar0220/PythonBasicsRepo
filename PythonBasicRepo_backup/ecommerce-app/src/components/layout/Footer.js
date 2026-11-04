import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 80px 0 30px;
  margin-top: 80px;
`;

const FooterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.25rem;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  ul {
    list-style: none;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: #94a3b8;
  margin-bottom: 10px;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const FooterText = styled.p`
  color: #94a3b8;
  margin-bottom: 10px;
  font-size: 0.875rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    transition: all 0.3s ease;
    
    &:hover {
      background: #667eea;
      transform: translateY(-3px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
  text-align: center;
  
  p {
    color: #94a3b8;
    font-size: 0.875rem;
  }
  
  .footer-links {
    margin-top: 15px;
    
    a {
      color: #94a3b8;
      margin: 0 10px;
      transition: color 0.3s ease;
      
      &:hover {
        color: white;
      }
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  
  input {
    flex: 1;
    padding: 10px 15px;
    border-radius: 8px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    
    &::placeholder {
      color: #94a3b8;
    }
  }
  
  button {
    padding: 10px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
    
    &:hover {
      background: #764ba2;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterGrid>
          <FooterSection>
            <h3>ReactShop</h3>
            <FooterText>
              Современный интернет-магазин с лучшими товарами и услугами. 
              Покупайте с удовольствием!
            </FooterText>
            <SocialLinks>
              <a href="#"><FiFacebook /></a>
              <a href="#"><FiTwitter /></a>
              <a href="#"><FiInstagram /></a>
              <a href="#"><FiYoutube /></a>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Каталог</h3>
            <FooterLink to="/products">Все товары</FooterLink>
            <FooterLink to="/products?category=electronics">Электроника</FooterLink>
            <FooterLink to="/products?category=clothing">Одежда</FooterLink>
            <FooterLink to="/products?category=accessories">Аксессуары</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Компания</h3>
            <FooterLink to="/about">О нас</FooterLink>
            <FooterLink to="/contact">Контакты</FooterLink>
            <FooterLink to="/faq">Частые вопросы</FooterLink>
            <FooterLink to="/terms">Условия использования</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Контакты</h3>
            <FooterText>
              <FiPhone /> +7 (800) 123-45-67
            </FooterText>
            <FooterText>
              <FiMail /> info@reactshop.ru
            </FooterText>
            <FooterText>
              <FiMapPin /> Москва, ул. Примерная, 123
            </FooterText>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>© 2026 ReactShop. Все права защищены.</p>
          <div className="footer-links">
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/terms">Условия использования</Link>
            <Link to="/cookies">Политика cookies</Link>
          </div>
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
}
