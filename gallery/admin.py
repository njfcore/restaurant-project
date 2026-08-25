from django.contrib import admin

from common.admin import admin_site

from .models import GalleryImage


class GalleryImageAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "category",
        "is_featured",
        "is_active",
        "display_order",
        "created_at",
    )

    list_filter = (
        "category",
        "is_featured",
        "is_active",
    )

    search_fields = (
        "title",
        "description",
    )

    list_editable = (
        "is_featured",
        "is_active",
        "display_order",
    )

    ordering = (
        "display_order",
        "-created_at",
    )

admin_site.register(
    GalleryImage,
    GalleryImageAdmin
)     