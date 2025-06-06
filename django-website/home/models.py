from agency.models import AgencyPage, Service
from core.models import BaseModel
from django.db import models
from django.utils.translation import gettext as _
from modelcluster.fields import ParentalKey
from portfolio.models import Project
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.fields import RichTextField
from wagtail.images.models import Image
from wagtail.models import Orderable, Page


class HomePage(BaseModel):
    payoff = RichTextField(blank=True, help_text=_("Home intro"))

    partner_title = RichTextField(blank=True)
    partner_subtitle = RichTextField(blank=True)

    works_title = RichTextField(blank=True)
    works_subtitle = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("payoff"),
        MultiFieldPanel(
            [
                FieldPanel("section_title"),
                FieldPanel("section_subtitle"),
            ],
            heading=_("Services"),
        ),
        MultiFieldPanel(
            [
                FieldPanel("works_title"),
                FieldPanel("works_subtitle"),
            ],
            heading=_("Works"),
        ),
        MultiFieldPanel(
            [
                FieldPanel("partner_title"),
                FieldPanel("partner_subtitle"),
                InlinePanel("partners", label=_("Partner")),
            ],
            heading=_("Partners"),
        ),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel("linked_data"),
    ]

    def get_context(self, request):
        context = super().get_context(request)
        context["projects"] = Project.objects.filter(show_in_home=True)
        context["services"] = Service.objects.all()
        context["services_contact"] = AgencyPage.objects.live().first().services_contact
        return context


class Partner(Orderable):
    page = ParentalKey(HomePage, related_name="partners")
    image = models.ForeignKey(
        Image, null=True, blank=True, on_delete=models.SET_NULL, related_name="+"
    )

    panels = [
        FieldPanel("image"),
    ]
