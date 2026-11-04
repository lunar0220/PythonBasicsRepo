import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

function UserDashboard() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Состояния для пользователей и онлайна
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUserIds, setOnlineUserIds] = useState([]);

  // Состояния для создания групповых чатов/каналов
  const [newChatType, setNewChatType] = useState("group"); // по дефолту группа
  const [newChatTitle, setNewChatTitle] = useState("");

  const navigate = useNavigate();
  const userId = parseInt(localStorage.getItem("userId"));
  const username = localStorage.getItem("username");
  const messagesEndRef = useRef(null);

  const axiosConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  // 1. Загрузка чатов и пользователей
  const fetchData = async () => {
    try {
      const chatsRes = await axios.get(
        "http://localhost:5000/api/chats/my-chats",
        axiosConfig,
      );
      setChats(chatsRes.data);

      const usersRes = await axios.get(
        "http://localhost:5000/api/chats/all-users",
        axiosConfig,
      );
      setAllUsers(usersRes.data);
    } catch (err) {
      console.error("Ошибка загрузки данных", err);
    }
  };

  // Функция полного удаления чата и истории
  const handleDeleteChat = async (chatId, e) => {
    // Важно! Останавливаем всплытие события, чтобы клик по крестику не открывал сам чат
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Вы уверены, что хотите выйти из этого чата? ВСЯ история переписок будет безвозвратно удалена из базы данных.",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/chats/${chatId}`,
        axiosConfig,
      );

      // Если удаленный чат был открыт в данный момент — закрываем его окно
      if (activeChat && activeChat.id === chatId) {
        setActiveChat(null);
        setMessages([]);
      }

      // Обновляем список чатов на панели
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || "Не удалось удалить чат");
    }
  };

  useEffect(() => {
    fetchData();

    // Объявляем серверу, что мы онлайн
    socket.emit("user_online", userId);

    // Слушаем список тех, кто онлайн
    socket.on("update_online_users", (ids) => {
      setOnlineUserIds(ids);
    });

    // Слушаем новые сообщения
    socket.on("receive_message", (message) => {
      if (activeChat && message.chat_id === activeChat.id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("update_online_users");
      socket.off("receive_message");
    };
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Сортировка пользователей: сначала онлайн, потом оффлайн
  const sortedUsers = [...allUsers].sort((a, b) => {
    const aOnline = onlineUserIds.includes(a.id.toString()) ? 1 : 0;
    const bOnline = onlineUserIds.includes(b.id.toString()) ? 1 : 0;
    return bOnline - aOnline;
  });

  // Действие: Начать ЛС с пользователем
  const handleStartPrivateChat = async (targetUser) => {
    try {
      // Создаем приватный чат
      const res = await axios.post(
        "http://localhost:5000/api/chats/create",
        {
          type: "private",
          invitedUserId: targetUser.id,
        },
        axiosConfig,
      );

      fetchData(); // обновляем список чатов
      handleSelectChat(res.data); // открываем этот чат
    } catch (err) {
      alert("Ошибка при создании личного чата");
    }
  };

  // Действие: Добавить пользователя в текущий чат (группу или канал)
  const handleAddUserToCurrentChat = async (targetUser) => {
    if (!activeChat || activeChat.type === "private") {
      alert(
        "Выберите групповой чат или канал, куда хотите добавить пользователя.",
      );
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/chats/${activeChat.id}/add-member`,
        {
          userIdToAdd: targetUser.id,
        },
        axiosConfig,
      );
      alert(
        `Пользователь ${targetUser.username} успешно добавлен в ${activeChat.title}`,
      );
    } catch (err) {
      alert(err.response?.data?.error || "Не удалось добавить пользователя");
    }
  };

  // Переключение активного чата
  const handleSelectChat = async (chat) => {
    setActiveChat(chat);
    socket.emit("join_chat", chat.id);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chats/${chat.id}/messages`,
        axiosConfig,
      );
      setMessages(res.data);
    } catch (err) {
      console.error("Ошибка истории сообщений", err);
    }
  };

  // Создание новой Группы или Канала
  const handleCreateGroupOrChannel = async (e) => {
    e.preventDefault();
    if (!newChatTitle.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/chats/create",
        {
          type: newChatType,
          title: newChatTitle,
        },
        axiosConfig,
      );
      setNewChatTitle("");
      fetchData();
      alert("Успешно создано!");
    } catch (err) {
      alert("Ошибка создания");
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const msgData = {
      chatId: activeChat.id,
      senderId: userId,
      content: newMessage,
    };

    socket.emit("send_message", msgData);
    setNewMessage("");
  };

  return (
    <div className="messenger-layout">
      {/* 1. ЛЕВАЯ ПАНЕЛЬ: Список твоих чатов */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>{username}</h3>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            style={{ padding: "5px 10px", fontSize: "12px", width: "auto" }}
          >
            Выйти
          </button>
        </div>

        {/* Форма создания групп/каналов */}
        <form
          style={{ padding: "10px", borderBottom: "1px solid #eee" }}
          onSubmit={handleCreateGroupOrChannel}
        >
          <select
            value={newChatType}
            onChange={(e) => setNewChatType(e.target.value)}
            style={{ padding: "5px", width: "100%", marginBottom: "5px" }}
          >
            <option value="group">Создать Группу</option>
            <option value="channel">Создать Канал</option>
          </select>
          <input
            type="text"
            placeholder="Название..."
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            style={{ padding: "5px", width: "100%", marginBottom: "5px" }}
            required
          />
          <button type="submit" style={{ padding: "5px", fontSize: "12px" }}>
            Создать
          </button>
        </form>

        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat?.id === chat.id ? "active" : ""}`}
              onClick={() => handleSelectChat(chat)}
            >
              {/* Контейнер с текстовой информацией */}
              <div className="chat-item-info">
                <strong>
                  {chat.type === "private"
                    ? `Личная беседа #${chat.id}`
                    : chat.title}
                </strong>
                <div>[{chat.type.toUpperCase()}]</div>
              </div>

              {/* Кнопка-крестик для удаления */}
              <button
                className="delete-chat-btn"
                onClick={(e) => handleDeleteChat(chat.id, e)}
                title="Удалить чат и историю"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ЦЕНТРАЛЬНАЯ ПАНЕЛЬ: Окно переписки */}
      <div className="chat-area">
        {activeChat ? (
          <>
            <div className="chat-header">
              {activeChat.type === "private"
                ? `Личный чат #${activeChat.id}`
                : activeChat.title}{" "}
              ({activeChat.type.toUpperCase()})
            </div>
            <div className="messages-box">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender_id === userId ? "my" : "other"}`}
                >
                  <div className="message-sender">
                    {msg.sender_name || `ID: ${msg.sender_id}`}
                  </div>
                  <div>{msg.content}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
              <input
                type="text"
                placeholder="Напишите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>Отправить</button>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "#666",
            }}
          >
            Выберите чат слева или начните диалог с пользователем справа
          </div>
        )}
      </div>

      {/* 3. НОВАЯ ПРАВАЯ ПАНЕЛЬ: Список всех пользователей мессенджера */}
      <div className="right-sidebar">
        <div className="right-sidebar-header">Пользователи системы</div>
        <div className="user-list">
          {sortedUsers.map((u) => {
            const isOnline = onlineUserIds.includes(u.id.toString());
            return (
              <div key={u.id} className="user-item">
                <div className="user-info">
                  <span
                    className={`status-dot ${isOnline ? "online" : "offline"}`}
                  ></span>
                  <strong>{u.username}</strong>
                  <span style={{ fontSize: "11px", color: "#999" }}>
                    ID: {u.id}
                  </span>
                </div>
                <div className="user-actions">
                  <button
                    className="action-mini-btn"
                    onClick={() => handleStartPrivateChat(u)}
                  >
                    💬 ЛС
                  </button>
                  {activeChat && activeChat.type !== "private" && (
                    <button
                      className="action-mini-btn"
                      onClick={() => handleAddUserToCurrentChat(u)}
                    >
                      ➕ Пригласить
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
