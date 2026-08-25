import logging

from django.contrib import admin
from django.contrib.admin import AdminSite
from django.contrib.admin.forms import AdminAuthenticationForm


logger = logging.getLogger("admin")


class RestaurantAdminAuthenticationForm(AdminAuthenticationForm):

    def clean(self):
        try:
            data = super().clean()

            logger.info(
                "Admin login: user_id=%s",
                self.get_user().id,
            )

            return data

        except Exception:
            logger.warning(
                "Failed admin login attempt: username=%s",
                self.data.get("username"),
            )
            raise


class RestaurantAdminSite(AdminSite):

    site_header = "Restaurant Administration"
    site_title = "Restaurant Admin"
    index_title = "Dashboard"

    login_form = RestaurantAdminAuthenticationForm

    def logout(self, request, extra_context=None):

        if request.user.is_authenticated:
            logger.info(
                "Admin logout: user_id=%s",
                request.user.id,
            )

        return super().logout(
            request,
            extra_context=extra_context,
        )


admin_site = RestaurantAdminSite(
    name="restaurant_admin",
)