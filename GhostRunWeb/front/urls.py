from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('trips', views.my_trips_view, name='my-trips'),
    path('settings', views.my_settings_view, name='my-settings'),
    path('trips/<int:trip_id>', views.trip_detail_view, name='trip-detail'),
]
