# 🎫 Афиша мероприятий

Домашнее задание №3 · Курс «Python и фреймворк Django» · Тема: Django ORM — продвинутые возможности

---
## Запуск

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

python manage.py makemigrations events
python manage.py migrate
python manage.py seed
python manage.py runserver
```
---

## 🌐 Страницы приложения

| Страница | URL |
|---|---|
| Главная (активные мероприятия, 10 на странице) | http://127.0.0.1:8000/ |
| Поиск | http://127.0.0.1:8000/search/?q=музыка |
| Детальная страница (+1 просмотр) | http://127.0.0.1:8000/event/1/ |
| Статистика (сортировка `?sort=asc` / `?sort=desc`) | http://127.0.0.1:8000/statistics/ |
| Админка | http://127.0.0.1:8000/admin/ (admin / admin12345) |

---
Тестовые пользователи: ivan, maria, petr, anna, oleg (пароль `password123`).
Команда `seed` идемпотентна — её можно запускать повторно.

## Где что используется

| Возможность ORM | Файл |
|---|---|
| `EventQuerySet` (`active`, `popular`, `with_details`, `with_counts`, `recent`, `search`) | `events/models.py` |
| `select_related("author")`, `prefetch_related("categories", "participants")` | `EventQuerySet.with_details()` |
| `annotate()` + `Count(..., distinct=True)` | `EventQuerySet.with_counts()` |
| `Q` + `distinct()` | `EventQuerySet.search()` |
| `F("views") + 1` | `events/views.py`, `event_detail` |
| Сортировка по `participants_count` | `events/views.py`, `statistics` |

Пример цепочки: `Event.objects.active().popular(2).with_details().with_counts().recent()`