import pytest

from django.core.management import call_command

from wagtail.wagtailcore.models import Page, Site
from wagtail.wagtailimages.models import Image

from options.models import WebsiteSettings

from home.models import HomePage, Service, Work, TeamMember

from blog.models import BlogPage


@pytest.mark.django_db
class TestInitialLoad:
    def test_initial_load(self):
        """
        Alice is a developer that wants a blog page for her website. During the initial
        process the WagTail core bootstrapped and a new homepage without the blog index
        page. For this reason, she launches the 'create_blog_page' command.
            - The blog page should be created as a child of the site homepage
        """
        # the blog page is not created through migrations
        assert BlogPage.objects.count() == 0

        # the blog page is created
        call_command('create_blog_page')
        assert BlogPage.objects.count() == 1

        # and is child of the homepage
        blog = Page.objects.get(slug='blog')
        homepage = HomePage.objects.get(slug='home')
        assert blog in homepage.get_children()

    def test_load_test_data(self):
        """
        Alice is a developer that wants to update JavaScript and CSS code but unforunately
        she blames the absence of initial data. Indeed, many styles are available only if
        services, works, and the team is loaded. For this reason, she launches the
        'load_test_data' command.
        """
        # a real Dunder Muffline company is created!
        call_command('load_test_data')

        # grabbing default settings
        homepage = HomePage.objects.get(slug="home")
        current_site = Site.objects.get(root_page=homepage)
        website_settings = WebsiteSettings.for_site(current_site)

        # asserting that a real company is available
        assert website_settings.name is not None
        assert website_settings.email is not None
        assert website_settings.phone is not None
        assert website_settings.vat is not None
        assert website_settings.github is not None
        assert website_settings.twitter is not None
        assert website_settings.facebook is not None

        # placeholder images should be available
        assert Image.objects.count() == 2

        # and so services, works and team members
        assert Service.objects.count() == 3
        assert Work.objects.count() == 3
        assert TeamMember.objects.count() == 10
