from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import StreamField

from wagtail.wagtailsearch import index
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel

from blog.fields import PostStreamBlock


class HiringPage(Page):
    body = StreamField(PostStreamBlock())

    search_fields = Page.search_fields + (
        index.SearchField('body'),
    )

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]
