# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-03 09:05
from __future__ import unicode_literals

import blog.fields
from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields
import wagtail.embeds.blocks
import wagtail.images.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20170310_1113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='body',
            field=wagtail.core.fields.StreamField((('h2', wagtail.core.blocks.CharBlock(icon='title')), ('h3', wagtail.core.blocks.CharBlock(icon='title')), ('paragraph', wagtail.core.blocks.RichTextBlock(icon='pilcrow')), ('aligned_image', wagtail.core.blocks.StructBlock((('image', wagtail.images.blocks.ImageChooserBlock()), ('alignment', blog.fields.ImageFormatBlock()), ('caption', wagtail.core.blocks.RichTextBlock(required=False))), icon='image', label='Aligned image')), ('youtube', wagtail.embeds.blocks.EmbedBlock(icon='image')), ('pullquote', wagtail.core.blocks.StructBlock((('quote', wagtail.core.blocks.TextBlock(label='Quote title')), ('attribution', wagtail.core.blocks.CharBlock())), icon='openquote')), ('code_snippet', wagtail.core.blocks.StructBlock((('language', wagtail.core.blocks.ChoiceBlock(choices=[('python', 'Python'), ('cpp', 'C++'), ('html', 'HTML'), ('css', 'CSS')])), ('code_text', wagtail.core.blocks.TextBlock())), icon='code', label='Code Snippet')))),
        ),
    ]
