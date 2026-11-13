from django.contrib import admin

# Register your models here.

from django.utils.html import format_html
from .models import Movie, Review


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1
    readonly_fields = ("created_at",)


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ("title", "release_year", "is_published", "created_at")
    search_fields = ("title", "description")
    list_filter = ("is_published", "release_year", "created_at")
    readonly_fields = ("created_at", "poster_preview", "file_link")
    inlines = [ReviewInline]
    actions = ["publish", "unpublish"]

    fields = ("title", "description", "release_year", "is_published",
              "poster", "poster_preview", "file", "file_link", "created_at")

    @admin.display(description="Превью постера")
    def poster_preview(self, obj):
        if obj.poster:
            return format_html('<img src="{}" width="150">', obj.poster.url)
        return "—"

    @admin.display(description="Файл")
    def file_link(self, obj):
        if obj.file:
            return format_html('<a href="{}" target="_blank">Открыть / скачать</a>', obj.file.url)
        return "—"

    @admin.action(description="Опубликовать выбранные фильмы")
    def publish(self, request, queryset):
        queryset.update(is_published=True)

    @admin.action(description="Снять с публикации")
    def unpublish(self, request, queryset):
        queryset.update(is_published=False)