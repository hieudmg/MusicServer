# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=50)
    duration = models.IntegerField(default=0)
    artist = models.CharField(max_length=50)


class Word(models.Model):
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=5)
