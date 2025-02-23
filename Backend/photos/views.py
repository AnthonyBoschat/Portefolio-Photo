# photos/views.py
from rest_framework import viewsets, status
from .models import Photo, Artisan
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ArtisanPhotoSerializer, PhotoSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import action
from PIL import Image

class PhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Photo.objects.all()
    queryset = queryset.order_by("position")
    serializer_class = PhotoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type', 'subject']
    
    @action(detail=False, methods=['get'], url_path='get_artisans')
    def get_artisans(self, request):
        # Filtrer les photos correspondant aux critères
        artisans_photos = self.queryset.filter(
            type="prestation", 
            subject="pre_artisan", 
            role="representant"
        )
        # Utiliser notre serializer personnalisé qui inclut les artisans
        serializer = ArtisanPhotoSerializer(artisans_photos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"], url_path="get_artisan_photo")
    def get_artisan_photo(self, request):
        print("\n\n")
        id_artisan = request.query_params.get('id_artisan', None)
        print(f"id_artisan ______________{id_artisan}")
        
        if id_artisan:
            photos = self.queryset.filter(artisans__id = id_artisan)
            photos_serialized = PhotoSerializer(photos, many=True)
            return Response(photos_serialized.data)
        else:
            return Response({"error": "Artisan non trouvé."}, status=status.HTTP_404_NOT_FOUND)



        
        

    
class UploadPhotoViewSet(viewsets.ViewSet):
    parser_classes = (MultiPartParser, FormParser)

    
    def create(self, request, *args, **kwargs):
        files = request.FILES.getlist("files")
        type = request.data.get('type')
        subject = request.data.get('subject')
        artisan = request.data.get('artisan')
        print("\n\n")
        print(f"artisan ______________{artisan}")
        uploaded_photos = []
        for file in files:
            # Détermine l'orientation de la photo paysage ou portrait
            image = Image.open(file)
            width, height = image.size
            file.seek(0)
            
            if height > width:
                orientation = 'portrait'
            else:
                orientation = 'paysage'

            photo = Photo.objects.create(
                image=file,
                type=type,
                subject=subject,
                orientation=orientation
            )
            
            uploaded_photos.append(photo)

        # Si l'ajout de photo concerne la prestation artisan, il faut associer ces photos à cet artisan
        if artisan != None and subject == "pre_artisan":
            try:
                this_artisan = Artisan.objects.get(pk=artisan)
                print(f"this_artisan ______________{this_artisan}")
                for photo in uploaded_photos:
                    this_artisan.photos.add(photo)
                
                print(f"this_artisan.photo_______________{this_artisan.photos.all()}")
            except Artisan.DoesNotExist:
                return Response({"error": "Artisan non trouvé."}, status=status.HTTP_404_NOT_FOUND)
            
        print("\n\n")
            
        return Response({"success": True}, status=status.HTTP_201_CREATED)