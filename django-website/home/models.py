from django.db import models
from django.utils.translation import ugettext as _

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailimages.models import Image
from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel


class HomePage(Page):
    content_panels = Page.content_panels + [
        InlinePanel('services', label=_('What we do')),
        InlinePanel('works', label=_('Our products')),
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


class Work(Orderable):
    page = ParentalKey(HomePage, related_name='works')
    name = models.CharField(max_length=150)
    description = models.TextField(max_length=1000)
    cover = models.ForeignKey(Image, related_name='+')

    panels = [
        FieldPanel('name'),
        FieldPanel('description'),
        ImageChooserPanel('cover'),
    ]
