from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.db import models
from django.db.models import Q
from django.utils.translation import gettext as _
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey
from taggit.models import Tag, TaggedItemBase
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from wagtail.fields import RichTextField, StreamField
from wagtail.models import Page
from wagtail.search import index

from .fields import PostStreamBlock


class BlogPage(Page):
    blog_subtitle = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("blog_subtitle"),
    ]

    @property
    def articles(self):
        """
        Returns a queryset of live blog articles, ordered from the most recent
        """
        articles = Post.objects.live().descendant_of(self)
        articles = articles.order_by("-date")

        return articles

    @property
    def tags(self):
        """
        Returns a queryset of all available tag ordered by use
        """
        tags = Tag.objects.all()
        tags = tags.annotate(num_times=models.Count("blog_posttag_items"))
        tags = tags.order_by("-num_times")

        return tags

    def get_context(self, request):
        """
        Populates the context with a paginated articles list.
        They are filtered using the querystring; available filters are:
            - tag: fetch articles for the chosen tag
            - page: fetch a list of articles for the selected page number
        """
        articles = self.articles

        # Filtering by tag
        tag = request.GET.get("tag")
        if tag:
            articles = articles.filter(tags__name=tag)

        # Pagination, using the blog settings
        page = request.GET.get("page")
        page_number = BlogSettings.for_site(request.site).page_number
        paginator = Paginator(articles, page_number)
        try:
            articles = paginator.page(page)
        except PageNotAnInteger:
            articles = paginator.page(1)
        except EmptyPage:
            articles = paginator.page(paginator.num_pages)

        # Updating the template context
        context = super().get_context(request)
        context["articles"] = articles
        context["current_tag"] = tag
        return context


@register_setting
class BlogSettings(BaseSiteSetting):
    page_number = models.IntegerField(
        help_text=_(
            "The articles that are shown in the blog "
            "index page before using a paginator"
        ),
        default=5,
    )

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("page_number"),
            ],
            heading="Blog configuration",
            classname="collapsible",
        ),
    ]


class PostTag(TaggedItemBase):
    content_object = ParentalKey("Post", related_name="tagged_items")


class Post(Page):
    cover = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    body = StreamField(PostStreamBlock(), use_json_field=True)
    intro = models.TextField(max_length=600)
    tags = ClusterTaggableManager(through=PostTag, blank=True)
    date = models.DateField(_("Post date"))

    search_fields = Page.search_fields + [
        index.SearchField("body"),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("cover"),
        FieldPanel("tags"),
        FieldPanel("body"),
        FieldPanel("date"),
    ]

    def get_context(self, request):
        """
        filter the last 3 articles with at least one common tag
        """
        tags = self.tags.names()
        # filter articles by tags and exclude the current article
        query = Q(tags__name__in=tags) & ~Q(pk=self.pk)
        similar_articles = (
            Post.objects.live().filter(query).distinct().order_by("-date")
        )
        context = super().get_context(request)
        context["similar_articles"] = similar_articles[:3]
        return context
