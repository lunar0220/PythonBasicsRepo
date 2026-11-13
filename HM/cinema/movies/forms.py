from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Movie


class RegisterForm(UserCreationForm):
    username = forms.CharField(
        label='Логин'
    )

    password1 = forms.CharField(
        label='Пароль',
        widget=forms.PasswordInput
    )

    password2 = forms.CharField(
        label='Повторите пароль',
        widget=forms.PasswordInput
    )

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']


class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = ['title', 'description', 'year']