import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiUsers, FiCheckCircle, FiTrophy, FiLightbulb } from 'react-icons/fi';

const AboutWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const AboutContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const AboutTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
`;

const AboutSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
`;

const AboutImage = styled.div`
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
`;

const SectionText = styled.p`
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const FeaturesSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const FeaturesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #1e293b;
`;

const FeatureText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

export default function About() {
  return (
    <AboutWrapper>
      <AboutContainer>
        <AboutHeader>
          <AboutTitle>О нас</AboutTitle>
          <AboutSubtitle>
            Мы создаем лучший опыт покупок для наших клиентов. 
            Более 10000 довольных покупателей выбирают нас каждый день.
          </AboutSubtitle>
        </AboutHeader>

        <AboutContent>
          <AboutImage>
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" 
              alt="О нас"
            />
          </AboutImage>
          <AboutText>
            <SectionTitle>Почему выбирают нас</SectionTitle>
            <SectionText>
              Мы стремимся сделать процесс покупки максимально удобным, безопасным и приятным. 
              Наша миссия — помочь каждому клиенту найти именно то, что нужно, и сделать это 
              быстро и качественно.
            </SectionText>
            <SectionText>
              Мы работаем только с проверенными поставщиками и предлагаем гарантию качества 
              на все товары. Наша команда профессионалов всегда готова помочь вам с выбором 
              и ответить на любые вопросы.
            </SectionText>
          </AboutText>
        </AboutContent>

        <FeaturesSection>
          <FeaturesContainer>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>
                Наши преимущества
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
                Мы предлагаем лучшие условия для наших клиентов
              </p>
            </div>
            <FeaturesGrid>
              <FeatureCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <FeatureIcon>
                  <FiUsers size={40} />
                </FeatureIcon>
                <FeatureTitle>10000+ Покупателей</FeatureTitle>
                <FeatureText>
                  Ежемесячно тысячи клиентов выбирают нас для покупки лучших товаров
                </FeatureText>
              </FeatureCard>

              <FeatureCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <FeatureIcon>
                  <FiCheckCircle size={40} />
                </FeatureIcon>
                <FeatureTitle>Гарантия качества</FeatureTitle>
                <FeatureText>
                  Все товары проходят контроль и имеют гарантию производителя
                </FeatureText>
              </FeatureCard>

              <FeatureCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FeatureIcon>
                  <FiTrophy size={40} />
                </FeatureIcon>
                <FeatureTitle>Лучшие цены</FeatureTitle>
                <FeatureText>
                  Мы предлагаем конкурентные цены и регулярные акции и скидки
                </FeatureText>
              </FeatureCard>

              <FeatureCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FeatureIcon>
                  <FiLightbulb size={40} />
                </FeatureIcon>
                <FeatureTitle>Инновации</FeatureTitle>
                <FeatureText>
                  Используем передовые технологии для удобства и безопасности
                </FeatureText>
              </FeatureCard>
            </FeaturesGrid>
          </FeaturesContainer>
        </FeaturesSection>
      </AboutContainer>
    </AboutWrapper>
  );
}
