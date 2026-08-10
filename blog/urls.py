from django.urls import path

from .views import blog_view, post_detail_view


app_name = "blog"


urlpatterns = [

    path("", blog_view, name="blog"),
    path("<slug:slug>/", post_detail_view, name="post_detail"),

]