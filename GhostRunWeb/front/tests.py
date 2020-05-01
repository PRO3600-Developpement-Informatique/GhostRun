from django.test import TestCase

# Create your tests here.

from hypothesis.extra.django import TestCase, from_model
from hypothesis import given
from .models import Trip, Category, User


class FrontTests(TestCase):
    @given(from_model(Trip, user=from_model(User), category=from_model(Category, user=from_model(User))))
    def test_can_create_a_trip_without_end(self, example_trip:Trip):
        example_trip.ended_at = None
        example_trip.save()

