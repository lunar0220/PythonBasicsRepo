import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import CategoryFilter from '../components/products/CategoryFilter';

const ProductsWrapper = styled.div`
  min-height: calc(100vh - 200px);
  padding: 120px 0 80px;
`;

const ProductsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 10px;
`;

const ViewButton = styled.button`
  padding: 10px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }
  
  &:hover:not(.active) {
    border-color: #cbd5e1;
    color: #334155;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

const ProductListItem = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  
  .product-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
  }
  
  .product-details {
    flex: 1;
  }
  
  .product-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #1e293b;
  }
  
  .product-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 15px;
  }
  
  .product-description {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .product-actions {
    display: flex;
    gap: 10px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    .product-image {
      width: 100%;
      height: 250px;
    }
    
    .product-details {
      order: 2;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  color: #cbd5e1;
`;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'clothing', name: 'Одежда' },
    { id: 'accessories', name: 'Аксессуары' },
    { id: 'home', name: 'Дом' },
    { id: 'sports', name: 'Спорт' }
  ];

  const products = [
    {
      id: 1,
      name: 'Смартфон Galaxy S24',
      category: 'electronics',
      price: 79990,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 128,
      description: 'Флагманский смартфон с передовыми технологиями и отличной камерой'
    },
    {
      id: 2,
      name: 'Наушники Sony WH-1000XM5',
      category: 'electronics',
      price: 29990,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviews: 256,
      description: 'Активная шумоизоляция и превосходное качество звука'
    },
    {
      id: 3,
      name: 'Умные часы Apple Watch Ultra',
      category: 'electronics',
      price: 64990,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6a3d51?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviews: 89,
      description: 'Профессиональные умные часы для экстремальных видов спорта'
    },
    {
      id: 4,
      name: 'Фотоаппарат Canon EOS R5',
      category: 'electronics',
      price: 189990,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviews: 145,
      description: 'Профессиональный беззеркальный фотоаппарат'
    },
    {
      id: 5,
      name: 'Кроссовки Nike Air Zoom',
      category: 'sports',
      price: 12990,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      reviews: 342,
      description: 'Легкие и комфортные кроссовки для бега'
    },
    {
      id: 6,
      name: 'Спортивный костюм Adidas',
      category: 'clothing',
      price: 7990,
      image: 'https://images.unsplash.com/photo-1605348532760-6753d5c8eae0?auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      reviews: 189,
      description: 'Комфортный спортивный костюм для тренировок'
    },
    {
      id: 7,
      name: 'Сумка через плечо',
      category: 'accessories',
      price: 4990,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviews: 98,
      description: 'Модная и практичная сумка из натуральной кожи'
    },
    {
      id: 8,
      name: 'Лампа для дома',
      category: 'home',
      price: 3490,
      image: 'https://images.unsplash.com/photo-1507473888900-52e1adad5420?auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      reviews: 67,
      description: 'Современная лампа для создания уюта'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <ProductsWrapper>
      <ProductsContainer>
        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchParams({ query: e.target.value });
            }}
          />
          <FiSearch size={20} />
          <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />
          <CategoryFilter
            categories={categories}
            activeCategory={category}
            onSelectCategory={(cat) => {
              setCategory(cat);
              setSearchParams({ category: cat });
            }}
          />
          <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />
          <ViewToggle>
            <ViewButton 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid size={20} />
            </ViewButton>
            <ViewButton 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <FiList size={20} />
            </ViewButton>
          </ViewToggle>
        </FilterBar>

        {filteredProducts.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <FiSearch size={64} />
            </EmptyIcon>
            <h3>Товары не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </EmptyState>
        ) : viewMode === 'grid' ? (
          <ProductsGrid>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsGrid>
        ) : (
          <ProductsList>
            {filteredProducts.map(product => (
              <ProductListItem key={product.id}>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">{formatPrice(product.price)}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions">
                    <button className="btn btn-primary" style={{ padding: '10px 20px' }}>
                      В корзину
                    </button>
                    <button className="btn btn-outline" style={{ padding: '10px 20px' }}>
                      Подробнее
                    </button>
                  </div>
                </div>
              </ProductListItem>
            ))}
          </ProductsList>
        )}
      </ProductsContainer>
    </ProductsWrapper>
  );
}
