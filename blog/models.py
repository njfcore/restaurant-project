from django.db import models
from django.utils.text import slugify

from common.models import BaseModel


class BlogCategory(BaseModel):

    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Category Name",
    )

    slug = models.SlugField(
        max_length=120,
        unique=True,
        blank=True,
        verbose_name="Slug",
    )

    description = models.TextField(
        blank=True,
        verbose_name="Description",
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

        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"

        ordering = [
            "display_order",
            "name",
        ]

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):

        return self.name


class Post(BaseModel):

    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="posts",
        verbose_name="Category",
    )

    title = models.CharField(
        max_length=200,
        verbose_name="Title",
    )

    slug = models.SlugField(
        max_length=220,
        unique=True,
        blank=True,
        verbose_name="Slug",
    )

    excerpt = models.TextField(
        blank=True,
        verbose_name="Excerpt",
    )

    content = models.TextField(
        verbose_name="Content",
    )

    image = models.ImageField(
        upload_to="blog/",
        blank=True,
        null=True,
        verbose_name="Featured Image",
    )

    author = models.CharField(
        max_length=100,
        default="Bella Italia",
        verbose_name="Author",
    )

    is_published = models.BooleanField(
        default=True,
        verbose_name="Published",
    )

    published_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Published At",
    )

    class Meta:

        verbose_name = "Post"
        verbose_name_plural = "Posts"

        ordering = [
            "-published_at",
            "-created_at",
        ]

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def __str__(self):

        return self.title