from wagtail.tests.utils import WagtailPageTests, WagtailTestUtils
from wagtail.wagtailcore.models import Page, Site

from agency.models import AgencyPage
from contacts.models import ContactsPage
from portfolio.models import PortfolioPage


class TestUserSitemap(WagtailPageTests, WagtailTestUtils):
    def setUp(self):
        self.site = Site.objects.get(is_default_site=True)

    def test_user_sitemap(self):
        homepage = Page.objects.get(url_path='/home/')
        agency = AgencyPage(title='Agency', slug='agency')
        contacts = ContactsPage(title='Contacts', slug='contacts')
        portfolio = PortfolioPage(title='Portfolio', slug='portfolio')

        homepage.add_child(instance=agency)
        homepage.add_child(instance=contacts)
        homepage.add_child(instance=portfolio)

        response = self.client.get('/sitemap.html')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.context['live_pages']), 4)
