const express = require('express');
const pool = require('../db');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Применяем мидлвары: сначала проверяем токен, затем — роль 'admin'
router.use(authenticateToken);
router.use(requireRole('admin'));

// 1. Получить список всех пользователей системы
router.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT id, username, email, role, created_at FROM users ORDER BY id DESC');
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении пользователей' });
  }
});

// 2. Получить общую статистику мессенджера для Dashboard
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await pool.query('SELECT COUNT(*) FROM users');
    const totalChats = await pool.query('SELECT COUNT(*) FROM chats');
    const totalMessages = await pool.query('SELECT COUNT(*) FROM messages');

    res.json({
      usersCount: totalUsers.rows[0].count,
      chatsCount: totalChats.rows[0].count,
      messagesCount: totalMessages.rows[0].count,
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения статистики' });
  }
});

// 3. Удалить пользователя из системы
router.delete('/users/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.json({ message: 'Пользователь успешно удален' });
  } catch (err) {
    res.status(500).json({ error: 'Не удалось удалить пользователя' });
  }
});

module.exports = router;