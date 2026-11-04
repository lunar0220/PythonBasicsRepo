from django.conf import settings
from django.db import models
from django.db.models import Q, Count

# Create your models here.

class Category(models.Model):
    name = models.CharField("Название", max_length=100, unique=True)
    description = models.TextField("Описание", blank=True)
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name
    
    
    
class EventQuerySet(models.QuerySet):

    def active(self):
        return self.filter(is_active=True)

    def popular(self, min_participants=2):
        return self.alias(
            popular_participants=Count("participants", distinct=True)
        ).filter(popular_participants__gt=min_participants)

    def with_details(self):
        return self.select_related("author").prefetch_related(
            "categories", "participants"
        )

    def with_counts(self):
        return self.annotate(
            participants_count=Count("participants", distinct=True),
            categories_count=Count("categories", distinct=True),
        )

    def recent(self):
        return self.order_by("-created_at", "-pk")

    def search(self, query):
        query = (query or "").strip()
        if not query:
            return self.none()
        return self.filter(
            Q(title__icontains=query)
            | Q(description__icontains=query)
            | Q(categories__name__icontains=query)
        ).distinct()

    
    
    
class Event(models.Model):
    title = models.CharField("Название", max_length=200)
    description = models.TextField("Описание")
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name="created_events", verbose_name="Автор"
    )
    categories = models.ManyToManyField(
        Category, related_name="events", verbose_name="Категории", blank=True
    )
    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="joined_events",
        verbose_name="Участники", blank=True
    )
    price = models.DecimalField("Цена", max_digits=8, decimal_places=2, default=0)
    max_participants = models.PositiveIntegerField("Максимум участников", default=50)
    views_count = models.PositiveIntegerField("Количество просмотров", default=0)
    is_active = models.BooleanField("Активно", default=True)
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    objects = EventQuerySet.as_manager()

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Мероприятие"
        verbose_name_plural = "Мероприятия"

    def __str__(self):
        return self.title
    
    
