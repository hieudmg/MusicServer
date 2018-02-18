# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.exceptions import FieldDoesNotExist
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from os import walk

from django.views.decorators.csrf import csrf_exempt
from tinytag import TinyTag
import json
import itertools
from MusicServer import settings
from models import *


# Create your views here.


def home(request):
    return render(request, 'Home.html')


def getinfo(request):
    x = {}
    order = request.GET.get('order', 'title')
    pgsize = int(request.GET.get('pgsize', 5))
    pg = int(request.GET.get('pg', 0))
    stt = pg*pgsize
    try:
        Song._meta.get_field(order)
    except FieldDoesNotExist:
        order = 'title'

    song_list = Song.objects.order_by(order)[(pgsize*pg):(pgsize*(pg + 1))]
    for song in song_list:
        stt += 1
        duration = song.duration
        x[str(stt)] = {'name': song.title, 'artist': song.artist,
                       'duration': '{:02d}:{:02d}'.format(duration / 60, duration % 60)}
    x['count'] = Song.objects.count()
    return JsonResponse(x)


@csrf_exempt
def wordgen(request):
    data = json.load(open(settings.BASE_DIR + '/Serverer/Resources/json/words_dictionary.json'))
    wl = []
    bd = json.loads(request.body)
    try:
        minlen = int(bd['minlen'])
    except KeyError:
        minlen = 1
    try:
        maxlen = int(bd['maxlen'])
    except KeyError:
        maxlen = 1
    try:
        chrset = str(bd['chrset'])
    except:
        chrset = '1'
    for i in range(minlen, maxlen + 1):
        for ch in list(itertools.permutations(chrset, i)):
            ch0 = ''.join(ch)
            try:
                data[ch0]
                wl.append(ch0)
            except KeyError:
                pass
    wl = sorted(set(wl))
    re = {}
    for i, v in enumerate(wl):
        re['w' + str(i + 1)] = v
    re['count'] = len(wl)
    return JsonResponse(re)


def worgenfront(request):
    return render(request, 'wordGen.html')


def refreshdb():
    count = 0
    Song.objects.all().delete()
    for root, dirs, files in walk(settings.BASE_DIR + '/Serverer/Resources/Music'):
        for f in files:
            count += 1
            song_tag = TinyTag.get(root + '/' + f)
            song = Song(title=song_tag.title, artist=song_tag.artist, duration=int(song_tag.duration))
            song.save()
