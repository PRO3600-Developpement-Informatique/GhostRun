from django.contrib import admin

# Register your models here.

from .models import Category, UserSettings, Trip, Localisation

admin.site.register(Category)
admin.site.register(UserSettings)
admin.site.register(Trip)
admin.site.register(Localisation)
