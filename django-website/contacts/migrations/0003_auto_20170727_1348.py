# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-27 13:48
from __future__ import unicode_literals

from django.db import migrations
import wagtail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0002_contactspage_job_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactspage',
            name='section_subtitle',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='contactspage',
            name='section_title',
            field=wagtail.fields.RichTextField(blank=True),
        ),
    ]
