from django.conf.urls import url
from BoardApp import views

urlpatterns=[
    url(r'^board/(\w+)$', views.boardApi),
    url(r'^member/(\w+)$', views.memberApi)
]
