from django.db import models

from core.models import BaseModel


class ContactMessage(BaseModel):

    name = models.CharField(
        max_length=150,
        verbose_name="Name",
    )

    email = models.EmailField(
        verbose_name="Email",
    )

    phone = models.CharField(
        max_length=30,
        blank=True,
        verbose_name="Phone",
    )

    subject = models.CharField(
        max_length=200,
        verbose_name="Subject",
    )

    message = models.TextField(
        verbose_name="Message",
    )

    is_read = models.BooleanField(
        default=False,
        verbose_name="Read",
    )

    class Meta:

        ordering = ["-created_at"]

        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):

        return f"{self.name} - {self.subject}"