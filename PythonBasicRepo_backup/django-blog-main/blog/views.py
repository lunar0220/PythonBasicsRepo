from django.shortcuts import render, get_object_or_404
from django.db.models import Count, Q, Avg
from django.db.models.functions import Length
from django.contrib.auth import get_user_model
from .models import Article, Tag

User = get_user_model()

# def tag_articles(request, tag_slug):
#     tag = get_object_or_404(Tag, slug=tag_slug)
#     articles = Article.objects.published().filter(
#         tags=tag
#     ).with_author_and_tags().recent_first()
#
#     return render(request, 'blog/tag_articles.html', {
#         'tag': tag,
#         'articles': articles
#     })