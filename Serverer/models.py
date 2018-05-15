# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=50, default='')
    duration = models.IntegerField(default=0)
    artist = models.CharField(max_length=50, default='')
    path = models.CharField(max_length=200, default='')
    query = models.CharField(max_length=500, default='')
    file_hash = models.CharField(max_length=64, default='', primary_key=True)
