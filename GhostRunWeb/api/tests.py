# Create your tests here.

from django.contrib.auth.models import AnonymousUser, User
from django.test import RequestFactory, TestCase
from django.urls import reverse
from rest_framework.test import APIRequestFactory, APIClient


class APITests(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(username='arthur', email='arthur@example.com', password='top_secret')

    def test_api_needs_authentification(self):
        c = APIClient()
        api_root_url = reverse('api-root')
        # Create an instance of a GET request.
        r = c.get(api_root_url)
        self.assertEqual(r.status_code, 403)

    def test_api_works_authentified(self):
        c = APIClient()
        api_root_url = reverse('api-root')
        c.force_login(self.user)
        r = c.get(api_root_url)
        self.assertEqual(r.status_code, 200)


