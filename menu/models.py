from django.db import models
from django.utils.text import slugify

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
        ordering = ["display_order", "name"]
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name