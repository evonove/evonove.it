from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext_lazy as _

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import StreamField

from wagtail.wagtailsearch import index
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel

from blog.fields import PostStreamBlock


class HiringPage(Page):
    body = StreamField(PostStreamBlock())
    linked_data = JSONField(null=True, blank=True, help_text=_('Linked Data in JSON'))

    search_fields = Page.search_fields + [
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('linked_data'),
    ]
