from django.db import transaction
from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand, CommandError
from django.contrib.contenttypes.models import ContentType

from home.models import HomePage
from blog.models import BlogPage


class Command(BaseCommand):
    help = 'Creates the initial blog page to the root homepage'

    @transaction.atomic
    def handle(self, *args, **options):
        try:
            homepage = HomePage.objects.get(slug='home')
        except HomePage.DoesNotExist:
            raise CommandError('The Homepage does not exist. Be sure to run the first migration.')

        # creating the blog page instance
        content_type, _ = ContentType.objects.get_or_create(model='blogpage', app_label='blog')

        blog = BlogPage(
            content_type=content_type,
            title='Blog',
            slug='blog',
            path='000100010001',
            depth=3,
        )

        # linking the blog page with the Homepage
        try:
            homepage.add_child(instance=blog)
            self.stdout.write(self.style.SUCCESS('Blog index page created!'))
        except ValidationError:
            self.stdout.write('Blog index page already exists; nothing to do')
