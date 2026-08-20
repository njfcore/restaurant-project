import logging


from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import get_object_or_404, redirect, render

from menu.models import Food

from .forms import CheckoutForm
from .models import Cart, CartItem, Order, OrderItem
from review.models import Review

logger = logging.getLogger("order")


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

@login_required
def checkout_view(request):

    cart, created = Cart.objects.get_or_create(
        user=request.user,
    )

    cart_items = cart.items.select_related(
        "food",
    )

    if not cart_items.exists():
        return redirect("order:cart")

    total_price = sum(
        item.food.price * item.quantity
        for item in cart_items
    )

    if request.method == "POST":

        form = CheckoutForm(request.POST)

        if form.is_valid():

            with transaction.atomic():

                order = Order.objects.create(
                    user=request.user,
                    order_type=form.cleaned_data["order_type"],
                    phone=form.cleaned_data["phone"],
                    address=form.cleaned_data["address"],
                    notes=form.cleaned_data["notes"],
                    total_price=total_price,
                )

                for item in cart_items:

                    OrderItem.objects.create(
                        order=order,
                        food=item.food,
                        quantity=item.quantity,
                        price=item.food.price,
                    )

                cart_items.delete()

            logger.info(
                "Order created: order_id=%s user_id=%s",
                order.id,
                request.user.id,
            )

            return redirect(
                "order:order_success",
                order_id=order.id,
            )

    else:
        form = CheckoutForm()

    context = {
        "cart": cart,
        "cart_items": cart_items,
        "total_price": total_price,
        "form": form,
    }

    return render(
        request,
        "pages/checkout.html",
        context,
    )

@login_required
def order_success(request, order_id):

    order = get_object_or_404(
        Order,
        id=order_id,
        user=request.user,
    )

    context = {
        "order": order,
    }

    return render(
        request,
        "pages/order_success.html",
        context,
    )


@login_required
def order_detail(request, order_id):

    order = get_object_or_404(
        Order.objects.prefetch_related(
            "items__food",
        ),
        id=order_id,
        user=request.user,
    )

    items = list(order.items.all())

    for item in items:
        item.total_price = item.price * item.quantity

    food_ids = [item.food_id for item in items]

    reviews = Review.objects.filter(
        user=request.user,
        food_id__in=food_ids,
    )

    review_map = {
        review.food_id: review
        for review in reviews
    }

    for item in items:
        item.user_review = review_map.get(item.food_id)

    context = {
        "order": order,
        "items": items,
    }

    return render(
        request,
        "pages/order_detail.html",
        context,
    )