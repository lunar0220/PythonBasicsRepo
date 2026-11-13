from django.db import models

# Create your models here.
from django.core.validators import MaxValueValidator, MinValueValidator
from PIL import Image

MAX_SIZE = (800, 1200)


class Movie(models.Model):
    title = models.CharField("Название", max_length=200)
    description = models.TextField("Описание", blank=True)
    release_year = models.PositiveSmallIntegerField("Год выпуска")
    poster = models.ImageField("Постер", upload_to="posters/", blank=True, null=True)
    file = models.FileField("Файл", upload_to="movie_files/", blank=True, null=True)
    is_published = models.BooleanField("Опубликован", default=False)
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.pk:
            old = Movie.objects.filter(pk=self.pk).first()
            if old and old.poster and old.poster != self.poster:
                old.poster.delete(save=False)

        super().save(*args, **kwargs)
        if self.poster:
            img = Image.open(self.poster.path)
            if img.width > MAX_SIZE[0] or img.height > MAX_SIZE[1]:
                img.thumbnail(MAX_SIZE)
                img.save(self.poster.path)


class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="reviews")
    author = models.CharField("Автор", max_length=100)
    text = models.TextField("Текст")
    rating = models.PositiveSmallIntegerField(
        "Оценка", validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    created_at = models.DateTimeField("Создан", auto_now_add=True)

    def __str__(self):
        return f"{self.author}: {self.rating}/5"