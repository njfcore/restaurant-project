from django.contrib import admin

from .models import Cart, CartItem, Order, OrderItem


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "created_at",
        "updated_at",
    )

    search_fields = (
        "user__username",
        "user__email",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "cart",
        "food",
        "quantity",
        "created_at",
    )

    list_filter = (
        "food__category",
    )

    search_fields = (
        "cart__user__username",
        "cart__user__email",
        "food__name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "status",
        "total_price",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "user__username",
        "user__email",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-created_at",
    )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "order",
        "food",
        "quantity",
        "price",
        "created_at",
    )

    search_fields = (
        "order__user__username",
        "order__user__email",
        "food__name",
    )

    list_filter = (
        "food__category",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )