from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext as _

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel

from core.models import BaseModel
from portfolio.models import Project


class HomePage(BaseModel):
    linked_data = JSONField(null=True, blank=True, help_text=_('Linked Data in JSON'))
    payoff = RichTextField(blank=True, help_text=_('Home intro'))

    content_panels = Page.content_panels + [
        FieldPanel('payoff'),
        MultiFieldPanel(
            [
                FieldPanel('section_title'),
                FieldPanel('section_subtitle'),
            ],
            heading=_('Section Text')
        ),
        MultiFieldPanel(
            [
                InlinePanel('services', label=_('Services')),
            ],
            heading=_('What we do'),
            classname='collapsible',
        ),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('linked_data'),
    ]

    def get_context(self, request):
        context = super(HomePage, self).get_context(request)
        context['projects'] = Project.objects.filter(show_in_home=True)
        return context


class Service(Orderable):
    page = ParentalKey(HomePage, related_name='services')
    title = models.CharField(max_length=150, default='')
    description = models.TextField(max_length=600)

    panels = [
        FieldPanel('title'),
        FieldPanel('description'),
    ]
