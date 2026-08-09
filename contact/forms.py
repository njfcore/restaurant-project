from django import forms

from .models import ContactMessage


class ContactForm(forms.ModelForm):

    class Meta:

        model = ContactMessage

        fields = (
            "name",
            "email",
            "phone",
            "subject",
            "message",
        )

        widgets = {

            "name": forms.TextInput(
                attrs={
                    "class": "form__input",
                    "placeholder": "Your Full Name",
                }
            ),

            "email": forms.EmailInput(
                attrs={
                    "class": "form__input",
                    "placeholder": "Your Email Address",
                }
            ),

            "phone": forms.TextInput(
                attrs={
                    "class": "form__input",
                    "placeholder": "Your Phone Number",
                }
            ),

            "subject": forms.TextInput(
                attrs={
                    "class": "form__input",
                    "placeholder": "How can we help?",
                }
            ),

            "message": forms.Textarea(
                attrs={
                    "class": "form__textarea",
                    "placeholder": "Write your message...",
                    "rows": 6,
                }
            ),
        }

    def clean_name(self):

        name = self.cleaned_data["name"].strip()

        if len(name) < 2:

            raise forms.ValidationError(
                "Please enter a valid name."
            )

        return name

    def clean_subject(self):

        subject = self.cleaned_data["subject"].strip()

        if len(subject) < 3:

            raise forms.ValidationError(
                "Subject must contain at least 3 characters."
            )

        return subject

    def clean_message(self):

        message = self.cleaned_data["message"].strip()

        if len(message) < 10:

            raise forms.ValidationError(
                "Message must contain at least 10 characters."
            )

        return message