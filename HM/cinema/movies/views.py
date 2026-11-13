from django.shortcuts import render, redirect, get_object_or_404

# Create your views here.

from django.contrib.auth import login
from django.contrib.auth.decorators import (
    login_required,
    permission_required
)
from django.contrib.auth.models import User, Group
from django.contrib import messages

from .models import Movie
from .forms import RegisterForm, MovieForm


def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)

        if form.is_valid():
            user = form.save()

            viewers, _ = Group.objects.get_or_create(
                name='Зрители'
            )

            user.groups.add(viewers)

            login(request, user)

            return redirect('movie_list')
    else:
        form = RegisterForm()

    return render(
        request,
        'movies/register.html',
        {'form': form}
    )


@login_required
@permission_required('movies.view_movie', raise_exception=True)
def movie_list(request):
    movies = Movie.objects.all()

    return render(
        request,
        'movies/movie_list.html',
        {'movies': movies}
    )


@login_required
@permission_required('movies.add_movie', raise_exception=True)
def movie_create(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)

        if form.is_valid():
            form.save()
            messages.success(request, 'Фильм успешно добавлен!')
            return redirect('movie_list')
    else:
        form = MovieForm()

    return render(
        request,
        'movies/movie_create.html',
        {'form': form}
    )


@login_required
@permission_required('movies.moderate_movie', raise_exception=True)
def movie_edit(request, pk):
    movie = get_object_or_404(Movie, pk=pk)

    if request.method == 'POST':
        form = MovieForm(request.POST, instance=movie)

        if form.is_valid():
            form.save()
            messages.success(request, 'Фильм изменён!')
            return redirect('movie_list')
    else:
        form = MovieForm(instance=movie)

    return render(
        request,
        'movies/movie_edit.html',
        {'form': form, 'movie': movie}
    )


@login_required
def check_permissions(request):
    checked_user = None
    permissions = {}

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()

        checked_user = User.objects.filter(
            username=username
        ).first()

        if checked_user:
            permissions = {
                'Просмотр фильмов': checked_user.has_perm(
                    'movies.view_movie'
                ),
                'Добавление фильмов': checked_user.has_perm(
                    'movies.add_movie'
                ),
                'Изменение фильмов': checked_user.has_perm(
                    'movies.moderate_movie'
                ),
                'Удаление фильмов': checked_user.has_perm(
                    'movies.delete_movie'
                ),
            }
        else:
            messages.error(request, 'Пользователь не найден.')

    return render(
        request,
        'movies/check_permissions.html',
        {
            'checked_user': checked_user,
            'permissions': permissions,
        }
    )