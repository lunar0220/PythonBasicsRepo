from django.db import models

# Create your models here.

class Movie(models.Model):
    title = models.CharField(
        max_length=200,
        verbose_name='Название'
    )

    description = models.TextField(
        verbose_name='Описание'
    )

    year = models.PositiveIntegerField(
        verbose_name='Год выпуска'
    )

    class Meta:
        permissions = [
            ('moderate_movie', 'Can moderate movie'),
        ]

    def __str__(self):
        return self.title