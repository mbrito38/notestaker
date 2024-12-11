from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User


class AuthenticationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpassword")

    def test_login_success(self):
        data = {"username": "testuser", "password": "testpassword"}
        response = self.client.post("/api/token/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_failure(self):
        data = {"username": "testuser", "password": "wrongpassword"}
        response = self.client.post("/api/token/", data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
