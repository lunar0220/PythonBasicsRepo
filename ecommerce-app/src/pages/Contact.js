import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import { useToast } from '../contexts/ToastContext';
import { Input, TextArea } from '../components/common/Input';

const ContactWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const ContactContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const ContactTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
`;

const ContactSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactInfoCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 20px;
`;

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const InfoText = styled.div`
  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 5px;
  }
  
  p {
    color: #64748b;
    font-size: 0.875rem;
  }
`;

const ContactForm = styled.form`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #1e293b;
`;

const FormActions = styled.div`
  margin-top: 30px;
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 40px;
  background: #dcfce7;
  border-radius: 12px;
  margin-bottom: 30px;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 2.5rem;
`;

export default function Contact() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
      // Mock contact form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      addToast('Сообщение отправлено!', 'success');
      
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setLoading(false);
      }, 3000);
    } catch (error) {
      addToast('Ошибка при отправке', 'error');
      setLoading(false);
    }
  };

  return (
    <ContactWrapper>
      <ContactContainer>
        <ContactHeader>
          <ContactTitle>Свяжитесь с нами</ContactTitle>
          <ContactSubtitle>
            Мы всегда рады помочь вам! Свяжитесь с нами через форму или по указанным контактам
          </ContactSubtitle>
        </ContactHeader>

        <ContactContent>
          <ContactInfo>
            <ContactInfoCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <InfoIcon>
                <FiMail size={28} />
              </InfoIcon>
              <InfoText>
                <h4>Email</h4>
                <p>info@reactshop.ru</p>
                <p>support@reactshop.ru</p>
              </InfoText>
            </ContactInfoCard>

            <ContactInfoCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <InfoIcon>
                <FiPhone size={28} />
              </InfoIcon>
              <InfoText>
                <h4>Телефон</h4>
                <p>+7 (800) 123-45-67</p>
                <p>+7 (999) 000-00-00</p>
              </InfoText>
            </ContactInfoCard>

            <ContactInfoCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <InfoIcon>
                <FiMapPin size={28} />
              </InfoIcon>
              <InfoText>
                <h4>Адрес</h4>
                <p>Москва, ул. Примерная, 123</p>
                <p>Торговый центр "Радуга"</p>
              </InfoText>
            </ContactInfoCard>

            <ContactInfoCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <InfoIcon>
                <FiClock size={28} />
              </InfoIcon>
              <InfoText>
                <h4>Часы работы</h4>
                <p>Пн-Пт: 9:00-21:00</p>
                <p>Сб-Вс: 10:00-20:00</p>
              </InfoText>
            </ContactInfoCard>
          </ContactInfo>

          <ContactForm onSubmit={handleSubmit}>
            {success ? (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <SuccessIcon>
                  <FiCheckCircle size={40} />
                </SuccessIcon>
                <h3>Сообщение отправлено!</h3>
                <p style={{ color: '#166534', marginTop: '10px' }}>
                  Мы свяжемся с вами в ближайшее время
                </p>
              </SuccessMessage>
            ) : (
              <>
                <FormTitle>Отправить сообщение</FormTitle>
                <Input
                  label="Имя"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Тема"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <TextArea
                  label="Сообщение"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
                <FormActions>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    {loading ? 'Отправка...' : (
                      <>
                        <FiSend size={20} />
                        <span style={{ marginLeft: '8px' }}>Отправить</span>
                      </>
                    )}
                  </button>
                </FormActions>
              </>
            )}
          </ContactForm>
        </ContactContent>
      </ContactContainer>
    </ContactWrapper>
  );
}
