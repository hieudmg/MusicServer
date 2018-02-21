# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.exceptions import FieldDoesNotExist
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from os import walk

from django.views.decorators.csrf import csrf_exempt
from tinytag import TinyTag
import json
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
    stt = pg * pgsize
    try:
        Song._meta.get_field(order)
    except FieldDoesNotExist:
        order = 'title'

    song_list = Song.objects.order_by(order)[(pgsize * pg):(pgsize * (pg + 1))]
    for song in song_list:
        stt += 1
        duration = song.duration
        x[str(stt)] = {'name': song.title, 'artist': song.artist,
                       'duration': '{:02d}:{:02d}'.format(duration / 60, duration % 60)}
    x['count'] = Song.objects.count()
    return JsonResponse(x)


word_set = []
cur_pos = 0


def check_word(cur):
    global word_set, cur_pos
    res = [False, False]
    while cur > word_set[cur_pos]:
        cur_pos += 1
    if word_set[cur_pos].startswith(cur):
        res[0] = True
        if word_set[cur_pos] == cur:
            res[1] = True
    return res


def anagram(chrs, cur=''):
    res = []
    if len(chrs) == 1:
        cur = cur + chrs[0]
        x = check_word(cur)
        if x[1]:
            res.append(cur)
    else:
        for ci, cv in enumerate(chrs):
            cur += cv
            x = check_word(cur)
            if x[1]:
                res.append(cur)
            if x[0]:
                res.extend(anagram(chrs[:ci] + chrs[ci + 1:], cur))
            cur = cur[:-1]
    return res


@csrf_exempt
def wordgen(request):
    global word_set, cur_pos
    re = {}
    bd = json.loads(request.body)
    try:
        chrset = str(bd['chrset']).lower()
    except:
        chrset = ''

    chrset = ''.join(sorted(chrset))
    inp = open(settings.BASE_DIR + '/Serverer/Resources/word/word.wd')
    word_set = []
    cur_pos = 0
    for ln in inp:
        word_set.append(ln.strip())
    inp.close()
    reswd = anagram(chrset)
    reswd = set(reswd)
    reswd = filter(lambda x: len(x) > 2, reswd)
    type_arr = []
    type_count = 0
    for i in range(3, 10):
        wi = sorted(filter(lambda x: len(x) == i, reswd))
        wil = len(wi)
        if wil > 0:
            type_count += 1
            type_arr.append(i)
            re['len' + str(i)] = {
                'count': str(wil),
                'words': wi
            }
    re['count'] = type_count
    re['types'] = type_arr
    return JsonResponse(re)


def worgenfront(request):
    return render(request, 'wordGen.html')


def refreshdb():
    res = {'status': 'ok'}
    count = 0
    Song.objects.all().delete()
    for root, dirs, files in walk(settings.BASE_DIR + '/Serverer/Resources/Music'):
        for f in files:
            count += 1
            song_tag = TinyTag.get(root + '/' + f)
            song = Song(title=song_tag.title, artist=song_tag.artist, duration=int(song_tag.duration))
            song.save()
    res['song'] = count
