from django import template

register = template.Library()


@register.filter
def ru_plural(number, forms):
    """{{ 5|ru_plural:"участник,участника,участников" }} -> участников"""
    one, few, many = [f.strip() for f in forms.split(",")]
    n = abs(int(number))
    if n % 100 in range(11, 15):
        return many
    if n % 10 == 1:
        return one
    if n % 10 in (2, 3, 4):
        return few
    return many
