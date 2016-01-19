from django.db import models
from django.utils.translation import ugettext as _

from wagtail.contrib.settings.models import BaseSetting, register_setting


@register_setting
class CompanySettings(BaseSetting):
    name = models.CharField(max_length=255, help_text=_('Your company name'))
    email = models.EmailField(max_length=255, help_text=_('Your company email address'))
    phone = models.CharField(max_length=16, help_text=_('Your company phone number'))
    vat = models.CharField(max_length=16, help_text=_('Your company VAT with initial state code (i.e.: GB)'))


@register_setting
class SocialMediaSettings(BaseSetting):
    github = models.URLField(help_text=_('Your GitHub page URL'))
    twitter = models.URLField(help_text=_('Your Twitter page URL'))
    facebook = models.URLField(help_text=_('Your Facebook page URL'))
