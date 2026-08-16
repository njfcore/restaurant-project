from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from common.models import BaseModel
from menu.models import Food
from order.models import Order


class Review(BaseModel):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reviews",
        verbose_name="User",
    )

    food = models.ForeignKey(
        Food,
        on_delete=models.CASCADE,
        related_name="reviews",
        verbose_name="Food",
    )

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="reviews",
        verbose_name="Order",
    )

    rating = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ],
        verbose_name="Rating",
    )

    comment = models.TextField(
        verbose_name="Comment",
    )

    is_approved = models.BooleanField(
        default=False,
        verbose_name="Approved",
    )

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"

        ordering = ["-created_at"]

        constraints = [
            models.UniqueConstraint(
                fields=["user", "food"],
                name="unique_user_food_review",
            ),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.food.name} ({self.rating}/5)"