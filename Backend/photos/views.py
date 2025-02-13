# photos/views.py
from rest_framework import viewsets
from .models import Photo
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import PhotoSerializer

class PhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Photo.objects.all()
    queryset = queryset.order_by("position")
    print("\n\n\n")
    print(f"queryset_______________{queryset}")
    print("\n\n\n")
    serializer_class = PhotoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type', 'subject']