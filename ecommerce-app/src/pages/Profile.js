import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiCheck, FiCamera } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Input } from '../components/common/Input';

const ProfileWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const ProfileContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ProfileHeader = styled.div`
  margin-bottom: 40px;
`;

const ProfileTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
`;

const ProfileSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .camera-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    padding: 8px;
    color: white;
  }
`;

const UserProfileInfo = styled.div`
  text-align: center;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 5px;
`;

const UserEmail = styled.p`
  color: #64748b;
  font-size: 0.875rem;
`;

const ProfileForm = styled.form`
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

const FormSection = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 2px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1e293b;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const SaveButton = styled.button`
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

export default function Profile() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    zipCode: ''
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
      // Mock profile update
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addToast('Профиль обновлен успешно', 'success');
      setLoading(false);
    } catch (error) {
      addToast('Ошибка при обновлении профиля', 'error');
      setLoading(false);
    }
  };

  return (
    <ProfileWrapper>
      <ProfileContainer>
        <ProfileHeader>
          <ProfileTitle>Мой профиль</ProfileTitle>
        </ProfileHeader>

        <ProfileContent>
          <ProfileSidebar>
            <ProfileAvatar>
              <span>{user?.name?.charAt(0) || 'A'}</span>
              <div className="camera-icon">
                <FiCamera size={16} />
              </div>
            </ProfileAvatar>
            <UserProfileInfo>
              <UserName>{user?.name}</UserName>
              <UserEmail>{user?.email}</UserEmail>
            </UserProfileInfo>
          </ProfileSidebar>

          <ProfileForm onSubmit={handleSubmit}>
            <FormTitle>Личная информация</FormTitle>
            
            <FormSection>
              <SectionTitle>Контактные данные</SectionTitle>
              <FormRow>
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
              </FormRow>
              <Input
                label="Телефон"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormSection>

            <FormSection>
              <SectionTitle>Адрес доставки</SectionTitle>
              <Input
                label="Адрес"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Город, улица, дом, квартира"
              />
              <FormRow>
                <Input
                  label="Город"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <Input
                  label="Индекс"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </FormRow>
            </FormSection>

            <FormSection>
              <SectionTitle>Безопасность</SectionTitle>
              <Input
                label="Текущий пароль"
                name="currentPassword"
                type="password"
                placeholder="••••••••"
              />
              <Input
                label="Новый пароль"
                name="newPassword"
                type="password"
                placeholder="••••••••"
              />
              <Input
                label="Подтверждение пароля"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
              />
            </FormSection>

            <div style={{ textAlign: 'right' }}>
              <SaveButton type="submit" disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить изменения'}
              </SaveButton>
            </div>
          </ProfileForm>
        </ProfileContent>
      </ProfileContainer>
    </ProfileWrapper>
  );
}
