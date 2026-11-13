from django import forms
from .models import News


class NewsForm(forms.ModelForm):

    class Meta:
        model = News
        fields = [
            'title',
            'slug',
            'content',
            'category',
            'is_published'
        ]