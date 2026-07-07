const jwt = require('jsonwebtoken');

// Проверка, авторизован ли пользователь вообще
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ожидаем формат "Bearer TOKEN"

  if (!token) return res.status(401).json({ error: 'Доступ запрещен. Токен отсутствует.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Неверный или просроченный токен.' });
    req.user = user; // Записываем данные пользователя (id, role) в объект запроса
    next();
  });
};

// Проверка конкретной роли (например, только для админов)
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: 'Недостаточно прав для этого действия.' });
    }
    next();
  };
};

module.exports = { authenticateToken, requireRole };