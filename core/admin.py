from django.contrib import admin

from common.admin import admin_site

from .models import Restaurant


class RestaurantAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "phone",
        "email",
    )

    fieldsets = (

        (
            "General Information",
            {
                "fields": (
                    "name",
                    "slogan",
                    "story",
                    "since",
                )
            },
        ),

        (
            "Contact Information",
            {
                "fields": (
                    "phone",
                    "email",
                    "address",
                )
            },
        ),

        (
            "Images",
            {
                "fields": (
                    "hero_image",
                    "about_image",
                    "chef_image",
                )
            },
        ),

        (
            "Chef",
            {
                "fields": (
                    "chef_name",
                    "chef_position",
                    "chef_bio",
                )
            },
        ),

        (
            "Statistics",
            {
                "fields": (
                    "experience_years",
                    "menu_items",
                    "happy_customers",
                    "awards",
                )
            },
        ),

    )

    def has_add_permission(self, request):

        if Restaurant.objects.exists():

            return False

        return True


admin_site.register(
    Restaurant,
    RestaurantAdmin,
)