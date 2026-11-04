import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiShoppingCart, FiHeart, FiStar, FiCheck, FiShare2, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const ProductDetailsWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const ProductDetailsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Breadcrumbs = styled.nav`
  margin-bottom: 30px;
  font-size: 0.875rem;
  color: #64748b;
  
  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  span {
    margin: 0 8px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
`;

const ProductImages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainImage = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbnailImages = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  
  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #1e293b;
`;

const ProductCategory = styled.div`
  font-size: 1rem;
  color: #667eea;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  
  .rating-stars {
    color: #fbbf24;
    font-size: 1.25rem;
  }
  
  .rating-text {
    color: #64748b;
    font-size: 0.875rem;
  }
`;

const ProductPrice = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 30px;
`;

const ProductDescription = styled.div`
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 30px;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 15px;
    color: #1e293b;
  }
  
  ul {
    margin-left: 20px;
    margin-bottom: 15px;
  }
  
  li {
    margin-bottom: 8px;
  }
`;

const ProductActions = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 500;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    
    &:hover {
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const FeatureText = styled.div`
  h4 {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #1e293b;
  }
  
  p {
    font-size: 0.875rem;
    color: #64748b;
  }
`;

const RelatedProducts = styled.div`
  margin-top: 80px;
`;

const RelatedTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #1e293b;
`;

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const products = [
      {
        id: 1,
        name: 'Смартфон Galaxy S24',
        category: 'Электроника',
        price: 79990,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviews: 128,
        description: 'Флагманский смартфон с передовыми технологиями и отличной камерой',
        specifications: [
          '6.2 дюйма AMOLED экран',
          'Процессор Snapdragon 8 Gen 3',
          '50 MP основная камера',
          '12 MP ультраширокоугольная',
          '10 MP телеобъектив',
          '4000 мА·ч аккумулятор',
          '5G поддержка',
          'Wireless charging'
        ]
      },
      {
        id: 2,
        name: 'Наушники Sony WH-1000XM5',
        category: 'Аудио',
        price: 29990,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 256,
        description: 'Активная шумоизоляция и превосходное качество звука',
        specifications: [
          'Активная шумоизоляция',
          '30 часов времени работы',
          'Быстрая зарядка',
          'Поддержка LDAC',
          'Касковые наушники',
          'Touch_SENSOR управление',
          'Микрофоны для звонков'
        ]
      },
      {
        id: 3,
        name: 'Умные часы Apple Watch Ultra',
        category: 'Гаджеты',
        price: 64990,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6a3d51?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        reviews: 89,
        description: 'Профессиональные умные часы для экстремальных видов спорта',
        specifications: [
          'Titanium корпус',
          '49 мм экран',
          '24-часовой мониторинг',
          'Глубоководный дайвинг',
          'GPS и компас',
          'Сертификат ISO',
          '50 часов работы'
        ]
      }
    ];

    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    
    setTimeout(() => setLoading(false), 500);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    addToast('Товар добавлен в корзину', 'success');
  };

  const handleBuyNow = () => {
    addToCart(product);
    addToast('Товар добавлен в корзину', 'success');
    navigate('/checkout');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FiStar key={i} className="rating-star" />);
      } else if (i <= rating) {
        stars.push(<FiStar key={i} className="rating-star" style={{ opacity: 0.5 }} />);
      } else {
        stars.push(<FiStar key={i} className="rating-star" style={{ opacity: 0.2 }} />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h3>Товар не найден</h3>
        <p>К сожалению, этот товар отсутствует в каталоге</p>
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '20px' }}
          onClick={() => navigate('/products')}
        >
          Кatalog
        </button>
      </div>
    );
  }

  return (
    <ProductDetailsWrapper>
      <ProductDetailsContainer>
        <Breadcrumbs>
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/products">Товары</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span>{product.name}</span>
        </Breadcrumbs>

        <ProductGrid>
          <ProductImages>
            <MainImage>
              <img src={product.image} alt={product.name} />
            </MainImage>
            <ThumbnailImages>
              <img src={product.image} alt="Thumbnail 1" />
              <img src={product.image} alt="Thumbnail 2" />
              <img src={product.image} alt="Thumbnail 3" />
            </ThumbnailImages>
          </ProductImages>

          <ProductInfo>
            <ProductCategory>{product.category}</ProductCategory>
            <ProductTitle>{product.name}</ProductTitle>
            
            <ProductRating>
              <div className="rating-stars">
                {renderStars(product.rating)}
              </div>
              <span className="rating-text">
                {product.rating} ({product.reviews} отзывов)
              </span>
            </ProductRating>

            <ProductPrice>{formatPrice(product.price)}</ProductPrice>

            <ProductDescription>
              <h3>Описание</h3>
              <p>{product.description}</p>
              
              <h3>Характеристики</h3>
              <ul>
                {product.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </ProductDescription>

            <ProductActions>
              <ActionButton 
                className="primary"
                onClick={handleBuyNow}
              >
                <FiShoppingCart size={24} />
                Купить сейчас
              </ActionButton>
              <ActionButton onClick={handleAddToCart}>
                <FiShoppingCart size={24} />
                В корзину
              </ActionButton>
              <ActionButton>
                <FiHeart size={24} />
                В избранное
              </ActionButton>
              <ActionButton>
                <FiShare2 size={24} />
                Поделиться
              </ActionButton>
            </ProductActions>
          </ProductInfo>
        </ProductGrid>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <FiTruck size={24} />
            </FeatureIcon>
            <FeatureText>
              <h4>Быстрая доставка</h4>
              <p>Доставим через 24 часа</p>
            </FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FiShield size={24} />
            </FeatureIcon>
            <FeatureText>
              <h4>Гарантия 2 года</h4>
              <p>Все товары сертифицированы</p>
            </FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FiHeadphones size={24} />
            </FeatureIcon>
            <FeatureText>
              <h4>Поддержка 24/7</h4>
              <p>Специалисты в любое время</p>
            </FeatureText>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FiCheck size={24} />
            </FeatureIcon>
            <FeatureText>
              <h4>Возврат 30 дней</h4>
              <p>Без вопросов и проблем</p>
            </FeatureText>
          </FeatureCard>
        </FeaturesGrid>

        <RelatedProducts>
          <RelatedTitle>Похожие товары</RelatedTitle>
          <ProductCard product={product} showCategory={false} />
        </RelatedProducts>
      </ProductDetailsContainer>
    </ProductDetailsWrapper>
  );
}
