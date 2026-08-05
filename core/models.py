from django.db import models

from common.models import BaseModel


class Restaurant(BaseModel):

    name = models.CharField(
        max_length=150,
        verbose_name="Restaurant Name",
    )

    slogan = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Slogan",
    )

    story = models.TextField(
        verbose_name="Story",
    )

    since = models.IntegerField(
        default=1998,
        verbose_name="Since",
    )

    phone = models.CharField(
        max_length=30,
        blank=True,
        verbose_name="Phone",
    )

    email = models.EmailField(
        blank=True,
        verbose_name="Email",
    )

    address = models.TextField(
        blank=True,
        verbose_name="Address",
    )

    hero_image = models.ImageField(
        upload_to="restaurant/",
        blank=True,
        null=True,
        verbose_name="Hero Image",
    )

    about_image = models.ImageField(
        upload_to="restaurant/",
        blank=True,
        null=True,
        verbose_name="About Image",
    )

    chef_name = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Chef Name",
    )

    chef_position = models.CharField(
        max_length=120,
        blank=True,
        verbose_name="Chef Position",
    )

    chef_bio = models.TextField(
        blank=True,
        verbose_name="Chef Biography",
    )

    chef_image = models.ImageField(
        upload_to="restaurant/",
        blank=True,
        null=True,
        verbose_name="Chef Image",
    )

    experience_years = models.PositiveIntegerField(
        default=25,
        verbose_name="Years of Experience",
    )

    menu_items = models.PositiveIntegerField(
        default=120,
        verbose_name="Menu Items",
    )

    happy_customers = models.PositiveIntegerField(
        default=50000,
        verbose_name="Happy Customers",
    )

    awards = models.PositiveIntegerField(
        default=15,
        verbose_name="Awards",
    )

    class Meta:

        verbose_name = "Restaurant"

        verbose_name_plural = "Restaurant"

    def __str__(self):

        return self.name