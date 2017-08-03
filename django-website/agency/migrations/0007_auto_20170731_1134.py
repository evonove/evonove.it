# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-31 11:34
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('agency', '0006_auto_20170727_1346'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stack',
            name='category',
        ),
        migrations.AddField(
            model_name='agencypage',
            name='stack_subtitle',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
    ]