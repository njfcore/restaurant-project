from django.db import models
from django.utils.text import slugify
from decimal import Decimal
from django.core.validators import MinValueValidator
from common.models import BaseModel


class Category(BaseModel):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Category Name",
    )

    slug = models.SlugField(
        unique=True,
        blank=True,
        verbose_name="Slug",
    )

    description = models.TextField(
        blank=True,
        verbose_name="Description",
    )

    image = models.ImageField(
        upload_to="categories/",
        blank=True,
        null=True,
        verbose_name="Category Image",
    )

    is_active = models.BooleanField(
        default=True,
        verbose_name="Active",
    )

    display_order = models.PositiveIntegerField(
        default=0,
        verbose_name="Display Order",
    )

    class Meta:
        ordering = ("display_order", "name")
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name



class Food(BaseModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="foods",
        verbose_name="Category",
    )

    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Food Name",
    )

    slug = models.SlugField(
        unique=True,
        blank=True,
        verbose_name="Slug",
    )

    short_description = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Short Description",
    )

    description = models.TextField(
        blank=True,
        verbose_name="Description",
    )

    ingredients = models.TextField(
        blank=True,
        verbose_name="Ingredients",
        help_text="Separate ingredients with commas.",
    )

    price = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    validators=[MinValueValidator(Decimal("0.00"))],
    verbose_name="Price",
    help_text="Price in the selected currency.",
    )
    image = models.ImageField(
        upload_to="foods/",
        blank=True,
        null=True,
        verbose_name="Food Image",
    )

    preparation_time = models.PositiveSmallIntegerField(
        default=15,
        verbose_name="Preparation Time (minutes)",
    )

    calories = models.PositiveIntegerField(
        default=0,
        verbose_name="Calories",
    )

    is_available = models.BooleanField(
        default=True,
        verbose_name="Available",
    )

    is_featured = models.BooleanField(
        default=False,
        verbose_name="Featured",
    )

    display_order = models.PositiveIntegerField(
        default=0,
        verbose_name="Display Order",
    )

    class Meta:
        ordering = ("display_order", "name")
        verbose_name = "Food"
        verbose_name_plural = "Foods"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name    