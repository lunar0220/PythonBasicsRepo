from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .models import News
from .cache_utils import clear_news_cache


@receiver(post_save, sender=News)
def news_saved(sender, instance, **kwargs):
    clear_news_cache()


@receiver(post_delete, sender=News)
def news_deleted(sender, instance, **kwargs):
    clear_news_cache()