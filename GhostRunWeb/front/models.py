from django.db import models

# Create your models here.

from django.contrib.auth import get_user_model

User = get_user_model()

TRANSPORT_MODES = [
    ('walk', 'Walk'),
    ('run', 'Run'),
    ('car', 'Car'),
    ('motorbike', 'Motorbike'),
    ('taxi', 'Taxi'),
    ('rideshare', 'Rideshare'),
    ('carpool', 'Carpool'),
    ('bus', 'Bus'),
    ('bike', 'Bike'),
    ('boat', 'Boat'),
    ('train', 'Train'),
    ('rer', 'RER'),
    ('plane', 'Plane'),
    ('kayak', 'Kayak')
]


class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"

    user = models.ForeignKey(User, on_delete=models.CASCADE)  # int (id d'user)
    name = models.CharField(max_length=50)  # Boulot-Maison, faire des courses, autour du campus....


class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # int (id d'user)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # int (id de categorie)
    started_at = models.DateTimeField()  # 2020-03-30+17-16-03-9923+GMT1 heure de début
    ended_at = models.DateTimeField()  # 2020-03-30+17-16-03-9923+GMT1 heure de fin
    transport_used = models.CharField(max_length=50, choices=TRANSPORT_MODES)  # car, bike, boat, train, rer, bus, run, ....
    # localisations = [{Localisations}]


class Localisation(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()
    altitude = models.FloatField()
    timestamp = models.DateTimeField()


class UserSettings(models.Model):
    class Meta:
        verbose_name_plural = "UsersSettings"

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='_settings')
    # To be continued




