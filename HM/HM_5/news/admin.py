from django.contrib import admin
from .models import Category, News
# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'category',
        'author',
        'created_at',
        'is_published'
    )

    list_filter = ('category', 'is_published', 'created_at')

    search_fields = ('title', 'content')

    prepopulated_fields = {'slug': ('title',)}