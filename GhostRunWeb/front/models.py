from django.db import models

# Create your models here.

from django.contrib.auth import get_user_model

User = get_user_model()


class ModeDeTransport(models.Model):
    name = models.CharField(max_length=50)
    fa_icon = models.CharField(max_length=50)  # Font Awesome


class Trajet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    started_at = models.DateTimeField()
    ended_at = models.DateTimeField()
    transport_used = models.ForeignKey(ModeDeTransport, on_delete=models.CASCADE)

    list_locations = models.TextField()  # Ca sera un JSONField


class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='_settings')
    # To be continued




