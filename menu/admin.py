from django.contrib import admin

from .models import Category, Food


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
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


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = (
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

    ordering = (
        "display_order",
        "name",
    )