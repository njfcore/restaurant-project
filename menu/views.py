from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.core.paginator import Paginator

from .models import Category, Food

def menu_view(request):

    categories = Category.objects.filter(
        is_active=True,
    ).order_by(
        "display_order",
        "name",
    )

    foods = Food.objects.filter(
        is_available=True,
    ).select_related(
        "category",
    ).order_by(
        "display_order",
        "name",
    )

    selected_category = request.GET.get("category")

    if selected_category:

        foods = foods.filter(
            category__slug=selected_category,
        )

    paginator = Paginator(
        foods,
        9,
    )

    page_number = request.GET.get("page")

    page_obj = paginator.get_page(
        page_number,
    )

    context = {

        "categories": categories,

        "page_obj": page_obj,

        "foods": page_obj,

        "selected_category": selected_category,

    }

    return render(
        request,
        "pages/menu.html",
        context,
    )


def food_detail_view(request, slug):

    food = get_object_or_404(
        Food,
        slug=slug,
        is_available=True,
    )

    related_foods = Food.objects.filter(
        category=food.category,
        is_available=True,
    ).exclude(
        id=food.id,
    )[:4]

    context = {

        "food": food,

        "related_foods": related_foods,

    }

    return render(
        request,
        "pages/food_detail.html",
        context,
    )