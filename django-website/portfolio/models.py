from core.models import BaseModel
from django.db import models
from django.utils.translation import gettext as _
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.fields import RichTextField
from wagtail.images.models import Image
from wagtail.models import Orderable, Page


class PortfolioPage(BaseModel):
    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("section_title"),
                FieldPanel("section_subtitle"),
                InlinePanel("projects", label=_("projects")),
            ],
            heading=_("Works"),
        ),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel("linked_data"),
    ]


class Project(Orderable):
    page = ParentalKey(PortfolioPage, related_name="projects")
    name = models.CharField(max_length=150)
    category = models.CharField(max_length=100, default="", blank=True)
    description = RichTextField()
    image = models.ForeignKey(Image, on_delete=models.CASCADE, related_name="+")
    link = models.URLField(help_text=_("Project link"), null=True, blank=True)

    # make the project visible in the homepage
    show_in_home = models.BooleanField(default=False)

    panels = [
        FieldPanel("name"),
        FieldPanel("image"),
        FieldPanel("link"),
        FieldPanel("category"),
        FieldPanel("description"),
        FieldPanel("show_in_home"),
    ]
