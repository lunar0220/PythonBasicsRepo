from django.urls import path
from . import views

urlpatterns = [
    path('', views.NewsListView.as_view(), name='news_list'),
    path('create/', views.NewsCreateView.as_view(), name='news_create'),
    path('<slug:slug>/edit/', views.NewsUpdateView.as_view(), name='news_edit'),
    path('<slug:slug>/delete/', views.NewsDeleteView.as_view(), name='news_delete'),
    path('<slug:slug>/', views.NewsDetailView.as_view(), name='news_detail'),
]