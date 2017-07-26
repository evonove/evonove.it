from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class BaseModel(Page):
    section_title = RichTextField(blank=True)
    section_subtitle = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('section_title'),
        FieldPanel('section_subtitle'),
    ]

    class Meta:
        abstract = True
