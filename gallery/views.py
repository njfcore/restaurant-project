from django.shortcuts import render

from .models import GalleryImage


def gallery_view(request):

    category = request.GET.get("category")

    images = GalleryImage.objects.filter(
        is_active=True,
    )

    if category:
        images = images.filter(
            category=category,
        )

    categories = GalleryImage.GalleryCategory.choices

    context = {
        "images": images,
        "categories": categories,
        "active_category": category,
    }

    return render(
        request,
        "pages/gallery.html",
        context,
    )