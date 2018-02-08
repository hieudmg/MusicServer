from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name='getinfo'),
    url(r'^getinfo/$', views.getinfo, name='getinfo'),
    url(r'^wordgen/$', views.worgenfront, name='wordgenfront'),
    url(r'^getwordgen/$', views.wordgen, name='getwordgen'),
]
