from decimal import Decimal
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from events.models import Category, Event



CATEGORIES = [
    ("Музыка", "Концерты, фестивали и джем-сессии"),
    ("Технологии", "Конференции, митапы и хакатоны"),
    ("Спорт", "Тренировки, забеги и турниры"),
]

USERS = ["ivan", "maria", "petr", "anna", "oleg"]

EVENTS = [
    ("Рок-фестиваль", "Open-air фестиваль с живой музыкой", "ivan",
     ["Музыка"], "1500.00", 500, True, 120, ["maria", "petr", "anna", "oleg", "ivan"]),
    ("Python Meetup", "Встреча разработчиков: Django и ORM", "maria",
     ["Технологии"], "0.00", 80, True, 75, ["ivan", "petr", "anna", "oleg"]),
    ("Городской забег", "Забег на 5 и 10 км по набережной", "petr",
     ["Спорт"], "500.00", 300, True, 40, ["ivan", "maria", "anna"]),
    ("Хакатон AI", "48 часов, команды, призы и музыка", "anna",
     ["Технологии", "Музыка"], "300.00", 100, True, 200, ["ivan", "maria"]),
    ("Джазовый вечер", "Камерный концерт в клубе", "oleg",
     ["Музыка"], "900.00", 60, True, 15, ["petr", "anna", "maria"]),
    ("Турнир по шахматам", "Открытый турнир для всех уровней", "ivan",
     ["Спорт", "Технологии"], "200.00", 64, False, 33, ["maria"]),
    ("Музыка и код", "Live-coding под электронную музыку", "maria",
     ["Музыка", "Технологии"], "700.00", 50, False, 8, ["oleg", "anna"]),
    ("Йога в парке", "Утренняя практика на свежем воздухе", "petr",
     ["Спорт"], "0.00", 30, True, 5, ["anna", "oleg", "ivan", "maria"]),
]


class Command(BaseCommand):
    help = "Заполняет базу тестовыми данными (можно запускать повторно)"

    def handle(self, *args, **options):
        categories = {}
        for name, description in CATEGORIES:
            categories[name], _ = Category.objects.get_or_create(
                name=name, defaults={"description": description}
            )

        users = {}
        for username in USERS:
            user, created = User.objects.get_or_create(
                username=username, defaults={"email": f"{username}@example.com"}
            )
            if created:
                user.set_password("password123")
                user.save()
            users[username] = user

        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@example.com", "admin12345")

        for title, desc, author, cats, price, max_p, active, views, parts in EVENTS:
            event, _ = Event.objects.get_or_create(
                title=title,
                defaults={
                    "description": desc,
                    "author": users[author],
                    "price": Decimal(price),
                    "max_participants": max_p,
                    "is_active": active,
                    "views_count": views,
                },
            )
            event.categories.set([categories[c] for c in cats])
            event.participants.set([users[p] for p in parts])

        self.stdout.write(self.style.SUCCESS(
            f"Готово: категорий {Category.objects.count()}, "
            f"пользователей {User.objects.count()}, "
            f"мероприятий {Event.objects.count()}. "
            "Админ: admin / admin12345"
        ))