from django.shortcuts import render
from menu.models import Category

def home_view(request):
    categories = Category.objects.filter(is_active=True).order_by('display_order', 'name')
    return render(request, "home/home.html", {"categories": categories})
