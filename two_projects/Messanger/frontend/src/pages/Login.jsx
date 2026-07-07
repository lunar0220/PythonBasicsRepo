import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('username', res.data.user.username);

      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/app');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Неверный логин или пароль');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Вход в мессенджер</h2>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Войти</button>
        <p className="link-btn" onClick={() => navigate('/register')}>Нет аккаунта? Регистрация</p>
      </form>
    </div>
  );
}

export default Login;