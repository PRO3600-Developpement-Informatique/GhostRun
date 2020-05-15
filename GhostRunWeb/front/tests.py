from django.test import TestCase

# Create your tests here.

from hypothesis.extra.django import TestCase, from_model
from hypothesis import given
from .models import Trip, Category, User
from django.test import Client


class FrontTests(TestCase):
    @given(from_model(Trip, user=from_model(User), category=from_model(Category, user=from_model(User))))
    def test_can_create_a_trip_without_end(self, example_trip:Trip):
        example_trip.ended_at = None
        example_trip.save()

    @given(from_model(Trip, user=from_model(User), category=from_model(Category, user=from_model(User))))
    def test_trips_can_be_saved(self, example_trip:Trip):
        example_trip.save()

class TestView(TestCase):

    @given(from_model(Trip, user=from_model(User), category=from_model(Category, user=from_model(User))))
    def test_trips_cant_have_negative_duration(self, example_trip:Trip):
        self.assertGreaterEqual(example_trip.duration.total_seconds(), 0)

    @given(from_model(Trip, user=from_model(User), category=from_model(Category, user=from_model(User))))
    def test_duration_without_ended_at(self, example_trip:Trip):
        example_trip.ended_at = None
        example_trip.duration