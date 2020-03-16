from django.urls import path

from . import views

urlpatterns = [
    path('page1', views.index, name='index'),
]
