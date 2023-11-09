from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, re_path
from django.views.generic import TemplateView
from robots.views import RobotsView
from user_sitemap.views import UserSitemapView
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.contrib.sitemaps.views import sitemap

urlpatterns = []

if settings.DEBUG:
    urlpatterns += [
        re_path(r"^404/$", TemplateView.as_view(template_name="404.html")),
        re_path(r"^500/$", TemplateView.as_view(template_name="500.html")),
    ]

urlpatterns += [
    re_path(r"^django-admin/", admin.site.urls),
    re_path(r"^admin/", include(wagtailadmin_urls)),
    re_path(r"^sitemap\.xml$", sitemap),
    re_path(r"^robots\.txt$", RobotsView.as_view()),
    re_path(r"^sitemap\.html$", UserSitemapView.as_view()),
    re_path(r"", include(wagtail_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
