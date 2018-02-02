from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name='getinfo'),
    url(r'^getinfo/$', views.getinfo, name='getinfo'),
]
