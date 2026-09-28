import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { FiArrowRight, FiShoppingBag, FiShield, FiHeadphones, FiStar } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';

const HeroSection = styled.section`
  min-height: 70vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const HeroImage = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 30px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FeaturesSection = styled.section`
  padding: 100px 0;
  background: white;
`;

const FeaturesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FeatureCard = styled(motion.div)`
  text-align: center;
  padding: 40px 30px;
  border-radius: 20px;
  background: #f8fafc;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    background: white;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  color: white;
  font-size: 2.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #1e293b;
`;

const FeatureText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const ProductsSection = styled.section`
  padding: 100px 0;
  background: #f8fafc;
`;

const ProductsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  
  span {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ViewAllLink = styled(Link)`
  padding: 12px 24px;
  background: white;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const featuredProducts = [
    {
      id: 1,
      name: 'Смартфон Galaxy S24',
      category: 'Электроника',
      price: 79990,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 128
    },
    {
      id: 2,
      name: 'Наушники Sony WH-1000XM5',
      category: 'Аудио',
      price: 29990,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviews: 256
    },
    {
      id: 3,
      name: 'Умные часы Apple Watch Ultra',
      category: 'Гаджеты',
      price: 64990,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6a3d51?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviews: 89
    },
    {
      id: 4,
      name: 'Фотоаппарат Canon EOS R5',
      category: 'Фото',
      price: 189990,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviews: 145
    }
  ];

  return (
    <>
      <HeroSection>
        <HeroContainer>
          <HeroContent style={{ y: y1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '20px', fontSize: '1.125rem' }}>
                Новый сезон скидок
              </h4>
              <HeroTitle>
                Купите лучшие <br />
                <span style={{ color: '#ffd700' }}>товары</span> по <br />
                лучшим ценам
              </HeroTitle>
              <HeroSubtitle>
                Откройте для себя мир современных технологий и стильных решений. 
                Более 10000 товаров от проверенных брендов.
              </HeroSubtitle>
              <HeroButtons>
                <Link 
                  to="/products" 
                  className="btn btn-primary"
                  style={{ padding: '16px 32px', fontSize: '1.125rem' }}
                >
                  Купить сейчас
                </Link>
                <Link 
                  to="/about" 
                  className="btn btn-outline"
                  style={{ 
                    padding: '16px 32px', 
                    fontSize: '1.125rem',
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white'
                  }}
                >
                  Узнать больше
                </Link>
              </HeroButtons>
            </motion.div>
          </HeroContent>
          
          <motion.div style={{ y: y2 }}>
            <HeroImage>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                alt="Магазин"
              />
            </HeroImage>
          </motion.div>
        </HeroContainer>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <FeaturesGrid>
            <FeatureCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FeatureIcon>
                <FiShoppingBag size={40} />
              </FeatureIcon>
              <FeatureTitle>Быстрая доставка</FeatureTitle>
              <FeatureText>
                Доставим ваш заказ в течение 24 часов по всей России
              </FeatureText>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FeatureIcon>
                <FiShield size={40} />
              </FeatureIcon>
              <FeatureTitle>Гарантия качества</FeatureTitle>
              <FeatureText>
                Все товары проходят контроль и имеют гарантию 1 год
              </FeatureText>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FeatureIcon>
                <FiHeadphones size={40} />
              </FeatureIcon>
              <FeatureTitle>Круглосуточная поддержка</FeatureTitle>
              <FeatureText>
                Наши специалисты готовы помочь в любое время
              </FeatureText>
            </FeatureCard>

            <FeatureCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FeatureIcon>
                <FiHeadphones size={40} />
              </FeatureIcon>
              <FeatureTitle>Возврат 30 дней</FeatureTitle>
              <FeatureText>
                Можете вернуть товар в течение 30 дней без вопросов
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <ProductsSection>
        <ProductsContainer>
          <SectionHeader>
            <SectionTitle>Популярные <span>товары</span></SectionTitle>
            <ViewAllLink to="/products">
              Смотреть все
              <FiArrowRight style={{ marginLeft: '8px' }} />
            </ViewAllLink>
          </SectionHeader>
          <ProductsGrid>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsGrid>
        </ProductsContainer>
      </ProductsSection>

      <section style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}
            >
              Почему выбирают нас
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ color: '#64748b', fontSize: '1.125rem', lineHeight: '1.8' }}
            >
              Мы создаем лучший опыт покупок для наших клиентов. Сотни тысяч довольных покупателей 
              выбирают нас каждый день. Наша миссия — сделать покупки проще, быстрее и приятнее.
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
}
