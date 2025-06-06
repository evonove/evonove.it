# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-27 13:24
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields
import wagtail.fields


class Migration(migrations.Migration):

    dependencies = [
        ('agency', '0004_auto_20170726_0915'),
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('title', models.CharField(default='', max_length=150)),
                ('description', models.TextField(max_length=600)),
            ],
            options={
                'abstract': False,
                'ordering': ['sort_order'],
            },
        ),
        migrations.CreateModel(
            name='Stack',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('stack', wagtail.fields.RichTextField(blank=True)),
                ('category', models.CharField(blank=True, max_length=100)),
            ],
            options={
                'abstract': False,
                'ordering': ['sort_order'],
            },
        ),
        migrations.RemoveField(
            model_name='expertise',
            name='page',
        ),
        migrations.RemoveField(
            model_name='teammember',
            name='bio',
        ),
        migrations.AddField(
            model_name='agencypage',
            name='expertise_description',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='agencypage',
            name='expertise_subtitle',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='agencypage',
            name='expertise_title',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='agencypage',
            name='project_category',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='agencypage',
            name='project_description',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='agencypage',
            name='project_link',
            field=models.URLField(blank=True, help_text='Your website page URL', null=True),
        ),
        migrations.AddField(
            model_name='agencypage',
            name='services_subtitle',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.AddField(
            model_name='agencypage',
            name='services_title',
            field=wagtail.fields.RichTextField(blank=True),
        ),
        migrations.DeleteModel(
            name='Expertise',
        ),
        migrations.AddField(
            model_name='stack',
            name='page',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='stack', to='agency.AgencyPage'),
        ),
        migrations.AddField(
            model_name='service',
            name='page',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='services', to='agency.AgencyPage'),
        ),
    ]
