from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound


ARTICLES = [
    { "id": 1, "title": "News1", "content": "nothing new in live" },
    { "id": 2, "title": "News2", "content": "nothing new in world" },
    { "id": 3, "title": "News3", "content": "nothing new in univers" }
]

def home(request):
    context = {
        "news_list": ARTICLES
    }
    return render(request, 'blog/home.html', context)


def article_detail(request, article_id):
    article = None
    for art in ARTICLES:
        if art["id"] == article_id:
            article = art
    if article:
        html = f"""
        <h1>{article['title']}</h1>
        <p>{article['content']}</p>
        """
        return HttpResponse(html)

    return HttpResponseNotFound("<h1>Article not found</h1>")
