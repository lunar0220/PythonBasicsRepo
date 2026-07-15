import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState({ usersCount: 0, chatsCount: 0, messagesCount: 0 });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const axiosConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  const loadAdminData = async () => {
    try {
      const statsRes = await axios.get('http://localhost:5001/api/admin/stats', axiosConfig);
      setStats(statsRes.data);

      const usersRes = await axios.get('http://localhost:5001/api/admin/users', axiosConfig);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Ошибка доступа к админ-панели', err);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        await axios.delete(`http://localhost:5001/api/admin/users/${id}`, axiosConfig);
        loadAdminData(); // Обновляем данные
      } catch (err) {
        alert('Не удалось удалить пользователя');
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <div className="admin-container-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px",}}>
          <h2>Панель администратора</h2>
        <button className="logout-btn" onClick={handleLogout}>Выйти из панели</button>
      </div>

      {/* Карточки статистики */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Пользователей</h3>
          <p>{stats.usersCount}</p>
        </div>
        <div className="stat-card">
          <h3>Всего чатов</h3>
          <p>{stats.chatsCount}</p>
        </div>
        <div className="stat-card">
          <h3>Сообщений отправлено</h3>
          <p>{stats.messagesCount}</p>
        </div>
      </div>

      {/* Таблица пользователей */}
      <h3>Управление пользователями</h3>
      <table className="admin-table" style={{marginTop: '15px'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя (Username)</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td><strong>{u.role.toUpperCase()}</strong></td>
              <td>
                {u.role !== 'admin' && (
                  <button className="btn-danger" onClick={() => handleDeleteUser(u.id)}>Удалить</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default AdminDashboard;