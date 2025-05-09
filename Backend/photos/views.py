# photos/views.py
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, permissions, generics
from .models import Photo, Artisan, Portefolio, Prestation
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ArtisanPhotoSerializer, ArtisanSerializer, PhotoSerializer, PortefolioSerializer, PrestationSerializer
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


class PortefoliosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Portefolio.objects.all()
    serializer_class = PortefolioSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        portefolio_id = self.request.query_params.get("id")
        if portefolio_id:
            queryset = queryset.filter(pk=portefolio_id)
        return queryset
    
class PrestationsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Prestation.objects.all()
    serializer_class = PrestationSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        prestation_id = self.request.query_params.get("id")
        if prestation_id:
            queryset = queryset.filter(pk=prestation_id)
        return queryset
    
class ArtisansViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Artisan.objects.all()
    serializer_class = ArtisanSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        artisan_id = self.request.query_params.get("id")
        if artisan_id:
            queryset = queryset.filter(pk=artisan_id)
        return queryset
    
        
class AdminPortefolioViewSet(viewsets.ModelViewSet):
    queryset = Portefolio.objects.all()
    serializer_class = PortefolioSerializer
    
    @action(
        detail=True,
        methods=['delete'],
        url_path=r'photos/(?P<photo_id>[^/.]+)',
        url_name='delete-photo'  # facultatif, pour nommer le reverse
    )
    def delete_photo(self, request, pk=None, photo_id=None):
        """
        DELETE /admin/portefolios/{pk}/photos/{photo_id}/
        """
        portefolio = self.get_object()
        photo = get_object_or_404(Photo, pk=photo_id, portefolios=portefolio)
        photo.delete()
        return Response(
            {"success": True},
            status=status.HTTP_200_OK
        )
    
    @action(
        detail=True,
        methods=['post'],
        parser_classes=[MultiPartParser, FormParser],
        url_path='upload-photos'
    )
    def upload_photos(self, request, pk=None):
        """
        POST /api/portefolios/{pk}/upload-photos/
        Attends un champ `files` (multipart/form-data)
        Crée les Photo, détecte orientation et les associe au Portefolio.
        """
        portefolio = self.get_object()

        files = request.FILES.getlist('files')
        if not files:
            return Response(
                {"detail": "Aucun fichier reçu."},
                status=status.HTTP_400_BAD_REQUEST
            )

        created = []
        for f in files:
            # optionnel : détection orientation
            img = Image.open(f)
            orientation = 'portrait' if img.height > img.width else 'paysage'
            f.seek(0)

            photo = Photo.objects.create(image=f, orientation=orientation)
            portefolio.photos.add(photo)
            created.append({
                "id": photo.id,
                "orientation": orientation,
                "image": photo.image.url,
                "position":photo.position
            })

        return Response(
            {"datas": created},
            status=status.HTTP_201_CREATED
        )
        
    @action(
        detail=True,
        methods=['patch'],
        url_path=r'photos/(?P<photo_id>\d+)/change-role',
        url_name='change-photo-role'
    )
    def change_photo_role(self, request, pk=None, photo_id=None):
        """
        PATCH /admin/portefolios/{pk}/photos/{photo_id}/change-role/
        Body attendu : { "role": "<nouveau_role>" }
        """
        portefolio = self.get_object()
        # Vérifie que la photo appartient bien à ce portefolio
        photo = get_object_or_404(Photo, pk=photo_id, portefolios=portefolio)

        # Retire le role de la précédente photo s'il y en a
        Photo.objects.filter(portefolios=portefolio, role="banner").update(role=None)
        
        # Met à jour et sauve
        photo.role = "banner"
        photo.save()

        # Retourne la nouvelle valeur au client
        return Response(
            {"success":True},
            status=status.HTTP_200_OK
        )
    
    





















class AdminPhotoViewSet(viewsets.ViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
