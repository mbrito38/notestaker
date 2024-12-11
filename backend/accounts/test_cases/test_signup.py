from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

class SignupTestCase(APITestCase):
    def test_signup_success(self):
        data = {
            "username": "testuser",
            "password": "testpassword",
            "email": "testuser@example.com"
        }
        response = self.client.post("/api/accounts/signup/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "User registered successfully")

    def test_signup_missing_field(self):
        data = {
            "username": "testuser",
            "password": "testpassword"
        }
        response = self.client.post("/api/accounts/signup/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("User registered successfully", response.data["message"])
