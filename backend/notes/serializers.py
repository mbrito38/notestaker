from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'audio_file', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.audio_file:
            representation['audio_file'] = instance.audio_file.url  # Return full URL
        return representation

class NoteCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['title', 'description', 'audio_file']
