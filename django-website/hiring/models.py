from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import ugettext_lazy as _

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField

from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel


class HiringPage(Page):
    linked_data = JSONField(null=True, blank=True, help_text=_('Linked Data in JSON'))
    description = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('description'),

        MultiFieldPanel(
            [
                InlinePanel('jobs', label=_('Job')),
            ],
            heading=_('Available positions'),
        ),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('linked_data'),
    ]


class Job(Orderable):
    page = ParentalKey(HiringPage, related_name='jobs')
    position = models.CharField(max_length=200, blank=True)
    description = RichTextField(blank=True)
