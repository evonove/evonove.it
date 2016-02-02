# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations


def load_blog_index(apps, schema_editor):
    # Get models
    ContentType = apps.get_model('contenttypes.ContentType')
    BlogIndexPage = apps.get_model('blog', 'BlogIndexPage')

    # Create content type for the BlogIndexPage model
    blog_content_type, created = ContentType.objects.get_or_create(
        model='blogindexpage', app_label='blog')

    # Create a new blog index page
    BlogIndexPage.objects.create(
        title="Blog",
        slug='blog',
        content_type=blog_content_type,
        path='000100010001',
        depth=3,
        numchild=0,
        url_path='/home/blog',
    )


def unload_blog_index(apps, schema_editor):
    BlogIndexPage = apps.get_model('blog', 'BlogIndexPage')
    ContentType = apps.get_model('contenttypes.ContentType')

    try:
        BlogIndexPage.objects.get(slug='blog').delete()
    except BlogIndexPage.DoesNotExist:
        pass

    try:
        ContentType.objects.get(model='blogindexpage').delete()
    except ContentType.DoesNotExist:
        pass


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_blog_index, reverse_code=unload_blog_index),
    ]
