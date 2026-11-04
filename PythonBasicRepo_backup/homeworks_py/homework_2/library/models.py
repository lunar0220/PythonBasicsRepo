from decimal import Decimal
from django.core.validators import MaxValueValidator, MinValueValidator

from django.db import models

# Create your models here.

class Instructor(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    specialization = models.CharField("Специализация", max_length=200)
    rating = models.DecimalField(
        "Рейтинг",
        max_digits=2,
        decimal_places=1,
        default=Decimal("0.0"),
        validators=[MinValueValidator(Decimal("0")), MaxValueValidator(Decimal("5"))],
        help_text="От 0 до 5, один знак после запятой",
    )
    start_date = models.DateField("Дата начала работы")
    bio = models.TextField("Биография", blank=True)
    is_active = models.BooleanField("Активен", default=True)

    class Meta:
        ordering = ["last_name", "first_name"]
        verbose_name = "Преподаватель"
        verbose_name_plural = "Преподаватели"

    class Meta:
        ordering = ['last_name', 'first_name']
        verbose_name = 'Преподаватель'
        verbose_name_plural = 'Преподаватели'

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    


class Category(models.Model):
    name = models.CharField('Название', max_length=100, unique=True)
    description = models.TextField('Описание', blank=True)
    slug = models.SlugField('Slug', unique=True)
    parent = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='subcategories',
        verbose_name='Родительская категория'
    )

    class Meta:
        ordering = ['name']
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name



class Course(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Начальный'),
        ('intermediate', 'Средний'),
        ('advanced', 'Продвинутый'),
    ]
    title = models.CharField('Название', max_length=200)
    instructor = models.ForeignKey(
        Instructor,
        verbose_name="Преподаватель",
        on_delete=models.PROTECT,
        related_name="courses",
    )
    category = models.ForeignKey(
        Category,
        verbose_name="Категория",
        on_delete=models.PROTECT,
        related_name="courses",
    )

    start_date = models.DateField('Дата начала')
    end_date = models.DateField('Дата окончания')
    is_active = models.BooleanField('Активен', default=True)
    
    description = models.TextField('Описание')
    duration = models.PositiveIntegerField('Длительность в часах')
    level = models.CharField(
            'Уровень сложности',
            max_length=20,
            choices=LEVEL_CHOICES
    )
    price = models.DecimalField(
            'Цена',
            max_digits=8,
            decimal_places=2,
            validators=[MinValueValidator(0)]
    )
    created_at = models.DateTimeField(
            'Дата создания',
            auto_now_add=True
    )
    updated_at = models.DateTimeField(
            'Дата обновления',
            auto_now=True
    )
    is_published = models.BooleanField('Опубликован', default=False)
    places = models.PositiveIntegerField(
            'Количество мест',
            null=True,
            blank=True
    )

    class Meta:
        ordering = ['title']
        verbose_name = 'Курс'
        verbose_name_plural = 'Курсы'

    def __str__(self):
        return self.title
    
    def get_available_spots(self):
        if self.max_students is None:
            return None
        taken = self.enrollments.exclude(status='cancelled').count()
        return max(0, self.max_students - taken) 
    
      
    
class Student (models.Model):
    first_name = models.CharField('Имя', max_length=50)
    last_name = models.CharField('Фамилия', max_length=50)
    email = models.EmailField('Email', unique=True)
    registered_at = models.DateTimeField('Дата регистрации', auto_now_add=True)
    courses = models.ManyToManyField(
        Course,
        through='Enrollment',
        related_name='students',
        verbose_name='Курсы'
    )

    class Meta:
        ordering = ['last_name', 'first_name']
        verbose_name = 'Студент'
        verbose_name_plural = 'Студенты'

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    def get_completed_courses(self):
        return self.courses.filter(
            enrollments__student=self,
            enrollments__status='completed'
        ).distinct()



class Enrollment(models.Model):
    STATUS_CHOICES = [
        ('in_progress', 'В процессе'),
        ('completed', 'Завершён'),
        ('cancelled', 'Отменён'),
    ]

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='enrollments',
        verbose_name='Студент'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='enrollments',
        verbose_name='Курс'
    )
    enrolled_at = models.DateTimeField('Дата записи', auto_now_add=True)
    status = models.CharField(
        'Статус прохождения',
        max_length=20,
        choices=STATUS_CHOICES,
        default='in_progress'
    )
    progress = models.PositiveIntegerField(
        'Прогресс (%)',
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100)
        ]
    )
    grade = models.PositiveIntegerField(
        'Оценка',
        null=True,
        blank=True,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100)
        ]
    )

    class Meta:
        ordering = ['-enrolled_at']
        verbose_name = 'Запись на курс'
        verbose_name_plural = 'Записи на курсы'

    def __str__(self):
        return f'{self.student} — {self.course}'