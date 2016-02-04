from django.core.management.base import BaseCommand, CommandError
from django.contrib.contenttypes.models import ContentType

from home.models import HomePage
from blog.models import BlogPage


class Command(BaseCommand):
    help = 'Creates the initial blog page to the root homepage'

    def handle(self, *args, **options):
        try:
            homepage = HomePage.objects.get(slug='home')
        except HomePage.DoesNotExist:
            raise CommandError('The Homepage does not exist. Be sure to run the first migration.')

        # creating the blog page instance
        blog_content_type, created = ContentType.objects.get_or_create(model='blogindexpage', app_label='blog')

        blog = BlogPage(
            title="Blog",
            slug='blog',
            content_type=blog_content_type,
        )

        # linking the blog page with the Homepage
        homepage.add_child(instance=blog)
