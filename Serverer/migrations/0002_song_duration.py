# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-02-18 02:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Serverer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='duration',
            field=models.IntegerField(default=0),
        ),
    ]