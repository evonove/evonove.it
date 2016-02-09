import pytest

from django.core.management import call_command

from wagtail.wagtailcore.models import Page

from home.models import HomePage
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
