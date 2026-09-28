from django.shortcuts import render
from .models import ArticlesModel

def home(request):
    articles = ArticlesModel.objects.all()
    
    return render(request, 'blog/home.html', {'articles': articles})