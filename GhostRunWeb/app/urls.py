
from django.urls import path

from . import views

urlpatterns = [
    path('<int:trip_pk>', views.record, name='app-record'),
    path('', views.index, name='app-prepare'),
]
