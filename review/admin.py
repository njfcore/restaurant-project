from django.contrib import admin

from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):

    list_display = (
        "user",
        "food",
        "order",
        "rating",
        "is_approved",
        "created_at",
    )

    list_filter = (
        "is_approved",
        "rating",
        "created_at",
    )

    search_fields = (
        "user__username",
        "food__name",
        "comment",
    )

    list_editable = (
        "is_approved",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-created_at",
    )