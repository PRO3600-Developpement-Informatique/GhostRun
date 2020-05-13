import datetime

from django.core.validators import MinValueValidator, MaxValueValidator
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

d = { "walk" : "Promenade",
      "run"  : "Course à pied",
      "car" : "Trajet en voiture",
      "motorbike" : "Trajet en moto",
      "taxi" : "Taxi",
      "rideshare" : "Taxi partagé",
      "carpool" : "Covoiturage",
      "bus" : "Trajet en bus",
      "bike" : "Trajet en vélo",
      "boat" : "Trajet en bateau",
      "train" : "Train",
      "rer" : "RER",
      "plane" : "Vol",
      "kayak" : "Kayak"
    }

class Category(models.Model):
    def __str__(self):
        return f"<Category user={self.user} name={self.name}>"

    class Meta:
        verbose_name_plural = "Categories"

    user = models.ForeignKey(User, on_delete=models.CASCADE)  # int (id d'user)
    name = models.CharField(max_length=50)  # Boulot-Maison, faire des courses, autour du campus....


class Trip(models.Model):
    def __str__(self):
        return f"<Trip user={self.user} transport={self.transport_used} started_at={self.started_at}>"

    user = models.ForeignKey(User, on_delete=models.CASCADE)  # int (id d'user)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="trips")  # int (id de categorie)
    started_at = models.DateTimeField()  # 2020-03-30+17-16-03-9923+GMT1 heure de début
    ended_at = models.DateTimeField(null=True)  # 2020-03-30+17-16-03-9923+GMT1 heure de fin
    transport_used = models.CharField(max_length=50, choices=TRANSPORT_MODES)  # car, bike, boat, train, rer, bus, run, ....
    weather = models.CharField(max_length=50, null=True, blank=True)
    feeling = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(10)])
    # localisations = [{Localisations}]

    @property
    def name(self):
        hour = self.started_at.time().hour
        if hour < 6:
            strtime = "de nuit"
        elif hour < 12:
            strtime = "du matin"
        elif hour < 14:
            strtime = "du midi"
        elif hour < 18:
            strtime = "dans l'après midi"
        elif hour < 22:
            strtime = "du soir"
        else:
            strtime = "de nuit"


        return f"{d[self.transport_used]} {strtime}  le {self.started_at.date()}"

    @property
    def short_name(self):
        date = self.started_at.date()
        return f"Balade du {date.day}/{date.month}"

    @property
    def duration(self) -> datetime.timedelta:
        return self.ended_at - self.started_at


class Localisation(models.Model):
    def __str__(self):
        return f"<Localisation trip={self.trip} pos=({self.latitude}, {self.longitude}, {self.altitude})>"

    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='localisations')
    latitude = models.FloatField()
    longitude = models.FloatField()
    altitude = models.FloatField()
    timestamp = models.DateTimeField()


class UserSettings(models.Model):
    class Meta:
        verbose_name_plural = "UsersSettings"

    def __str__(self):
        return f"<UserSettings user={self.user}>"
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='_settings')
    # To be continued




