# Быстрый старт

## 1. Установка зависимостей

```bash
pip install -r requirements.txt
```

## 2. Запуск приложения

```bash
uvicorn app.main:app --reload
```

**Примечание:** Если ваш файл называется не `main.py`, замените `main` на имя вашего файла. Например:

- `uvicorn app:app --reload` (если файл `app.py`)
- `uvicorn server:app --reload` (если файл `server.py`)

## 3. Открыть документацию

После запуска перейдите по адресу:

- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## ⚙️ Дополнительные параметры запуска

```bash
# Запуск на другом порту
uvicorn main:app --reload --port 8080

# Запуск с доступом извне
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Запуск без авто-перезагрузки (продакшен)
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

**Готово! 🚀** Приложение запущено и доступно по адресу [http://localhost:8000](http://localhost:8000/)