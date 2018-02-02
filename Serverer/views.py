# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import os


# Create your views here.

def home(request):
    return render(request, 'Home.html')


def getinfo(request):
    x = {}
    stt = 0
    for root, dirs, files in os.walk('./Serverer/Resources/Music', followlinks=True):
        for f in files:
            stt += 1
            x[str(stt)] = f
    return JsonResponse(x)
