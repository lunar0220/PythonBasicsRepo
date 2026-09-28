const express = require("express");
const pool = require("../db");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

// 1. Создать чат (Личные сообщения, Группа, Канал)
router.post("/create", authenticateToken, async (req, res) => {
  const { type, title, invitedUserId } = req.body; // type: 'private', 'group', 'channel'
  const creatorId = req.user.id;

  try {
    // Создаем сам чат
    const chatRes = await pool.query(
      "INSERT INTO chats (type, title) VALUES ($1, $2) RETURNING *",
      [type, type === "private" ? null : title],
    );
    const chat = chatRes.rows[0];

    // Добавляем создателя в участники чата
    await pool.query(
      "INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2)",
      [chat.id, creatorId],
    );

    // Если это приватный чат (ЛС) и передан id собеседника, добавляем и его
    if (type === "private" && invitedUserId) {
      await pool.query(
        "INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2)",
        [chat.id, invitedUserId],
      );
    }

    res.status(201).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Не удалось создать чат" });
  }
});

// 2. Получить список всех чатов, в которых состоит пользователь
router.get("/my-chats", authenticateToken, async (req, res) => {
  try {
    const chatsRes = await pool.query(
      `SELECT c.id, c.type, c.title, c.created_at 
       FROM chats c
       JOIN chat_members cm ON c.id = cm.chat_id
       WHERE cm.user_id = $1`,
      [req.user.id],
    );
    res.json(chatsRes.rows);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения чатов" });
  }
});

// 3. Получить историю сообщений конкретного чата
router.get("/:chatId/messages", authenticateToken, async (req, res) => {
  const { chatId } = req.params;

  try {
    // Проверяем, состоит ли пользователь в этом чате (для каналов можно сделать исключение на чтение, но для простоты — проверка для всех)
    const memberCheck = await pool.query(
      "SELECT * FROM chat_members WHERE chat_id = $1 AND user_id = $2",
      [chatId, req.user.id],
    );

    // Если это канал, читать могут все, если группа/ЛС — только участники
    const chatInfo = await pool.query("SELECT type FROM chats WHERE id = $1", [
      chatId,
    ]);
    if (chatInfo.rows.length === 0)
      return res.status(404).json({ error: "Чат не найден" });

    if (chatInfo.rows[0].type !== "channel" && memberCheck.rows.length === 0) {
      return res.status(403).json({ error: "У вас нет доступа к этому чату" });
    }

    // Достаем сообщения вместе с именами отправителей
    const messagesRes = await pool.query(
      `SELECT m.id, m.content, m.created_at, m.sender_id, u.username as sender_name
       FROM messages m
       LEFT JOIN users u ON m.sender_id = u.id
       WHERE m.chat_id = $1
       ORDER BY m.created_at ASC`,
      [chatId],
    );

    res.json(messagesRes.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка получения сообщений" });
  }
});

// 4. Вступить в открытый канал или группу
router.post("/:chatId/join", authenticateToken, async (req, res) => {
  const { chatId } = req.params;
  try {
    const check = await pool.query(
      "SELECT * FROM chat_members WHERE chat_id = $1 AND user_id = $2",
      [chatId, req.user.id],
    );
    if (check.rows.length > 0) return res.json({ message: "Вы уже участник" });

    await pool.query(
      "INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2)",
      [chatId, req.user.id],
    );
    res.json({ message: "Вы успешно присоединились к чату" });
  } catch (err) {
    res.status(500).json({ error: "Не удалось вступить в чат" });
  }
});

// 5. Получить ВСЕХ пользователей мессенджера (кроме себя) для правой панели
router.get("/all-users", authenticateToken, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, username FROM users WHERE id != $1 ORDER BY username ASC",
      [req.user.id],
    );
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения списка пользователей" });
  }
});

// 6. Добавить пользователя в существующую группу или канал
router.post("/:chatId/add-member", authenticateToken, async (req, res) => {
  const { chatId } = req.params;
  const { userIdToAdd } = req.body;

  try {
    // Проверяем, состоит ли добавляемый пользователь уже в этом чате
    const check = await pool.query(
      "SELECT * FROM chat_members WHERE chat_id = $1 AND user_id = $2",
      [chatId, userIdToAdd],
    );
    if (check.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Пользователь уже является участником этого чата" });
    }

    // Добавляем участника
    await pool.query(
      "INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2)",
      [chatId, userIdToAdd],
    );

    res.json({ message: "Пользователь успешно добавлен в чат" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Не удалось добавить пользователя в чат" });
  }
});

// 7. Полное удаление чата (личной беседы, группы, канала) и всей его истории
router.delete("/:chatId", authenticateToken, async (req, res) => {
  const { chatId } = req.params;
  const userId = req.user.id;

  try {
    // Проверяем, состоит ли пользователь в этом чате, чтобы посторонний не мог его удалить
    const memberCheck = await pool.query(
      "SELECT * FROM chat_members WHERE chat_id = $1 AND user_id = $2",
      [chatId, userId],
    );

    if (memberCheck.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "У вас нет прав на удаление этого чата" });
    }

    // Удаляем сам чат. Благодаря ON DELETE CASCADE в PostgreSQL,
    // все сообщения и участники этого чата удалятся автоматически!
    await pool.query("DELETE FROM chats WHERE id = $1", [chatId]);

    res.json({ message: "Чат и вся история переписок успешно удалены из БД" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Не удалось удалить чат" });
  }
});

module.exports = router;
