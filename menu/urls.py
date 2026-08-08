from django.urls import path

from .views import food_detail_view, menu_view

urlpatterns = [
    path("", menu_view, name="menu"),
    path("<slug:slug>/", food_detail_view, name="food_detail")
]