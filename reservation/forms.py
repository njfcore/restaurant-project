from datetime import date, time

from django import forms

from .models import Reservation


class ReservationForm(forms.ModelForm):

    class Meta:

        model = Reservation

        fields = (
            "name",
            "email",
            "phone",
            "date",
            "time",
            "guests",
            "message",
        )

        widgets = {

            "name": forms.TextInput(
                attrs={
                    "placeholder": "Your Full Name",
                }
            ),

            "email": forms.EmailInput(
                attrs={
                    "placeholder": "Your Email Address",
                }
            ),

            "phone": forms.TextInput(
                attrs={
                    "placeholder": "Your Phone Number",
                }
            ),

            "date": forms.DateInput(
                attrs={
                    "type": "date",
                }
            ),

            "time": forms.TimeInput(
                attrs={
                    "type": "time",
                }
            ),

            "guests": forms.NumberInput(
                attrs={
                    "min": 1,
                    "max": 20,
                    "placeholder": "Number of Guests",
                }
            ),

            "message": forms.Textarea(
                attrs={
                    "placeholder": "Any special requests?",
                    "rows": 5,
                }
            ),
        }

    def clean_date(self):

        reservation_date = self.cleaned_data["date"]

        if reservation_date < date.today():

            raise forms.ValidationError(
                "Reservation date cannot be in the past."
            )

        return reservation_date

    def clean_time(self):

        reservation_time = self.cleaned_data["time"]

        opening_time = time(11, 0)
        closing_time = time(23, 0)

        if not (
            opening_time
            <= reservation_time
            <= closing_time
        ):

            raise forms.ValidationError(
                "Reservations are available between 11:00 AM and 11:00 PM."
            )

        return reservation_time

    def clean_guests(self):

        guests = self.cleaned_data["guests"]

        if guests < 1:

            raise forms.ValidationError(
                "At least one guest is required."
            )

        if guests > 20:

            raise forms.ValidationError(
                "Reservations are limited to 20 guests."
            )

        return guests