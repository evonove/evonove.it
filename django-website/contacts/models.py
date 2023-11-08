from core.models import BaseModel
from django.db import models
from django.utils.translation import ugettext as _
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.models import Page


class ContactsPage(BaseModel):
    job_email = models.EmailField(
        max_length=255, null=True, blank=True, help_text=_("job email address")
    )

    content_panels = Page.content_panels + [
        FieldPanel("section_title"),
        FieldPanel("job_email"),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel("linked_data"),
    ]
