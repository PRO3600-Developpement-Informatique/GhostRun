from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'settings', views.UserSettingsViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'localisations', views.LocalisationViewSet)
router.register(r'trips', views.TripViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='api'))
]
