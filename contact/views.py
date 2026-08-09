from django.contrib import messages
from django.shortcuts import redirect, render

from .forms import ContactForm
from core.models import Restaurant


def contact_view(request):

    restaurant = Restaurant.objects.first()

    if request.method == "POST":

        form = ContactForm(request.POST)

        if form.is_valid():

            form.save()

            messages.success(
                request,
                "Your message has been sent successfully.",
            )

            return redirect("contact")

    else:

        form = ContactForm()

    return render(
        request,
        "pages/contact.html",
        {
            "form": form,
            "restaurant": restaurant,
        },
    )