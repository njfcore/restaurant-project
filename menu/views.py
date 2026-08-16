from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.db.models import Avg
from django.core.paginator import Paginator

from .models import Category, Food
from review.models import Review
from review.services import has_completed_order


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

    reviews = (
        Review.objects
        .filter(
            food=food,
            is_approved=True,
        )
        .select_related("user")
        .order_by("-created_at")
    )

    review_stats = reviews.aggregate(
        average_rating=Avg("rating"),
    )

    user_review = None
    can_review = False

    if request.user.is_authenticated:

        user_review = Review.objects.filter(
            user=request.user,
            food=food,
        ).first()

        if not user_review:
            can_review = has_completed_order(
                request.user,
                food,
            )

    context = {

        "food": food,

        "related_foods": related_foods,

        "reviews": reviews,

        "average_rating": review_stats["average_rating"],

        "review_count": reviews.count(),

        "user_review": user_review,

        "can_review": can_review,

    }

    return render(
        request,
        "pages/food_detail.html",
        context,
    )