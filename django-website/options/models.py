from django.db import models
from django.utils.translation import gettext as _
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from wagtail.fields import RichTextField


@register_setting
class WebsiteSettings(BaseSiteSetting):
    name = models.CharField(max_length=255, help_text=_("Your company name"))
    address = RichTextField(help_text=_("Your company address"))
    email = models.EmailField(max_length=255, help_text=_("Your company email address"))
    phone = models.CharField(max_length=16, help_text=_("Your company phone number"))
    vat = models.CharField(
        max_length=16,
        help_text=_("Your company VAT with initial state code (i.e.: GB)"),
    )

    github = models.URLField(help_text=_("Your GitHub page URL"))
    twitter = models.URLField(help_text=_("Your Twitter page URL"))
    facebook = models.URLField(help_text=_("Your Facebook page URL"))

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("name"),
                FieldPanel("email"),
                FieldPanel("phone"),
                FieldPanel("address"),
                FieldPanel("vat"),
            ],
            heading="Company information",
            classname="collapsible",
        ),
        MultiFieldPanel(
            [
                FieldPanel("github"),
                FieldPanel("twitter"),
                FieldPanel("facebook"),
            ],
            heading="Social media",
            classname="collapsible",
        ),
    ]


@register_setting
class AnalyticsSettings(BaseSiteSetting):
    google_analytics = models.CharField(
        max_length=15, help_text=_("Google Analytics tracking ID")
    )
