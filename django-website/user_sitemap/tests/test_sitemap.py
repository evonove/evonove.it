from datetime import datetime

from agency.models import AgencyPage
from blog.models import BlogPage, Post
from contacts.models import ContactsPage
from portfolio.models import PortfolioPage
from wagtail.models import Page, Site
from wagtail.test.utils import WagtailPageTests, WagtailTestUtils


class TestUserSitemap(WagtailPageTests, WagtailTestUtils):
    def setUp(self):
        self.site = Site.objects.get(is_default_site=True)

    def test_user_sitemap(self):
        homepage = Page.objects.get(url_path="/home/")
        blog = BlogPage(title="blog", slug="blog", depth=1, path="00034")
        agency = AgencyPage(title="Agency", slug="agency")
        contacts = ContactsPage(title="Contacts", slug="contacts")
        portfolio = PortfolioPage(title="Portfolio", slug="portfolio")

        homepage.add_child(instance=agency)
        homepage.add_child(instance=contacts)
        homepage.add_child(instance=portfolio)
        homepage.add_child(instance=blog)

        post_1 = Post(
            title="post_1",
            intro="Post 1 Intro",
            slug="post_1",
            date=datetime(2017, 1, 1),
        )
        post_2 = Post(
            title="post 2",
            intro="Post 2 Intro",
            slug="post_2",
            date=datetime(2017, 1, 1),
        )

        blog.add_child(instance=post_1)
        blog.add_child(instance=post_2)

        response = self.client.get("/sitemap.html")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context["live_pages"]), 5)
