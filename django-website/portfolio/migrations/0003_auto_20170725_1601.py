# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-25 16:01
from __future__ import unicode_literals

from django.db import migrations
import wagtail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_project'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfoliopage',
            name='section_subtitle',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='portfoliopage',
            name='section_title',
            field=wagtail.fields.RichTextField(blank=True),
        ),
    ]
