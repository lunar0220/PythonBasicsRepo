import React from 'react';
import styled from 'styled-components';

const PrivacyWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const PrivacyContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PrivacyHeader = styled.div`
  margin-bottom: 60px;
`;

const PrivacyTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
`;

const PrivacyContent = styled.div`
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

export default function Privacy() {
  return (
    <PrivacyWrapper>
      <PrivacyContainer>
        <PrivacyHeader>
          <PrivacyTitle>Политика конфиденциальности</PrivacyTitle>
        </PrivacyHeader>

        <PrivacyContent>
          <p style={{ marginBottom: '30px' }}>
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты 
            персональных данных, полученных в ходе использования сайта ReactShop.
          </p>

          <SectionTitle>1. Общие положения</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Администрация ReactShop (далее - Администрация) обязуется сохранять конфиденциальность 
            персональных данных, предоставленных пользователями сайта.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Настоящая политика распространяется на всю информацию, которую сайт может получить 
            от пользователя во время использования сайта.
          </p>

          <SectionTitle>2. Что такое персональные данные?</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Персональные данные - это любая информация, относящаяся к прямо или косвенно 
            определенному или определяемому физическому лицу (субъекту персональных данных).
          </p>
          <p style={{ marginBottom: '15px' }}>
            Мы собираем следующие персональные данные:
          </p>
          <List>
            <li>ФИО</li>
            <li>Адрес электронной почты</li>
            <li>Номер телефона</li>
            <li>Адрес доставки</li>
            <li>Информация о заказах</li>
            <li>IP-адрес и информация о браузере</li>
          </List>

          <SectionTitle>3. Цели обработки данных</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Мы обрабатываем персональные данные для следующих целей:
          </p>
          <List>
            <li>Оформление и доставка заказов</li>
            <li>Обработка платежей</li>
            <li>Предоставление клиентской поддержки</li>
            <li>Улучшение качества услуг</li>
            <li>Отправка информационных рассылок</li>
            <li>Соблюдение требований законодательства</li>
          </List>

          <SectionTitle>4. Способы обработки данных</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Персональные данные обрабатываются следующими способами:
          </p>
          <List>
            <li>Автоматизированная обработка (с использованием компьютеров и серверов)</li>
            <li>Неавтоматизированная обработка (в бумажном виде)</li>
            <li>Смешанная обработка (часть информации в электронном виде, часть в бумажном)</li>
          </List>

          <SectionTitle>5. Хранение данных</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Персональные данные хранятся не более чем требуется для достижения целей их 
            обработки, если иное не предусмотрено законодательством.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Мы принимаем все необходимые меры для защиты персональных данных от несанкционированного 
            доступа, раскрытия, изменения или уничтожения.
          </p>

          <SectionTitle>6. Передача данных третьим лицам</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Мы не передаем персональные данные третьим лицам без согласия пользователя, за 
            исключением случаев, предусмотренных законодательством.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Персональные данные могут быть переданы следующим категориям третьих лиц:
          </p>
          <List>
            <li>Транспортные компании для доставки заказов</li>
            <li>Банки и платежные системы для обработки платежей</li>
            <li>Операторы связи для отправки SMS-уведомлений</li>
            <li>Сервисы поддержки для оказания клиентской помощи</li>
          </List>

          <SectionTitle>7. Права субъектов персональных данных</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Вы имеете право:
          </p>
          <List>
            <li>Получить доступ к своим персональным данным</li>
            <li>Требовать исправления неточных данных</li>
            <li>Требовать удаления персональных данных</li>
            <li>Ограничить обработку персональных данных</li>
            <li>Получить персональные данные в структурированном, общепринятом формате</li>
            <li>Отозвать согласие на обработку персональных данных</li>
          </List>

          <SectionTitle>8. Защита данных</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Мы используем следующие меры для защиты персональных данных:
          </p>
          <List>
            <li>Шифрование данных с помощью SSL/TLS</li>
            <li>Регулярное обновление программного ��беспечения</li>
            <li>Контроль доступа к серверам</li>
            <li>Резервное копирование данных</li>
            <li>Аудит безопасности</li>
          </List>

          <SectionTitle>9. Cookies</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Мы используем файлы cookies для улучшения качества сервиса:
          </p>
          <List>
            <li>Технические cookies для работы сайта</li>
            <li>Аналитические cookies для улучшения услуг</li>
            <li>Рекламные cookies для персонализации предложений</li>
          </List>
          <p style={{ marginBottom: '15px' }}>
            Вы можете отключить cookies в настройках вашего браузера, но это может повлиять 
            на функциональность сайта.
          </p>

          <SectionTitle>10. Изменения в политике</SectionTitle>
          <p style={{ marginBottom: '15px' }}>
            Администрация оставляет за собой право изменять настоящую политику в любое время. 
            Новая версия публикуется на сайте и вступает в силу через 7 дней после публикации.
          </p>

          <SectionTitle>11. Контакты</SectionTitle>
          <p style={{ marginBottom: '0' }}>
            Если у вас возникли вопросы по поводу обработки персональных данных, вы можете 
            связаться с нами по электронной почте: privacy@reactshop.ru
          </p>
        </PrivacyContent>
      </PrivacyContainer>
    </PrivacyWrapper>
  );
}
