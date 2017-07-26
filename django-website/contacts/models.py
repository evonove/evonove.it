from django.db import models
from django.utils.translation import ugettext as _

from wagtail.wagtailcore.models import Page
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class ContactsPage(Page):
    job_email = models.EmailField(max_length=255, null=True, blank=True, help_text=_('job email address'))

    content_panels = Page.content_panels + [
        FieldPanel('job_email'),
    ]
