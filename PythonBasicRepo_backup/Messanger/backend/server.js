require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const pool = require("./db");

// Импорт роутов
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chats");
const adminRoutes = require("./routes/admin");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Подключение эндпоинтов API
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/admin", adminRoutes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Порт фронтенда на Vite
    methods: ["GET", "POST"],
  },
});

// Хранилище для онлайн пользователей (userId -> socket.id)
const onlineUsers = new Map();

// Логика работы реального времени через WebSockets
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Событие: пользователь сообщает свой ID при входе в приложение
  socket.on("user_online", (userId) => {
    if (userId) {
      onlineUsers.set(userId.toString(), socket.id);
      // Отправляем всем обновленный список ID тех, кто сейчас онлайн
      io.emit("update_online_users", Array.from(onlineUsers.keys()));
    }
  });

  // Вход пользователя в комнату конкретного чата
  socket.on("join_chat", (chatId) => {
    socket.join(chatId.toString());
  });

  // Отправка сообщения
  socket.on("send_message", async (data) => {
    const { chatId, senderId, content } = data;
    try {
      const savedMessageRes = await pool.query(
        `INSERT INTO messages (chat_id, sender_id, content) 
         VALUES ($1, $2, $3) 
         RETURNING id, chat_id, sender_id, content, created_at`,
        [chatId, senderId, content],
      );
      const savedMessage = savedMessageRes.rows[0];

      const userRes = await pool.query(
        "SELECT username FROM users WHERE id = $1",
        [senderId],
      );
      savedMessage.sender_name = userRes.rows[0]?.username || "Система";

      io.to(chatId.toString()).emit("receive_message", savedMessage);
    } catch (err) {
      console.error("Ошибка сохранения сообщения:", err);
    }
  });

  // Отключение пользователя
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Ищем, какой именно userId отключился, и удаляем из Map
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    // Оповещаем оставшихся пользователей
    io.emit("update_online_users", Array.from(onlineUsers.keys()));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Сервер мессенджера успешно запущен на порту ${PORT}`);
});
