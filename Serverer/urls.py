from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.home, name='getinfo'),
    url(r'^getmp3info/$', views.getmp3info, name='getmp3info'),
    url(r'^wordgen/$', views.worgenfront, name='wordgenfront'),
    url(r'^getwordgen/$', views.wordgen, name='getwordgen'),
    url(r'^rdb/$', views.rdb, name='rdb'),
    url(r'^getmp3/$', views.getmp3, name='getmp3'),
]
