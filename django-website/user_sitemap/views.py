from django.views.generic import TemplateView
from wagtail.models import Page


class UserSitemapView(TemplateView):
    template_name = "user_sitemap.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        root_page = Page.objects.get(slug="root")
        blog_page = Page.objects.get(slug="blog")
        context["live_pages"] = (
            Page.objects.live().descendant_of(root_page).not_descendant_of(blog_page)
        )
        return context
