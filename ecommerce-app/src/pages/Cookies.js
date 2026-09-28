import React from 'react';
import styled from 'styled-components';

const CookiesWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const CookiesContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CookiesHeader = styled.div`
  margin-bottom: 60px;
`;

const CookiesTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
`;

const CookiesContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  line-height: 1.8;
  color: #475569;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 30px 0 15px;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 15px;
  
  li {
    margin-bottom: 8px;
  }
`;

export default function Cookies() {
  return (
    <CookiesWrapper>
      <CookiesContainer>
        <CookiesHeader>
          <CookiesTitle>Политика использования Cookies</CookiesTitle>
        </CookiesHeader>

        <CookiesContent>
          <p style={{ marginBottom: '30px' }}>
            Настоящая Политика использования Cookies объясняет, как мы используем файлы 
            cookies и другие технологии отслеживания при посещении сайта ReactShop.
          </p>

          <SectionTitle>1. Что такое Cookies?</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Cookies - это небольшие текстовые файлы, которые размещаются на вашем устройстве 
            при посещении веб-сайтов. Они помогают сайтам запоминать вашу активность и 
            предпочтения.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Мы используем как сессионные (временные), так и постоянные cookies.
          </p>

          <SectionTitle>2. Какие cookies мы используем?</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Мы используем следующие категории cookies:
          </p>

          <SectionTitle>2.1. Необходимые cookies</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Эти cookies необходимы для работы сайта и включают:
          </p>
          <List>
            <li>Куки сессии для поддержания входа в систему</li>
            <li>Куки корзины для сохранения выбранных товаров</li>
            <li>Куки безопасности для защиты от мошенничества</li>
          </List>

          <SectionTitle>2.2. Аналитические cookies</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Мы используем аналитические cookies для улучшения качества сайта:
          </p>
          <List>
            <li>Google Analytics - для анализа трафика и поведения пользователей</li>
            <li>Яндекс.Метрика - для сбора статистики</li>
            <li>Персонализация контента на основе интересов</li>
          </List>

          <SectionTitle>2.3. Рекламные cookies</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Мы используем рекламные cookies для показа релевантной рекламы:
          </p>
          <List>
            <li>Персонализация рекламных предложений</li>
            <li>Измерение эффективности рекламных кампаний</li>
            <li>Исключение повторного показа рекламы</li>
          </List>

          <SectionTitle>3. Как управлять cookies?</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Вы можете управлять cookies через настройки вашего браузера:
          </p>
          <List>
            <li>Просмотреть все cookies на устройстве</li>
            <li>Удалить cookies (как сессионные, так и постоянные)</li>
            <li>Запретить использование cookies</li>
            <li>Настроить уведомления при получении cookies</li>
          </List>
          <p style={{ marginBottom: '15px' }}>
            Обратите внимание, что отключение cookies может повлиять на функциональность сайта.
          </p>

          <SectionTitle>4. Сторонние сервисы</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Мы используем сервисы третьих сторон, которые могут устанавливать свои cookies:
          </p>
          <List>
            <li>Google Analytics - <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Политика cookies</a></li>
            <li>Яндекс.Метрика - <a href="https://yandex.ru/legal/cookies/" target="_blank" rel="noopener noreferrer">Политика cookies</a></li>
            <li>Социальные сети - для интеграции кнопок "Поделиться"</li>
          </List>

          <SectionTitle>5. Изменения в политике</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Мы можем обновлять эту политику по мере необходимости. Последнее обновление: 
            январь 2026 года.
          </p>

          <SectionTitle>6. Контакты</SectionTitle>
          <p style={{ marginBottom: '0' }}>
            Если у вас есть вопросы по использованию cookies, свяжитесь с нами по email: 
            cookies@reactshop.ru
          </p>
        </CookiesContent>
      </CookiesContainer>
    </CookiesWrapper>
  );
}
