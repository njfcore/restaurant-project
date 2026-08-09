from django.urls import path, include

from .views import *

urlpatterns = [
    path("", home_view, name="home"),
    path("about/", about_view, name="about"),
    path("menu/", include("menu.urls")),
    path("reservation/", include("reservation.urls")),
    path("contact/", include("contact.urls")),
    path("gallery/", include("gallery.urls")),
    
]