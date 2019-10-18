from django.db import models
from django.conf import settings
from django.utils.translation import ugettext as _

from modelcluster.fields import ParentalKey

from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.images.models import Image
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel

from core.models import BaseModel


class AgencyPage(BaseModel):
    description = RichTextField(blank=True)

    project = RichTextField(blank=True)
    project_description = RichTextField(blank=True)
    project_link = models.URLField(help_text=_('Your website page URL'), null=True, blank=True)
    project_category = RichTextField(blank=True)

    services_title = RichTextField(blank=True)
    services_subtitle = RichTextField(blank=True)
    services_contact = RichTextField(blank=True)

    expertise_title = RichTextField(blank=True)
    expertise_subtitle = RichTextField(blank=True)
    expertise_description = RichTextField(blank=True)

    stack_subtitle = RichTextField(blank=True)
    stack_description = RichTextField(blank=True)

    team_title = RichTextField(blank=True)
    team_subtitle = RichTextField(blank=True)

    image = models.ForeignKey(
        Image,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel('section_title'),
                FieldPanel('section_subtitle'),
                FieldPanel('description'),
                ImageChooserPanel('image'),
            ],
            heading=_('Bio')
        ),

        MultiFieldPanel(
            [
                FieldPanel('services_title'),
                FieldPanel('services_subtitle'),
                FieldPanel('services_contact'),
                InlinePanel('services', label=_('Services')),
            ],
            heading=_('Services'),
        ),

        MultiFieldPanel(
            [
                FieldPanel('expertise_title'),
                FieldPanel('expertise_subtitle'),
                FieldPanel('expertise_description'),
            ],
            heading=_('Expertise'),
        ),

        MultiFieldPanel(
            [
                FieldPanel('project'),
                FieldPanel('project_category'),
                FieldPanel('project_description'),
                FieldPanel('project_link'),
            ],
            heading=_('Open Source Project')
        ),

        MultiFieldPanel(
            [
                FieldPanel('stack_subtitle'),
                FieldPanel('stack_description'),
                InlinePanel('stack', label=_('Stack')),
            ],
            heading=_('Stack'),
        ),

        MultiFieldPanel(
            [
                FieldPanel('team_title'),
                FieldPanel('team_subtitle'),
                InlinePanel('team', label=_('Team Member')),
            ],
            heading=_('Team'),
            classname='collapsible',
        ),

    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('linked_data'),
    ]


class TeamMember(Orderable):
    page = ParentalKey(AgencyPage, related_name='team')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, blank=True,
                                related_name='team_profile', on_delete=models.CASCADE)

    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    role = models.CharField(max_length=150, help_text=_('Team member company role'))
    gravatar = models.CharField(max_length=150, help_text=_('Add your Gravatar email'), null=True, blank=True)
    photo = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True, related_name='+')

    website = models.URLField(help_text=_('Your website page URL'), null=True, blank=True)
    github = models.URLField(help_text=_('Your GitHub page URL'), null=True, blank=True)
    twitter = models.URLField(help_text=_('Your Twitter page URL'), null=True, blank=True)
    gplus = models.URLField(help_text=_('Your Google+ page URL'), null=True, blank=True)
    facebook = models.URLField(help_text=_('Your Facebook page URL'), null=True, blank=True)
    linkedin = models.URLField(help_text=_('Your LinkedIn page URL'), null=True, blank=True)

    medium = models.URLField(help_text=_('Your Medium page URL'), null=True, blank=True)
    behance = models.URLField(help_text=_('Your Behance page URL'), null=True, blank=True)
    dribbble = models.URLField(help_text=_('Your Dribble page URL'), null=True, blank=True)

    @property
    def full_name(self):
        return '{} {}'.format(self.firstname, self.lastname)

    panels = [
        FieldPanel('user'),

        FieldPanel('firstname'),
        FieldPanel('lastname'),
        FieldPanel('role'),
        FieldPanel('gravatar'),
        ImageChooserPanel('photo'),

        FieldPanel('website'),
        FieldPanel('github'),
        FieldPanel('twitter'),
        FieldPanel('gplus'),
        FieldPanel('facebook'),
        FieldPanel('linkedin'),

        FieldPanel('medium'),
        FieldPanel('behance'),
        FieldPanel('dribbble'),
    ]


class Service(Orderable):
    page = ParentalKey(AgencyPage, related_name='services')
    title = models.CharField(max_length=150, default='')
    description = RichTextField()

    panels = [
        FieldPanel('title'),
        FieldPanel('description'),
    ]


class Stack(Orderable):
    page = ParentalKey(AgencyPage, related_name='stack')
    stack = RichTextField(blank=True)

    panels = [
        FieldPanel('stack'),
    ]
