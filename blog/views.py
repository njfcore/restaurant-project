from django.shortcuts import get_object_or_404, render

from .models import BlogCategory, Post


def blog_view(request):

    categories = BlogCategory.objects.filter(
        is_active=True,
    ).order_by(
        "display_order",
        "name",
    )

    posts = Post.objects.filter(
        is_published=True,
    ).select_related(
        "category",
    ).order_by(
        "-published_at",
        "-created_at",
    )


    # =====================================
    # CATEGORY FILTER
    # =====================================

    category_slug = request.GET.get("category")

    if category_slug:

        posts = posts.filter(
            category__slug=category_slug,
            category__is_active=True,
        )


    context = {
        "categories": categories,
        "posts": posts,
    }

    return render(
        request,
        "pages/blog.html",
        context,
    )


def post_detail_view(request, slug):

    post = get_object_or_404(
        Post.objects.select_related("category"),
        slug=slug,
        is_published=True,
    )

    context = {
        "post": post,
    }

    return render(
        request,
        "pages/blog_detail.html",
        context,
    )