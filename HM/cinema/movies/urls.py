from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('', views.movie_list, name='movie_list'),

    path('register/', views.register, name='register'),

    path(
        'login/',
        auth_views.LoginView.as_view(
            template_name='movies/login.html'
        ),
        name='login'
    ),

    path(
        'logout/',
        auth_views.LogoutView.as_view(),
        name='logout'
    ),

    path(
        'movies/add/',
        views.movie_create,
        name='movie_create'
    ),

    path(
        'movies/<int:pk>/edit/',
        views.movie_edit,
        name='movie_edit'
    ),

    path(
        'permissions/',
        views.check_permissions,
        name='check_permissions'
    ),
]