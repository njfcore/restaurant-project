from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone

from common.models import BaseModel
from menu.models import Food


class Cart(BaseModel):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="cart",
        verbose_name="User",
    )

    class Meta:
        verbose_name = "Cart"
        verbose_name_plural = "Carts"

    def __str__(self):
        return f"Cart - {self.user.username}"


class CartItem(BaseModel):

    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name="Cart",
    )

    food = models.ForeignKey(
        Food,
        on_delete=models.CASCADE,
        related_name="cart_items",
        verbose_name="Food",
    )

    quantity = models.PositiveIntegerField(
        default=1,
        validators=[
            MinValueValidator(1),
        ],
        verbose_name="Quantity",
    )

    class Meta:
        verbose_name = "Cart Item"
        verbose_name_plural = "Cart Items"

        constraints = [
            models.UniqueConstraint(
                fields=["cart", "food"],
                name="unique_cart_food",
            ),
        ]

    def __str__(self):
        return f"{self.food.name} × {self.quantity}"


class Order(BaseModel):

    STATUS_PENDING = "pending"
    STATUS_CONFIRMED = "confirmed"
    STATUS_PREPARING = "preparing"
    STATUS_READY = "ready"
    STATUS_COMPLETED = "completed"
    STATUS_CANCELLED = "cancelled"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_CONFIRMED, "Confirmed"),
        (STATUS_PREPARING, "Preparing"),
        (STATUS_READY, "Ready"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    ORDER_TYPE_DINE_IN = "dine_in"
    ORDER_TYPE_TAKEAWAY = "takeaway"
    ORDER_TYPE_DELIVERY = "delivery"

    ORDER_TYPE_CHOICES = [
        (ORDER_TYPE_DINE_IN, "Dine In"),
        (ORDER_TYPE_TAKEAWAY, "Takeaway"),
        (ORDER_TYPE_DELIVERY, "Delivery"),
]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="orders",
        verbose_name="Customer",
    )

    order_type = models.CharField(
        max_length=20,
        choices=ORDER_TYPE_CHOICES,
        default=ORDER_TYPE_DINE_IN,
        verbose_name="Order Type",
    )

    phone = models.CharField(
        max_length=20,
        verbose_name="Phone Number",
    )

    address = models.TextField(
        blank=True,
        verbose_name="Delivery Address",
    )

    notes = models.TextField(
        blank=True,
        verbose_name="Order Notes",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING,
        verbose_name="Status",
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        validators=[
            MinValueValidator(0),
        ],
        verbose_name="Total Price",
    )

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

        ordering = ["-created_at"]

    def __str__(self):
        return f"Order #{self.pk}"


class OrderItem(BaseModel):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name="Order",
    )

    food = models.ForeignKey(
        Food,
        on_delete=models.PROTECT,
        related_name="order_items",
        verbose_name="Food",
    )

    quantity = models.PositiveIntegerField(
        default=1,
        validators=[
            MinValueValidator(1),
        ],
        verbose_name="Quantity",
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[
            MinValueValidator(0),
        ],
        verbose_name="Price",
    )

    class Meta:
        verbose_name = "Order Item"
        verbose_name_plural = "Order Items"

    def __str__(self):
        return f"{self.food.name} × {self.quantity}"