from django.contrib import messages
from django.shortcuts import redirect, render

from .forms import ReservationForm
from core.models import Restaurant


def reservation_view(request):

    restaurant = Restaurant.objects.first()

    if request.method == "POST":

        form = ReservationForm(request.POST)

        if form.is_valid():

            form.save()

            messages.success(
                request,
                "Your reservation has been submitted successfully.",
            )

            return redirect("reservation")

    else:

        form = ReservationForm()

    return render(
        request,
        "pages/reservation.html",
        {
            "form": form,
            "restaurant": restaurant,
        },
    )