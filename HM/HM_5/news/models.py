from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Category(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Название категории'
    )

    slug = models.SlugField(
        max_length=100,
        unique=True,
        verbose_name='URL категории'
    )

    description = models.TextField(
        blank=True,
        verbose_name='Описание'
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['name']


class News(models.Model):
    title = models.CharField(
        max_length=200,
        verbose_name='Заголовок'
    )

    slug = models.SlugField(
        max_length=200,
        unique=True,
        verbose_name='URL новости'
    )

    content = models.TextField(
        verbose_name='Текст новости'
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='news',
        verbose_name='Категория'
    )

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='news',
        verbose_name='Автор'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления'
    )

    is_published = models.BooleanField(
        default=True,
        verbose_name='Опубликовано'
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'
        ordering = ['-created_at']