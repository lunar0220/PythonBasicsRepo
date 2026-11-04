from django.contrib import admin
from .models import ArticlesModel, Tag


admin.site.register(ArticlesModel)
admin.site.register(Tag)
