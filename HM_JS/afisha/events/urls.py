from django.urls import path
from . import views

urlpatterns = [
    path("", views.EventListView.as_view(), name="event_list"),
    path("search/", views.EventSearchView.as_view(), name="event_search"),
    path("event/<int:pk>/", views.event_detail, name="event_detail"),
    path("statistics/", views.statistics, name="statistics"),
]