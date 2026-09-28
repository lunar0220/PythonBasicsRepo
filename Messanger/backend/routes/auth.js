const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// 1. РЕГИСТРАЦИЯ
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Проверяем, существует ли пользователь
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Пользователь с таким email или username уже существует' });
    }

    // Хешируем пароль (10 раундов соления)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // По умолчанию первая регистрация может быть админом (для тестов), либо все 'user'
    // Сделаем проверку: если пользователей в базе нет — делаем админом, иначе — обычным юзером
    const countUsers = await pool.query('SELECT COUNT(*) FROM users');
    const role = parseInt(countUsers.rows[0].count) === 0 ? 'admin' : 'user';

    // Сохраняем в БД
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
      [username, email, passwordHash, role]
    );

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера при регистрации' });
  }
});

// 2. АВТОРИЗАЦИЯ (ВХОД)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userRes.rows.length === 0) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }

    const user = userRes.rows[0];

    // Проверяем пароль
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }

    // Генерируем токен (включаем ID и роль)
    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера при входе' });
  }
});

// 3. ПОЛУЧЕНИЕ ДАННЫХ О СЕБЕ (для проверки авторизации на фронтенде)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userRes = await pool.query('SELECT id, username, email, role, created_at FROM users WHERE id = $1', [req.user.id]);
    res.json(userRes.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;