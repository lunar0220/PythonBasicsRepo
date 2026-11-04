from django.contrib import admin

# Register your models here.
from .models import Category, Event


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "created_at")
    search_fields = ("name",)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "price", "views_count", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("title",)
    list_select_related = ("author",)
    filter_horizontal = ("categories", "participants")