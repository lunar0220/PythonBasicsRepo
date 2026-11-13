from django.core.cache import cache
from django.db.models import Count

from .models import Category


def get_categories():
    cache_key = 'news_categories'

    categories = cache.get(cache_key)

    if categories is None:
        categories = list(Category.objects.all())
        cache.set(cache_key, categories, 300)

    return categories


def get_news_count_by_category():
    cache_key = 'news_count_by_category'

    result = cache.get(cache_key)

    if result is None:
        result = list(
            Category.objects.annotate(
                news_count=Count('news')
            ).values('id', 'name', 'news_count')
        )

        cache.set(cache_key, result, 300)

    return result


def clear_news_cache():
    cache.clear()