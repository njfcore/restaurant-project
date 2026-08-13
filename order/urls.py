from django.urls import path

from .views import *


app_name = "order"


urlpatterns = [
    path("cart/", cart_view, name="cart"),
    path("cart/add/<int:food_id>/", add_to_cart, name="add_to_cart"),
    path("cart/update/<int:item_id>/", update_cart, name="update_cart"),
    path("cart/remove/<int:item_id>/", remove_from_cart, name="remove_from_cart"),
    path("checkout/", checkout_view, name="checkout"),
    path("succes/<int:order_id>/", order_success, name="order_success"),
    path("<int:order_id>/", order_detail, name="order_detail"),
]