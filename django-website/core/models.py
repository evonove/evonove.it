from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext as _

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel


class BaseModel(Page):
    # core fields
    section_title = RichTextField(blank=True)
    section_subtitle = RichTextField(blank=True)

    # seo field
    linked_data = JSONField(null=True, blank=True, help_text=_("Linked Data in JSON"))

    content_panels = Page.content_panels + [
        FieldPanel("section_title"),
        FieldPanel("section_subtitle"),
    ]

    promote_panels = Page.promote_panels + [FieldPanel("linked_data")]

    class Meta:
        abstract = True
