import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const FAQContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const FAQTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
`;

const FAQSubtitle = styled.p`
  font-size: 1.25rem;
  color: #64748b;
`;

const FAQContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FAQItem = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 25px 30px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8fafc;
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 30px 25px;
  color: #64748b;
  line-height: 1.8;
  border-top: 1px solid #e2e8f0;
  margin-top: 10px;
`;

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const faqs = [
    {
      question: 'Как сделать заказ?',
      answer: 'Для оформления заказа выберите интересующий вас товар, добавьте его в корзину и перейдите к оформлению. Укажите контактные данные, адрес доставки и выберите способ оплаты. После подтверждения заказа вы получите письмо с подтверждением.'
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем оплату банковскими картами (Visa, MasterCard, Мир), наличными при доставке, а также онлайн-оплату через платежные системы. Все транзакции проходят через защищенные каналы.'
    },
    {
      question: 'Какова стоимость доставки?',
      answer: 'Доставка по Москве бесплатная при заказе от 3000 рублей. По России доставка осуществляется через транспортные компании. Стоимость доставки рассчитывается индивидуально в зависимости от региона и веса заказа.'
    },
    {
      question: 'Можно ли вернуть товар?',
      answer: 'Да, вы можете вернуть товар в течение 30 дней с момента покупки, если он не был в употреблении и сохранил товарный вид. Возврат осуществляется в соответствии с законом о защите прав потребителей.'
    },
    {
      question: 'Действует ли гарантия на товары?',
      answer: 'Да, все товары имеют гарантию производителя. Срок гарантии указан в описании каждого товара. В случае обнаружения производственного брака мы бесплатно отремонтируем или заменим товар.'
    },
    {
      question: 'Как связаться с поддержкой?',
      answer: 'Вы можете связаться с нами по телефону +7 (800) 123-45-67, отправить email на info@reactshop.ru или воспользоваться формой обратной связи на сайте. Наша поддержка работает с 9:00 до 21:00 ежедневно.'
    }
  ];

  return (
    <FAQWrapper>
      <FAQContainer>
        <FAQHeader>
          <FAQTitle>Частые вопросы</FAQTitle>
          <FAQSubtitle>
            Ответы на самые часто задаваемые вопросы о покупках в нашем магазине
          </FAQSubtitle>
        </FAQHeader>

        <FAQContent>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FAQQuestion onClick={() => setOpenItem(openItem === index ? null : index)}>
                {faq.question}
                {openItem === index ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
              </FAQQuestion>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: openItem === index ? 'auto' : 0, 
                  opacity: openItem === index ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <FAQAnswer>{faq.answer}</FAQAnswer>
              </motion.div>
            </FAQItem>
          ))}
        </FAQContent>
      </FAQContainer>
    </FAQWrapper>
  );
}
