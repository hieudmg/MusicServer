# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
import unicodedata
import urllib
from os import walk

from PIL import Image
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from tinytag import TinyTag

from MusicServer import settings
# Create your views here.
from Serverer.models import Song


def home(request):
    return render(request, 'Home.html')


def cmpx(x1, x2):
    return (x1 > x2) - (x1 < x2)


chrs = [u"àảãáạăằẳẵắặâầẩẫấậ",
        u"đ",
        u"èẻẽéẹêềểễếệ",
        u"ìỉĩíị",
        u"òỏõóọôồổỗốộơờởỡớợ",
        u"ùủũúụưừửữứự",
        u"ỳỷỹýỵ"]
kqua = u"adeiouy"


def bodau(a):
    a += u""
    for i, v in enumerate(chrs):
        if a in v:
            return kqua[i]
    return a


def nomoreunicode(code):
    return unicodedata.normalize('NFKD', code).encode('ASCII', 'ignore')


def cmpc(c1, c2):
    def pos(a):
        for i, v in enumerate(chrs):
            if a in v:
                return i
        return -1

    c1 = c1.lower()
    c2 = c2.lower()
    if c1 == c2:
        return 0
    p1 = pos(c1)
    p2 = pos(c2)
    if p1 == -1 and p2 == -1:
        return cmpx(c1, c2)
    elif p1 != -1 and p2 != -1:
        if p1 == p2:
            cs = chrs[p1]
            return cmpx(cs.find(c1), cs.find(c2))
        else:
            return cmpx(p1, p2)
    elif p1 != -1 and p2 == -1:
        if bodau(c1) >= c2:
            return 1
        else:
            return -1
    else:  # p1 == -1 and p2 != -1
        if c1 > bodau(c2):
            return 1
        else:
            return -1


def cmps(s1, s2):
    for i in range(0, min(len(s1), len(s2))):
        if s1[i] != s2[i]:
            return cmpc(s1[i], s2[i])
    return cmpx(len(s1), len(s2))


def cmp_song(s1, s2):
    return cmps(s1.title, s2.title)


def getmp3info(request):
    x = {}
    pgsize = int(request.GET.get('pgsize', 20))
    pg = int(request.GET.get('pg', 0))
    query = nomoreunicode(request.GET.get('query', u''))
    print(query)

    song_list = list(Song.objects.filter(query__contains=query))
    song_list.sort(cmp_song)
    song_list = song_list[pg * pgsize:pg * pgsize + pgsize]
    data = []
    for song in song_list:
        duration = song.duration
        item = {'name': song.title.title(),
                'artist': song.artist,
                'duration': '{:02d}:{:02d}'.format(duration / 60, duration % 60),
                'id': song.file_hash}
        data.append(item)
    x['data'] = data
    x['count'] = len(song_list)
    x['total'] = Song.objects.count()
    x['page'] = pg
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


def anagram(chars, cur=''):
    res = []
    if len(chars) == 1:
        cur = cur + chars[0]
        x = check_word(cur)
        if x[1]:
            res.append(cur)
    else:
        for ci, cv in enumerate(chars):
            cur += cv
            x = check_word(cur)
            if x[1]:
                res.append(cur)
            if x[0]:
                res.extend(anagram(chars[:ci] + chars[ci + 1:], cur))
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


def getmp3(request):
    song_id = request.GET.get('id', 1)
    song = Song.objects.get(file_hash=song_id)
    fs = FileSystemStorage()
    with fs.open(song.path) as mp3:
        response = HttpResponse(mp3, content_type='audio/mpeg')
        return response


def refreshdb():
    res = {'status': 'ok'}
    count = 0
    Song.objects.all().delete()
    for root, dirs, files in walk(settings.BASE_DIR + '/Serverer/Resources/Music'):
        for f in files:
            count += 1
            path = root + '/' + f
            song_file = TinyTag.get(path)
            song = Song(title=song_file.title,
                        artist=song_file.artist,
                        duration=int(song_file.duration),
                        query=nomoreunicode((u'' + song_file.title + song_file.artist)),
                        path=path)
            import hashlib
            hasher = hashlib.md5()
            hash_string = song.title + song.artist + str(song.duration)
            hasher.update(hash_string.encode('utf-8'))
            song.file_hash = (hasher.hexdigest())
            song.save()
    res['song'] = count


def rdb(request):
    refreshdb()
    return HttpResponse("OK")


def surviv(request):
    url = request.GET.get('path', '')
    if url != '':
        try:
            with open(settings.BASE_DIR + '/Serverer/Resources/assets/' + url.split("/")[-1], "rb") as f:
                return HttpResponse(f.read(), content_type="image")
        except IOError:
            red = Image.new('RGBA', (1, 1), (255, 0, 0, 0))
            response = HttpResponse(content_type="image")
            red.save(response, "PNG")
            return response
    resp = urllib.urlopen("https://" + url)
    return HttpResponse(resp, content_type="image")
