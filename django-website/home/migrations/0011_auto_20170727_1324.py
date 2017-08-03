# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-27 13:24
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0019_delete_filter'),
        ('home', '0010_auto_20170725_1534'),
    ]

    operations = [
        migrations.CreateModel(
            name='Partner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.Image')),
            ],
            options={
                'abstract': False,
                'ordering': ['sort_order'],
            },
        ),
        migrations.RemoveField(
            model_name='service',
            name='page',
        ),
        migrations.AddField(
            model_name='homepage',
            name='works_subtitle',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='homepage',
            name='works_title',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
        migrations.DeleteModel(
            name='Service',
        ),
        migrations.AddField(
            model_name='partner',
            name='page',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='partners', to='home.HomePage'),
        ),
    ]