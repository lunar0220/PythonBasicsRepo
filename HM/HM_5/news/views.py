from django.views.generic import ListView, DetailView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.core.cache import cache

from .models import News
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import CreateView, UpdateView, DeleteView

from .forms import NewsForm


@method_decorator(cache_page(60 * 5), name='dispatch')
class NewsListView(ListView):
    model = News
    template_name = 'news/news_list.html'
    context_object_name = 'news'

    def get_queryset(self):
        return News.objects.filter(
            is_published=True
        ).select_related('category', 'author')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        from .cache_utils import get_categories, get_news_count_by_category

        context['categories'] = get_categories()
        context['news_count_by_category'] = get_news_count_by_category()

        return context


class NewsDetailView(DetailView):
    model = News
    template_name = 'news/news_detail.html'
    context_object_name = 'news'
    slug_url_kwarg = 'slug'

    def get_object(self, queryset=None):
        slug = self.kwargs['slug']

        if self.request.user.is_authenticated:
            user_id = self.request.user.pk
        else:
            user_id = 'anonymous'

        cache_key = f'news_detail_{slug}_user_{user_id}'

        news = cache.get(cache_key)

        if news is None:
            news = super().get_object(queryset)
            cache.set(cache_key, news, 300)

        return news

class NewsCreateView(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    model = News
    form_class = NewsForm
    template_name = 'news/news_form.html'
    permission_required = 'news.add_news'
    success_url = reverse_lazy('news_list')

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


class NewsUpdateView(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    model = News
    form_class = NewsForm
    template_name = 'news/news_form.html'
    permission_required = 'news.change_news'
    slug_url_kwarg = 'slug'
    success_url = reverse_lazy('news_list')


class NewsDeleteView(LoginRequiredMixin, PermissionRequiredMixin, DeleteView):
    model = News
    template_name = 'news/news_confirm_delete.html'
    permission_required = 'news.delete_news'
    slug_url_kwarg = 'slug'
    success_url = reverse_lazy('news_list')