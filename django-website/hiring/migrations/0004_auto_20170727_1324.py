# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-27 13:24
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('hiring', '0003_auto_20170726_1058'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hiringpage',
            old_name='description',
            new_name='intro',
        ),
        migrations.AddField(
            model_name='hiringpage',
            name='section_subtitle',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='hiringpage',
            name='section_title',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
    ]