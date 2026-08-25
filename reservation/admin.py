from django.contrib import admin

from common.admin import admin_site

from .models import Reservation


class ReservationAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "phone",
        "date",
        "time",
        "guests",
        "created_at",
    )

    list_filter = (
        "date",
        "time",
    )

    search_fields = (
        "name",
        "email",
        "phone",
    )

    ordering = (
        "-date",
        "-time",
    )

admin_site.register(
    Reservation,
    ReservationAdmin,
)

