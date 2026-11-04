# Онлайн-курсы на Django

## Описание проекта

Учебный проект: управление онлайн-курсами (преподаватели, категории, курсы, студенты, записи на курсы).

Для работы с базой данных используется Django ORM.

## Используемые технологии

- Python
- Django
- SQLite

## Установка и запуск

python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py makemigrations library
python manage.py migrate

python manage.py seed_data        # тестовые данные (--clear — пересоздать)
python manage.py createsuperuser
python manage.py runserver        # админка: http://127.0.0.1:8000/admin/

## Основные модели

- Instructor — преподаватели.
- Category — категории курсов.
- Course — курсы.
- Student — студенты.
- Enrollment — записи студентов на курсы.

## Запросы

В файле `library/queries.py` реализованы функции для получения курсов, поиска преподавателей, подсчёта статистики студентов и обновления прогресса обучения.
