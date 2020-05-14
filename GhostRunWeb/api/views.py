# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, mixins
from rest_framework import permissions

from .permissions import SameUserOrNothing, IsOwnerOrNothing, IsTripOwnerOrNothing
from .serializers import UserSerializer, GroupSerializer, CategorySerializer, TripSerializer, LocalisationSerializer, \
    UserSettingsSerializer
from front.models import Category, Trip, Localisation, UserSettings
from url_filter.integrations.drf import DjangoFilterBackend

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.queryset.filter(pk=self.request.user.pk)

    permission_classes = [permissions.IsAuthenticated, SameUserOrNothing]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated,
                          IsOwnerOrNothing]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TripViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrNothing]

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LocalisationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Localisation.objects.all().order_by('-timestamp')
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['trip']

    def get_queryset(self):
        queryset = self.queryset.filter(trip__user=self.request.user)
        return queryset

    serializer_class = LocalisationSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripOwnerOrNothing]


class UserSettingsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = UserSettings.objects.all()
    serializer_class = UserSettingsSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrNothing]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
