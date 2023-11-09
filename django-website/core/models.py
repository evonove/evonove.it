from django.db import models
from django.utils.translation import gettext as _
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from wagtail.models import Page


class BaseModel(Page):
    # core fields
    section_title = RichTextField(blank=True)
    section_subtitle = RichTextField(blank=True)

    # seo field
    linked_data = models.JSONField(
        null=True, blank=True, help_text=_("Linked Data in JSON")
    )

    content_panels = Page.content_panels + [
        FieldPanel("section_title"),
        FieldPanel("section_subtitle"),
    ]

    promote_panels = Page.promote_panels + [FieldPanel("linked_data")]

    class Meta:
        abstract = True
