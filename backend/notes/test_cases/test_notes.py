from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from notes.models import Note


class NotesTestCase(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username="testuser", password="testpassword")

        # Obtain JWT token
        response = self.client.post("/api/token/", {"username": "testuser", "password": "testpassword"})
        self.access_token = response.data["access"]

        # Create a test note
        self.note = Note.objects.create(user=self.user, title="Test Note", description="Test Description")

    def authenticate(self):
        # Authenticate the client
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

    def test_create_note(self):
        self.authenticate()
        data = {"title": "New Note", "description": "New Description"}
        response = self.client.post("/api/notes/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "New Note")

    def test_get_notes(self):
        self.authenticate()
        response = self.client.get("/api/notes/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_note(self):
        self.authenticate()
        data = {"title": "Updated Note", "description": "Updated Description"}
        response = self.client.put(f"/api/notes/{self.note.id}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Updated Note")

    def test_delete_note(self):
        self.authenticate()
        response = self.client.delete(f"/api/notes/{self.note.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Note.objects.count(), 0)
