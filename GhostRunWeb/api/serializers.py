from django.contrib.auth.models import User, Group
from rest_framework import serializers

from front.models import Category, Trip, Localisation, UserSettings


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class TripSerializer(serializers.HyperlinkedModelSerializer):
    localisations = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name="localisation-detail")

    class Meta:
        model = Trip
        # fields = '__all__'
        exclude = ['user']


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    serializers.ReadOnlyField(source='user')
    trips = TripSerializer(many=True, read_only=True)  # , view_name="trip-detail")

    class Meta:
        model = Category
        exclude = ['user']
        depth = 1


class LocalisationSerializer(serializers.HyperlinkedModelSerializer):
    def validate_trip(self, value):
        """
        Check that the blog post is about Django.
        """
        if value.user != self.context['request'].user:
            raise serializers.ValidationError("Invalid trip user.")
        return value

    class Meta:
        model = Localisation
        fields = '__all__'


class UserSettingsSerializer(serializers.HyperlinkedModelSerializer):
    serializers.ReadOnlyField(source='user')

    class Meta:
        model = UserSettings
        # fields = '__all__'
        exclude = ['user']
