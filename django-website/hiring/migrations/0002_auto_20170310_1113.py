# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-10 11:13
from __future__ import unicode_literals

import blog.fields
import django.contrib.postgres.fields.jsonb
from django.db import migrations
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailembeds.blocks
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('hiring', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='hiringpage',
            name='linked_data',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, help_text='Linked Data in JSON', null=True),
        ),
        migrations.AlterField(
            model_name='hiringpage',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField((('h2', wagtail.wagtailcore.blocks.CharBlock(icon='title')), ('h3', wagtail.wagtailcore.blocks.CharBlock(icon='title')), ('paragraph', wagtail.wagtailcore.blocks.RichTextBlock(icon='pilcrow')), ('aligned_image', wagtail.wagtailcore.blocks.StructBlock((('image', wagtail.wagtailimages.blocks.ImageChooserBlock()), ('alignment', blog.fields.ImageFormatBlock()), ('caption', wagtail.wagtailcore.blocks.RichTextBlock(required=False))), icon='image', label='Aligned image')), ('youtube', wagtail.wagtailcore.blocks.StructBlock((('identifier', wagtail.wagtailembeds.blocks.EmbedBlock()),), icon='image')), ('pullquote', wagtail.wagtailcore.blocks.StructBlock((('quote', wagtail.wagtailcore.blocks.TextBlock(label='Quote title')), ('attribution', wagtail.wagtailcore.blocks.CharBlock())), icon='openquote')), ('code_snippet', wagtail.wagtailcore.blocks.StructBlock((('language', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[('python', 'Python'), ('cpp', 'C++'), ('html', 'HTML'), ('css', 'CSS')])), ('code_text', wagtail.wagtailcore.blocks.TextBlock())), icon='code', label='Code Snippet')))),
        ),
    ]