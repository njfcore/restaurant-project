from django.shortcuts import render

from menu.models import Category, Food

def home_view(request):

    categories = Category.objects.filter(
        is_active=True
    ).order_by(
        "display_order",
        "name"
    )

    featured_foods = Food.objects.filter(
        is_available=True,
        is_featured=True,
    ).select_related(
        "category"
    ).order_by(
        "display_order",
        "name"
    )

    context = {
        "categories": categories,
        "featured_foods": featured_foods,
    }

    return render(
        request,
        "home/home.html",
        context,
    )