from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render

from menu.models import Food

from .models import Cart, CartItem


@login_required
def add_to_cart(request, food_id):

    food = get_object_or_404(
        Food,
        id=food_id,
    )

    cart, created = Cart.objects.get_or_create(
        user=request.user,
    )

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        food=food,
    )

    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return redirect("order:cart")


@login_required
def cart_view(request):

    cart, created = Cart.objects.get_or_create(
        user=request.user,
    )

    cart_items = cart.items.select_related(
        "food",
    )

    total_price = 0

    for item in cart_items:

        item.total_price = item.food.price * item.quantity

        total_price += item.total_price

    context = {
        "cart": cart,
        "cart_items": cart_items,
        "total_price": total_price,
    }

    return render(
        request,
        "pages/cart.html",
        context,
    )


@login_required
def update_cart(request, item_id):

    if request.method != "POST":
        return redirect("order:cart")

    cart = get_object_or_404(
        Cart,
        user=request.user,
    )

    cart_item = get_object_or_404(
        CartItem,
        id=item_id,
        cart=cart,
    )

    quantity = request.POST.get("quantity")

    try:
        quantity = int(quantity)
    except (TypeError, ValueError):
        return redirect("order:cart")

    if quantity < 1:
        cart_item.delete()
    else:
        cart_item.quantity = quantity
        cart_item.save()

    return redirect("order:cart")


@login_required
def remove_from_cart(request, item_id):

    if request.method != "POST":
        return redirect("order:cart")

    cart = get_object_or_404(
        Cart,
        user=request.user,
    )

    cart_item = get_object_or_404(
        CartItem,
        id=item_id,
        cart=cart,
    )

    cart_item.delete()

    return redirect("order:cart")