from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin

from wagtail.contrib.wagtailsitemaps.views import sitemap
from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtailcore import urls as wagtail_urls


urlpatterns = [
    url(r'^django-admin/', include(admin.site.urls)),
    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^sitemap\.xml$', sitemap),
    url(r'', include(wagtail_urls)),
]
