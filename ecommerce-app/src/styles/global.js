import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Manrope', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Manrope', sans-serif;
    background: #f5f5f5ff;
    color: #232323ff;
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
    outline: none;
  }

  ul {
    list-style: none;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  .btn-secondary {
    background: #f1f5f9;
    color: #334155;
  }

  .btn-secondary:hover {
    background: #e2e8f0;
  }

  .btn-outline {
    border: 2px solid #667eea;
    color: #667eea;
    background: transparent;
  }

  .btn-outline:hover {
    background: #667eea;
    color: white;
  }

  .btn-danger {
    background: #ef4444;
    color: white;
  }

  .btn-danger:hover {
    background: #dc2626;
  }

  .card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: #1e293b;
  }

  .section-title span {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .badge-success {
    background: #dcfce7;
    color: #166534;
  }

  .badge-warning {
    background: #fef3c7;
    color: #92400e;
  }

  .badge-danger {
    background: #fee2e2;
    color: #991b1b;
  }

  .badge-info {
    background: #e0f2fe;
    color: #075985;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
  }

  .product-card {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    transition: all 0.4s ease;
  }

  .product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .product-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
  }

  .product-info {
    padding: 20px;
  }

  .product-title {
    font-size: 1.25rem;
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

  .product-actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 10px;
  }

  .rating-star {
    color: #fbbf24;
    font-size: 1rem;
  }

  .input-group {
    margin-bottom: 20px;
  }

  .input-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #475569;
  }

  .input-group input,
  .input-group select,
  .input-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .input-group input:focus,
  .input-group select:focus,
  .input-group textarea:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .input-group input::placeholder,
  .input-group textarea::placeholder {
    color: #94a3b8;
  }

  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .toast-item {
    min-width: 300px;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideIn 0.3s ease;
  }

  .toast-item.success {
    background: #dcfce7;
    border-left: 4px solid #22c55e;
  }

  .toast-item.error {
    background: #fee2e2;
    border-left: 4px solid #ef4444;
  }

  .toast-item.info {
    background: #e0f2fe;
    border-left: 4px solid #3b82f6;
  }

  .toast-item.warning {
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .empty-state {
    text-align: center;
    padding: 80px 20px;
    color: #64748b;
  }

  .empty-state-icon {
    font-size: 4rem;
    margin-bottom: 20px;
    color: #cbd5e1;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
  }

  .pagination button {
    padding: 10px 20px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .pagination button:hover:not(:disabled) {
    border-color: #667eea;
    color: #667eea;
  }

  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination button.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }

    .section-title {
      font-size: 2rem;
    }

    .product-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 20px;
    }

    .product-image {
      height: 250px;
    }

    .btn {
      padding: 10px 16px;
      font-size: 0.875rem;
    }

    .toast {
      left: 20px;
      right: 20px;
      width: auto;
    }
  }
`;
