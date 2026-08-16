from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render

from menu.models import Food
from order.models import Order

from .forms import ReviewForm
from .models import Review
from .services import has_completed_order


@login_required
def create_review(request, food_id):

    food = get_object_or_404(Food, pk=food_id)

    # Check whether the user has completed an order containing this food.
    if not has_completed_order(request.user, food):
        messages.error(
            request,
            "You can only review food that you have ordered.",
        )
        return redirect("food_detail", food.slug)

    # Prevent duplicate reviews.
    if Review.objects.filter(
        user=request.user,
        food=food,
    ).exists():
        messages.info(
            request,
            "You have already reviewed this food.",
        )
        return redirect("food_detail", food.slug)

    if request.method == "POST":
        form = ReviewForm(request.POST)

        if form.is_valid():

            order = (
                Order.objects
                .filter(
                    user=request.user,
                    status=Order.STATUS_COMPLETED,
                    items__food=food,
                )
                .order_by("-created_at")
                .first()
            )

            review = form.save(commit=False)
            review.user = request.user
            review.food = food
            review.order = order
            review.save()

            messages.success(
                request,
                "Your review has been submitted successfully.",
            )

            return redirect("food_detail", food.slug)

    else:
        form = ReviewForm()

    return render(
        request,
        "pages/review_form.html",
        {
            "form": form,
            "food": food,
        },
    )


@login_required
def edit_review(request, food_id):

    food = get_object_or_404(Food, pk=food_id)

    review = get_object_or_404(
        Review,
        user=request.user,
        food=food,
    )

    if request.method == "POST":
        form = ReviewForm(
            request.POST,
            instance=review,
        )

        if form.is_valid():
            form.save()

            messages.success(
                request,
                "Your review has been updated successfully.",
            )

            return redirect("food_detail", food.slug)

    else:
        form = ReviewForm(instance=review)

    return render(
        request,
        "pages/review_form.html",
        {
            "form": form,
            "food": food,
            "review": review,
        },
    )