# photos/views.py
from rest_framework import viewsets, status
from .models import Photo
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import PhotoSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

class PhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Photo.objects.all()
    queryset = queryset.order_by("position")
    serializer_class = PhotoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type', 'subject']
    
class UploadPhotoViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        print("\n\n")
        print(f"request__FILES_______________{request.FILES}")
        print(f"request___type_______________{request.data.get('type')}")
        print(f"request___subject_______________{request.data.get('subject')}")
        print("\n\n")
        files = request.FILES.getlist("files")
        type = request.data.get('type')
        subject = request.data.get('subject')
        orientation = request.data.get('subject', 'portrait')
        uploaded_files = []
        for file in files:
            photo = Photo.objects.create(
                image=file,
                type=type,
                subject=subject,
                orientation=orientation
            )
            uploaded_files.append({
                "id": photo.id,
                "image": photo.get_absolute_url(),
                "type": photo.type,
                "subject": photo.subject,
            })
            
        return Response({"success": True}, status=status.HTTP_201_CREATED)