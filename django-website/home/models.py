from django.db import models
from django.utils.translation import ugettext as _

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailadmin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel


class HomePage(Page):
    content_panels = Page.content_panels + [
        InlinePanel('services', label=_('What we do')),
    ]


class Service(Orderable):
    page = ParentalKey(HomePage, related_name='services')
    slogan = models.CharField(max_length=100)
    technologies = models.CharField(max_length=100)
    description = models.TextField(max_length=600)

    panels = [
        FieldPanel('slogan'),
        FieldPanel('technologies'),
        FieldPanel('description'),
    ]
