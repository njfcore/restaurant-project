from django.shortcuts import render
from django.core.exceptions import PermissionDenied

from menu.models import Category, Food
from core.models import Restaurant
from blog.models import Post

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

    latest_posts = Post.objects.filter(
        is_published=True
    ).order_by("-created_at")[:3]

    context = {
        "restaurant": restaurant,
        "categories": categories,
        "featured_foods": featured_foods,
        "latest_posts": latest_posts
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

def custom_404(request, exception):
    return render(
        request,
        "errors/404.html",
        status=404,
    )


def custom_403(request, exception):
    return render(
        request,
        "errors/403.html",
        status=403,
    )


def custom_500(request):
    return render(
        request,
        "errors/500.html",
        status=500,
    )
