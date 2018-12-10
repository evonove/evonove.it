from datetime import datetime

from wagtail.tests.utils import WagtailPageTests, WagtailTestUtils
from wagtail.core.models import Page, Site

from blog.models import BlogPage, Post


class TestUserSitemap(WagtailPageTests, WagtailTestUtils):
    def setUp(self):
        self.site = Site.objects.get(is_default_site=True)

    def test_blog_page_render(self):
        """
        There used to be an error during the rendering due to updates.
        Before the check this test would have failed
        """
        homepage = Page.objects.get(url_path='/home/')
        blog = BlogPage(title='blog', slug='blog', depth=1, path='00034')
        homepage.add_child(instance=blog)
        post_1 = Post(title='post_1', intro='Post 1 Intro', slug='post_1', date=datetime(2017, 1, 1))
        post_2 = Post(title='post 2', intro='Post 2 Intro', slug='post_2', date=datetime(2017, 1, 1))
        blog.add_child(instance=post_1)
        blog.add_child(instance=post_2)
        response = self.client.get('/blog/post_1/')
        self.assertEqual(response.status_code, 200)
