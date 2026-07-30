from django.db import models


class BaseModel(models.Model):
    """
    Abstract base model that provides timestamp fields
    for all project models.
    """

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
        verbose_name="Created At",
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Updated At",
    )

    class Meta:
        abstract = True
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.__class__.__name__} ({self.pk})"