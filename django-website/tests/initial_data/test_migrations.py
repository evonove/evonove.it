import pytest
from home.models import HomePage
from wagtail.core.models import Page


@pytest.mark.django_db
class TestMigration:
    def test_initial_data(self):
        """
        Alice is a developer that runs the initial migrations. During the process
        the WagTail core is bootstrapped and a new home page is created.
        The initial migration process should create a customized home page.
            - Schema migration occur
            - The default WagTail home page should be deleted
            - A customized HomePage should be created
        """
        default_homepage = Page.objects.filter(id=2)
        homepage = HomePage.objects.filter(slug="home")

        assert default_homepage.count() == 0
        assert homepage.count() == 1
