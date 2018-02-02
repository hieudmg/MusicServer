# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import os
from tinytag import TinyTag

# Create your views here.
from MusicServer.settings import BASE_DIR


def home(request):
    return render(request, 'Home.html')


def getinfo(request):
    x = {}
    stt = 0
    for root, dirs, files in os.walk(BASE_DIR + '\Serverer\Resources\Music'):
        for f in files:
            stt += 1
            tag = TinyTag.get(root + '/' + f)
            duration = int(tag.duration)
            info = {'name': tag.title, 'artist': tag.artist, 'duration': '{:02d}:{:02d}'.format(duration / 60, duration % 60)}
            x[str(stt)] = info
    return JsonResponse(x)
