from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext as _

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailimages.models import Image
from wagtail.wagtailadmin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel

from core.models import BaseModel
from portfolio.models import Project
from agency.models import Service


class HomePage(BaseModel):
    linked_data = JSONField(null=True, blank=True, help_text=_('Linked Data in JSON'))
    payoff = RichTextField(blank=True, help_text=_('Home intro'))

    partner_title = RichTextField(blank=True)
    partner_subtitle = RichTextField(blank=True)

    works_title = RichTextField(blank=True)
    works_subtitle = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('payoff'),

        MultiFieldPanel(
            [
                FieldPanel('section_title'),
                FieldPanel('section_subtitle'),
            ],
            heading=_('Bio')
        ),

        MultiFieldPanel(
            [
                FieldPanel('works_title'),
                FieldPanel('works_subtitle'),
            ],
            heading=_('Works')
        ),

        MultiFieldPanel(
            [
                FieldPanel('partner_title'),
                FieldPanel('partner_subtitle'),
                InlinePanel('partners', label=_('Partner')),
            ],
            heading=_('Partners'),
        ),

    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('linked_data'),
    ]

    def get_context(self, request):
        context = super(HomePage, self).get_context(request)
        context['projects'] = Project.objects.filter(show_in_home=True)
        context['services'] = Service.objects.all()
        return context


class Partner(Orderable):
    page = ParentalKey(HomePage, related_name='partners')
    image = models.ForeignKey(
        Image,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        ImageChooserPanel('image'),
    ]
