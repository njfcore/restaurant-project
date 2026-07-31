from django.contrib import admin
from django.utils.html import format_html

from .models import Category, Food



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "image_preview",
        "name",
        "is_active",
        "display_order",
        "created_at",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "name",
        "description",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }

    list_editable = (
        "is_active",
        "display_order",
    )

    ordering = (
        "display_order",
        "name",
    )

    @admin.display(description="Image")
    def image_preview(self, obj):
        if obj.image and hasattr(obj.image, "url"):
            return format_html(
                '<img src="{}" width="60" height="60" style="border-radius:8px; object-fit:cover;" />',
                obj.image.url,
            )
        return "-"


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = (
        "image_preview",
        "name",
        "category",
        "price",
        "is_available",
        "is_featured",
        "display_order",
    )

    list_filter = (
        "category",
        "is_available",
        "is_featured",
    )

    search_fields = (
        "name",
        "short_description",
        "description",
        "ingredients",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }

    list_editable = (
        "price",
        "is_available",
        "is_featured",
        "display_order",
    )

    autocomplete_fields = (
        "category",
    )

    list_select_related = (
        "category",
        )

    ordering = (
        "display_order",
        "name",
    )

    @admin.display(description="Image")
    def image_preview(self, obj):
        if obj.image and hasattr(obj.image, "url"):
            return format_html(
                '<img src="{}" width="60" height="60" style="border-radius:8px; object-fit:cover;" />',
                obj.image.url,
            )
        return "-"  