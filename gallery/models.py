from django.db import models

from common.models import BaseModel


class GalleryImage(BaseModel):

    class GalleryCategory(models.TextChoices):

        FOOD = "food", "Food"
        RESTAURANT = "restaurant", "Restaurant"
        CHEF = "chef", "Chef"
        EVENTS = "events", "Events"
        INTERIOR = "interior", "Interior"

    title = models.CharField(
        max_length=150,
        verbose_name="Title",
    )

    image = models.ImageField(
        upload_to="gallery/",
        verbose_name="Image",
    )

    category = models.CharField(
        max_length=20,
        choices=GalleryCategory.choices,
        default=GalleryCategory.FOOD,
        verbose_name="Category",
    )

    description = models.TextField(
        blank=True,
        verbose_name="Description",
    )

    is_featured = models.BooleanField(
        default=False,
        verbose_name="Featured",
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

        ordering = (
            "display_order",
            "-created_at",
        )

        verbose_name = "Gallery Image"
        verbose_name_plural = "Gallery Images"

    def __str__(self):

        return self.title