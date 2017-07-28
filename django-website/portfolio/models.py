from django.db import models
from django.utils.translation import ugettext as _

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailimages.models import Image
from wagtail.wagtailadmin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel

from core.models import BaseModel


class PortfolioPage(BaseModel):
    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel('section_title'),
                FieldPanel('section_subtitle'),
                InlinePanel('projects', label=_('projects')),
            ],
            heading=_('Works')
        ),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('linked_data'),
    ]


class Project(Orderable):
    page = ParentalKey(PortfolioPage, related_name='projects')
    name = models.CharField(max_length=150)
    category = models.CharField(max_length=100, default='', blank=True)
    description = models.TextField(max_length=1000)
    image = models.ForeignKey(Image, related_name='+')
    link = models.URLField(help_text=_('Project link'), null=True, blank=True)

    # make the project visible in the homepage
    show_in_home = models.BooleanField(default=False)

    panels = [
        FieldPanel('name'),
        ImageChooserPanel('image'),
        FieldPanel('link'),
        FieldPanel('category'),
        FieldPanel('description'),
        FieldPanel('show_in_home'),
    ]
