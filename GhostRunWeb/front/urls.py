from django.urls import path

from . import views

urlpatterns = [
    path('accounts/signup/', views.SignUp.as_view(), name='signup'),
    path('', views.index, name='front-index'),
    path('app/<int:trip_pk>', views.testwebapp, name='front-app'),
    path('me', views.profile_home, name='front-profile-home'),
    path('settings', views.my_settings_view, name='front-my-settings'),
    path('trips/<int:pk>/', views.TripDetail.as_view(), name='front-trip-detail'),
    path('trips/<int:pk>/gpx', views.TripGPX.as_view(), name='front-trip-gpx'),
]
