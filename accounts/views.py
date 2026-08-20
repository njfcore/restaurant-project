import logging

from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect, render

from .forms import RegisterForm

logger = logging.getLogger("accounts")


def register_view(request):

    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":

        form = RegisterForm(request.POST)

        if form.is_valid():

            user = form.save()

            login(request, user)

            logger.info(
                f"User registered and logged in: user_id={user.id}"
            )

            messages.success(
                request,
                "Your account has been created successfully.",
            )

            return redirect("home")

    else:

        form = RegisterForm()

    return render(
        request,
        "account/register.html",
        {
            "form": form,
        },
    )


def login_view(request):

    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":

        form = AuthenticationForm(
            request,
            data=request.POST,
        )

        if form.is_valid():

            user = form.get_user()

            login(request, user)

            logger.info(
                f"User logged in: user_id={user.id}"
            )

            messages.success(
                request,
                "Welcome back!",
            )

            return redirect("home")

        else:

            logger.warning(
                f"Failed login attempt: username={request.POST.get("username")}"
            )

    else:

        form = AuthenticationForm()

    return render(
        request,
        "account/login.html",
        {
            "form": form,
        },
    )


def logout_view(request):

    logger.info(
        f"User logged out: uesr_id={request.user.id}"
    )

    logout(request)

    messages.success(
        request,
        "You have been logged out successfully.",
    )

    return redirect("home")


@login_required
def profile_view(request):

    orders = request.user.orders.prefetch_related(
        "items__food"
    )[:5]

    reviews = request.user.reviews.filter(
        is_approved=True
    ).select_related(
        "food"
    )[:5]

    return render(
        request,
        "account/profile.html",
        {
            "orders": orders,
            "reviews": reviews,
        },
    )