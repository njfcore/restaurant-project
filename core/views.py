from django.shortcuts import render

from menu.models import Category, Food
from core.models import Restaurant

def home_view(request):

    restaurant = Restaurant.objects.first()

    categories = Category.objects.filter(
        is_active=True
    ).order_by(
        "display_order",
        "name",
    )

    featured_foods = Food.objects.filter(
        is_available=True,
        is_featured=True,
    ).select_related(
        "category",
    ).order_by(
        "display_order",
        "name",
    )[:6]

    context = {
        "restaurant": restaurant,
        "categories": categories,
        "featured_foods": featured_foods,
    }

    return render(
        request,
        "home/home.html",
        context,
    )

def about_view(request):

    restaurant = Restaurant.objects.first()

    return render(
        request,
        "pages/about.html",
        {
            "restaurant": restaurant,
        },
    )