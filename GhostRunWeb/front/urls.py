from django.urls import path

from . import views

urlpatterns = [
    path('accounts/signup/', views.SignUp.as_view(), name='signup'),
    path('', views.index, name='index'),
    path('me', views.profile_home, name='profile-home'),
    path('settings', views.my_settings_view, name='my-settings'),
    path('trips/<int:pk>/', views.TripDetail.as_view(), name='trip-detail'),
    path('trips/<int:pk>/gpx', views.TripGPX.as_view(), name='trip-gpx'),
]
