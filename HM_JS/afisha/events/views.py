from django.db.models import F
from django.shortcuts import get_object_or_404, render
from django.views.generic import ListView

from .models import Event


class EventListView(ListView):

    template_name = "events/event_list.html"
    context_object_name = "events"
    paginate_by = 10

    def get_queryset(self):
        return Event.objects.active().with_details().with_counts().recent()


class EventSearchView(ListView):

    template_name = "events/search.html"
    context_object_name = "events"
    paginate_by = 10

    def get_queryset(self):
        self.q = self.request.GET.get("q", "").strip()
        return (
            Event.objects.active()
            .search(self.q)
            .with_details()
            .with_counts()
            .recent()
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["q"] = self.q
        return context


def event_detail(request, pk):
    Event.objects.filter(pk=pk).update(views_count=F("views_count") + 1)
    event = get_object_or_404(Event.objects.with_details().with_counts(), pk=pk)
    return render(request, "events/event_detail.html", {"event": event})


def statistics(request):
    sort = request.GET.get("sort", "desc")
    ordering = "participants_count" if sort == "asc" else "-participants_count"
    events = (
        Event.objects.select_related("author")
        .with_counts()
        .order_by(ordering, "title")
    )
    return render(
        request,
        "events/statistics.html",
        {"events": events, "sort": "asc" if sort == "asc" else "desc"},
    )
