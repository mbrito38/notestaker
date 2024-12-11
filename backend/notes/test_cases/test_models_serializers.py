from django.test import TestCase
from django.contrib.auth.models import User
from notes.models import Note
from notes.serializers import NoteSerializer

class NoteModelSerializerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.note = Note.objects.create(user=self.user, title="Test Note", description="Test Description")

    def test_note_creation(self):
        self.assertEqual(Note.objects.count(), 1)
        self.assertEqual(self.note.title, "Test Note")

    def test_note_serializer(self):
        serializer = NoteSerializer(instance=self.note)
        self.assertEqual(serializer.data["title"], "Test Note")
        self.assertEqual(serializer.data["description"], "Test Description")
