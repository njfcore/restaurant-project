from django.contrib import admin
from django.utils.html import format_html

from common.admin import admin_site

from .models import BlogCategory, Post



class BlogCategoryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "slug",
        "is_active",
        "display_order",
        "created_at",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "name",
        "description",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }

    ordering = (
        "display_order",
        "name",
    )



class PostAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "category",
        "author",
        "is_published",
        "published_at",
        "image_preview",
    )

    list_filter = (
        "is_published",
        "category",
        "published_at",
    )

    search_fields = (
        "title",
        "excerpt",
        "content",
        "author",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    autocomplete_fields = (
        "category",
    )

    readonly_fields = (
        "image_preview",
    )

    fieldsets = (
        (
            "Post Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "category",
                    "author",
                )
            },
        ),
        (
            "Content",
            {
                "fields": (
                    "excerpt",
                    "content",
                )
            },
        ),
        (
            "Featured Image",
            {
                "fields": (
                    "image",
                    "image_preview",
                )
            },
        ),
        (
            "Publishing",
            {
                "fields": (
                    "is_published",
                    "published_at",
                )
            },
        ),
    )

    ordering = (
        "-published_at",
        "-created_at",
    )

    @admin.display(
        description="Image"
    )
    def image_preview(self, obj):

        if obj.image:

            return format_html(
                '<img src="{}" width="80" height="55" '
                'style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url,
            )

        return "No Image"

admin_site.register(
    Post,
    PostAdmin
)  

admin_site.register(
    BlogCategory,
    BlogCategoryAdmin
)  
