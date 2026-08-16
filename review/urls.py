from django.urls import path

from . import views


app_name = "review"


urlpatterns = [
    path("food/<int:food_id>/create/", views.create_review, name="create"),
    path("food/<int:food_id>/edit/", views.edit_review, name="edit"),
]