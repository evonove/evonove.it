from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import ugettext_lazy as _

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField

from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel, MultiFieldPanel

from core.models import BaseModel


class HiringPage(BaseModel):
    linked_data = JSONField(null=True, blank=True, help_text=_('Linked Data in JSON'))
    intro = RichTextField(blank=True)
    outro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel('section_title'),
                FieldPanel('section_subtitle'),
            ],
            heading=_('Careers')
        ),

        FieldPanel('intro'),
        FieldPanel('outro'),

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
    requirements = RichTextField(blank=True)
    responsibilities = RichTextField(blank=True)
