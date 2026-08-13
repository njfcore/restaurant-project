from django import forms

from .models import Order


class CheckoutForm(forms.Form):

    order_type = forms.ChoiceField(
        choices=Order.ORDER_TYPE_CHOICES,
        widget=forms.RadioSelect,
        label="Order Type",
    )

    phone = forms.CharField(
        max_length=20,
        label="Phone Number",
        widget=forms.TextInput(
            attrs={
                "placeholder": "Enter your phone number",
                "autocomplete": "tel",
            }
        ),
    )

    address = forms.CharField(
        required=False,
        label="Delivery Address",
        widget=forms.Textarea(
            attrs={
                "placeholder": "Enter your delivery address",
                "rows": 4,
            }
        ),
    )

    notes = forms.CharField(
        required=False,
        label="Order Notes",
        widget=forms.Textarea(
            attrs={
                "placeholder": "Any special requests? (Optional)",
                "rows": 3,
            }
        ),
    )

    def clean(self):
        cleaned_data = super().clean()

        order_type = cleaned_data.get("order_type")
        address = cleaned_data.get("address")

        if (
            order_type == Order.ORDER_TYPE_DELIVERY
            and not address
        ):
            self.add_error(
                "address",
                "Delivery address is required for delivery orders.",
            )

        return cleaned_data