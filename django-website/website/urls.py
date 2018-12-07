from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from django.views.generic import TemplateView

from wagtail.contrib.sitemaps.views import sitemap
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls

from robots.views import RobotsView
from user_sitemap.views import UserSitemapView


urlpatterns = []

if settings.DEBUG:
    urlpatterns += [
        url(r'^404/$', TemplateView.as_view(template_name='404.html')),
        url(r'^500/$', TemplateView.as_view(template_name='500.html')),
    ]

urlpatterns += [
    url(r'^django-admin/', admin.site.urls),
    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^sitemap\.xml$', sitemap),
    url(r'^robots\.txt$', RobotsView.as_view()),
    url(r'^sitemap\.html$', UserSitemapView.as_view()),
    url(r'', include(wagtail_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
