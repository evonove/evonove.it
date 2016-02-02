import pytest

from wagtail.wagtailcore.models import Page

from home.models import HomePage
from blog.models import BlogIndexPage


@pytest.mark.django_db
class TestMigration:
    def test_initial_data(self):
        """
        Alice is a developer that runs the initial migrations. During the process
        the WagTail core is bootstrapped and a new home page is created.
        The initial migration process should createa customized home page and a
        blog index page.
            - Schema and migrations occur
            - The default WagTail home page should be deleted
            - A customized HomePage should be created
            - A customized BlogIndexPage should be created
        """
        default_homepage = Page.objects.filter(id=2)
        homepage = HomePage.objects.filter(slug='home')
        blog = BlogIndexPage.objects.filter(slug='blog')

        assert default_homepage.count() == 0
        assert homepage.count() == 1
        assert blog.count() == 1
