# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations


def load_homepage(apps, schema_editor):
    # Get models
    ContentType = apps.get_model('contenttypes', 'ContentType')
    Page = apps.get_model('wagtailcore', 'Page')
    Site = apps.get_model('wagtailcore', 'Site')
    HomePage = apps.get_model('home', 'HomePage')

    # Delete the default homepage (if any)
    try:
        Page.objects.get(id=2).delete()
    except Page.DoesNotExist:
        pass

    # Create content type for homepage model
    homepage_content_type, created = ContentType.objects.get_or_create(
        model='homepage', app_label='home')

    # Create a new homepage
    homepage = HomePage.objects.create(
        title="Homepage",
        slug='home',
        content_type=homepage_content_type,
        path='00010001',
        depth=2,
        numchild=0,
        url_path='/home/',
    )

    # Create a site with the new homepage set as the root
    Site.objects.create(
        hostname='localhost', root_page=homepage, is_default_site=True)


def unload_homepage(apps, schema_editor):
    HomePage = apps.get_model('home', 'HomePage')
    ContentType = apps.get_model('contenttypes.ContentType')

    try:
        HomePage.objects.get(slug='home').delete()
    except HomePage.DoesNotExist:
        pass

    try:
        ContentType.objects.get(model='homepage').delete()
    except ContentType.DoesNotExist:
        pass


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_homepage, reverse_code=unload_homepage),
    ]
