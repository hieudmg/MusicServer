# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from os import walk

from django.views.decorators.csrf import csrf_exempt
from tinytag import TinyTag
import json
import itertools
from MusicServer.settings import BASE_DIR


# Create your views here.


def home(request):
    return render(request, 'Home.html')


def getinfo(request):
    x = {}
    stt = 0
    for root, dirs, files in walk(BASE_DIR + '/Serverer/Resources/Music'):
        for f in files:
            stt += 1
            tag = TinyTag.get(root + '/' + f)
            duration = int(tag.duration)
            info = {'name': tag.title, 'artist': tag.artist,
                    'duration': '{:02d}:{:02d}'.format(duration / 60, duration % 60)}
            x[str(stt)] = info
    x['count'] = stt
    return JsonResponse(x)


@csrf_exempt
def wordgen(request):
    data = json.load(open(BASE_DIR + '/Serverer/Resources/json/words_dictionary.json'))
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
