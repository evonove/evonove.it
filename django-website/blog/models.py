from django.db import models
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.utils.translation import ugettext as _

from modelcluster.fields import ParentalKey
from modelcluster.contrib.taggit import ClusterTaggableManager

from taggit.models import TaggedItemBase

from wagtail.wagtailsearch import index
from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel

from .fields import BlogPageStreamBlock


class BlogIndexPage(Page):
    @property
    def articles(self):
        """
        Returns a queryset of live blog articles, ordered from the most recent
        """
        articles = BlogPage.objects.live().descendant_of(self)
        articles = articles.order_by('-date')

        return articles

    def get_context(self, request):
        """
        Populates the context with a paginated articles list.
        They are filtered using the querystring; available filters are:
            - tag: fetch articles for the chosen tag
            - page: fetch a list of articles for the selected page number
        """
        articles = self.articles

        # Filtering by tag
        tag = request.GET.get('tag')
        if tag:
            articles = articles.filter(tags__name=tag)

        # Pagination
        page = request.GET.get('page')
        paginator = Paginator(articles, 10)
        try:
            articles = paginator.page(page)
        except PageNotAnInteger:
            articles = paginator.page(1)
        except EmptyPage:
            articles = paginator.page(paginator.num_pages)

        # Updating the template context
        context = super().get_context(request)
        context['articles'] = articles
        return context


class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey('BlogPage', related_name='tagged_items')


class BlogPage(Page):
    cover = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    body = StreamField(BlogPageStreamBlock())
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)
    date = models.DateField(_('Post date'))

    search_fields = Page.search_fields + (
        index.SearchField('body'),
    )

    content_panels = Page.content_panels + [
        ImageChooserPanel('cover'),
        FieldPanel('tags'),
        StreamFieldPanel('body'),
        FieldPanel('date'),
    ]
