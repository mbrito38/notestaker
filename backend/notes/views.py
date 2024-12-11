from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .models import Note
from .serializers import NoteSerializer, NoteCreateUpdateSerializer

class NoteViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Note.objects.all()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return NoteCreateUpdateSerializer
        return NoteSerializer

    def create(self, request, *args, **kwargs):
        print(request.FILES)  # Log uploaded files
        print(request.data)  # Log other form data
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
