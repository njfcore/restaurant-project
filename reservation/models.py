from django.db import models


class Reservation(models.Model):

    name = models.CharField(
        max_length=100,
        verbose_name="Full Name",
    )

    email = models.EmailField(
        verbose_name="Email",
    )

    phone = models.CharField(
        max_length=20,
        verbose_name="Phone",
    )

    date = models.DateField(
        verbose_name="Reservation Date",
    )

    time = models.TimeField(
        verbose_name="Reservation Time",
    )

    guests = models.PositiveSmallIntegerField(
        verbose_name="Number of Guests",
    )

    message = models.TextField(
        blank=True,
        verbose_name="Additional Message",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ("-date", "-time")

        verbose_name = "Reservation"

        verbose_name_plural = "Reservations"

    def __str__(self):
        return f"{self.name} - {self.date} {self.time}"