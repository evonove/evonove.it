import pytest

from django.core.management import call_command

from wagtail.wagtailcore.models import Page

from blog.models import BlogIndexPage


@pytest.mark.django_db
class TestInitialLoad:
    def test_initial_load(self):
        """
        Alice is a developer that wants a blog page for her website. During the initial
        process the WagTail core bootstrapped and a new homepage without the blog index
        page. For this reason, she launches the 'create_blog_page' command.
            - The BlogIndexPage should be created as a child of the site homepage
        """
        assert BlogIndexPage.objects.count() == 0

        call_command('create_blog_page')
        assert BlogIndexPage.objects.count() == 1
