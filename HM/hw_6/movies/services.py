from django.db import transaction
from .models import Movie, Review


def update_movie_and_add_review(movie_id, new_title, author, text, rating, fail=False):
    try:
        with transaction.atomic():
            movie = Movie.objects.get(pk=movie_id)
            movie.title = new_title
            movie.save()

            if fail:
                raise ValueError("Ошибка во время операции")  # откат обеих операций

            Review.objects.create(movie=movie, author=author, text=text, rating=rating)
    except ValueError as e:
        print(f"Транзакция отменена: {e}")
        return False
    return True