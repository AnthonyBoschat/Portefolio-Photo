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
            {"success": True, "message":"Photo supprimé avec succès"},
            status=status.HTTP_200_OK
        )
    
    @action(
        detail=True,
        methods=['post'],
        parser_classes=[MultiPartParser, FormParser],
        url_path='upload-photos'
    )
    def upload_photos(self, request, pk=None):
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
                "position":photo.position,
                "representant":photo.representant,
                "banner":photo.banner,
            })

        return Response(
            {"datas": created},
            status=status.HTTP_201_CREATED
        )
        
    @action(
        detail=True,
        methods=['post'],
        parser_classes=[MultiPartParser, FormParser],
        url_path='upload-photos-representant'
    )
    def upload_photos_representant(self, request, pk=None):
        portefolio = self.get_object()

        file = request.FILES.get('files')
        
        if not file:
            return Response(
                {"detail": "Aucun fichier reçu."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # On détruit l'ancienne photo représentante si il y en a une
        ols_representants = Photo.objects.filter(portefolios=portefolio, representant=True)
        for representant in ols_representants:
            # supprime le fichier sur le storage
            representant.image.delete(save=False)
            # supprime l’enregistrement
            representant.delete()
        
        image = Image.open(file)
        orientation = 'portrait' if image.height > image.width else 'paysage'
        file.seek(0)
        photo = Photo.objects.create(image=file, orientation=orientation, representant=True)
        portefolio.photos.add(photo)
        return Response(
            {
                "success": True, 
                "photo": {
                    "id": photo.id,
                    "orientation": orientation,
                    "image": photo.image.url,
                    "position":photo.position,
                    "representant":photo.representant,
                    "banner":photo.banner,
                },
                "message":"Nouvelle photo représentante définie avec succès."
            },
            status=status.HTTP_201_CREATED
        )
        
    
        
    @action(
        detail=True,
        methods=['patch'],
        url_path=r'photos/(?P<photo_id>\d+)/change-role-representant',
        url_name='change-photo-role-representant'
    )
    def change_photo_role_to_representant(self, request, pk=None, photo_id=None):
        portefolio = self.get_object()
        # Vérifie que la photo appartient bien à ce portefolio
        photo = get_object_or_404(Photo, pk=photo_id, portefolios=portefolio)

        # Retire le role de la précédente photo s'il y en a
        Photo.objects.filter(portefolios=portefolio, representant=True).update(representant=False)
        
        # Met à jour et sauve
        photo.representant = True
        photo.save()

        # Retourne la nouvelle valeur au client
        return Response(
            {"success":True, "message":"Nouvelle photo représentante défini avec succès"},
            status=status.HTTP_200_OK
        )
        
    @action(
        detail=True,
        methods=['patch'],
        url_path=r'photos/(?P<photo_id>\d+)/change-role-banner',
        url_name='change-photo-role-banner'
    )
    def change_photo_role_to_banner(self, request, pk=None, photo_id=None):
        portefolio = self.get_object()
        datas = request.data
        position = datas.get("position")
        photo_to_replace_id = datas.get("photo_to_replace_id")
        
        # 1) Validation : au moins l'un des deux champs doit être présent (même s'il vaut 0)
        if position is None and photo_to_replace_id is None:
            return Response(
                {
                    "success": False,
                    "message": "Une erreur est survenue lors de la définition de la nouvelle bannière."
                },
            )

        # 2) Si on a une nouvelle position (y compris 0 !)
        if position is not None:
            new_photo = get_object_or_404(Photo, pk=photo_id, portefolios=portefolio)
            new_photo.banner = True
            new_photo.position = position
            new_photo.save()
            return Response({"success": True, "position": position, "image":new_photo.image.url, "message": "Photo bannière définie avec succès"})

        # 3) Sinon on a forcément photo_to_replace_id
        photo_to_replace = get_object_or_404(Photo, pk=photo_to_replace_id, portefolios=portefolio)
        old_position = photo_to_replace.position
        photo_to_replace.banner = False
        photo_to_replace.position = None
        photo_to_replace.save()

        new_photo = get_object_or_404(Photo, pk=photo_id, portefolios=portefolio)
        new_photo.banner = True
        new_photo.position = old_position
        new_photo.save()
        
        return Response(
            {"success": True, "replaceID": photo_to_replace.id, "image":new_photo.image.url, "message": "Photo bannière définie avec succès"}
        )

        
        
        
        
        
class AdminPrestationViewSet(viewsets.ModelViewSet):
    queryset = Prestation.objects.all()
    serializer_class = PrestationSerializer
    
    @action(
        detail=True,
        methods=['delete'],
        url_path=r'photos/(?P<photo_id>[^/.]+)',
        url_name='delete-photo'  # facultatif, pour nommer le reverse
    )
    def delete_photo(self, request, pk=None, photo_id=None):
        """
        DELETE /admin/prestations/{pk}/photos/{photo_id}/
        """
        prestation = self.get_object()
        photo = get_object_or_404(Photo, pk=photo_id, prestations=prestation)
        photo.delete()
        return Response(
            {"success": True, "message":"Photo supprimé avec succès"},
            status=status.HTTP_200_OK
        )
    
    @action(
        detail=True,
        methods=['post'],
        parser_classes=[MultiPartParser, FormParser],
        url_path='upload-photos'
    )
    def upload_photos(self, request, pk=None):
        prestation = self.get_object()

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
            prestation.photos.add(photo)
            created.append({
                "id": photo.id,
                "orientation": orientation,
                "image": photo.image.url,
                "position":photo.position,
                "representant":photo.representant,
                "banner":photo.banner,
            })

        return Response(
            {"datas": created},
            status=status.HTTP_201_CREATED
        )
        
    @action(
        detail=True,
        methods=['post'],
        parser_classes=[MultiPartParser, FormParser],
        url_path='upload-photos-representant'
    )
    def upload_photos_representant(self, request, pk=None):
        prestation = self.get_object()

        file = request.FILES.get('files')
        
        if not file:
            return Response(
                {"detail": "Aucun fichier reçu."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # On détruit l'ancienne photo représentante si il y en a une
        ols_representants = Photo.objects.filter(prestations=prestation, representant=True)
        for representant in ols_representants:
            # supprime le fichier sur le storage
            representant.image.delete(save=False)
            # supprime l’enregistrement
            representant.delete()
        
        image = Image.open(file)
        orientation = 'portrait' if image.height > image.width else 'paysage'
        file.seek(0)
        photo = Photo.objects.create(image=file, orientation=orientation, representant=True)
        prestation.photos.add(photo)
        return Response(
            {
                "success": True, 
                "photo": {
                    "id": photo.id,
                    "orientation": orientation,
                    "image": photo.image.url,
                    "position":photo.position,
                    "representant":photo.representant,
                    "banner":photo.banner,
                },
                "message":"Nouvelle photo représentante définie avec succès."
            },
            status=status.HTTP_201_CREATED
        )
        
    @action(
        detail=True,
        methods=['post'],
        parser_classes=[MultiPartParser, FormParser],
        url_path='upload-photos-banner'
    )
    def upload_photos_banner(self, request, pk=None):
        prestation = self.get_object()

        file = request.FILES.get('files')
        
        if not file:
            return Response(
                {"detail": "Aucun fichier reçu."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        photo_to_replace_id     = request.data.get('photo_to_replace_id')  # ou None
        position                = request.data.get('position')
        
        # 1) Validation : au moins l'un des deux champs doit être présent (même s'il vaut 0)
        if position is None and photo_to_replace_id is None:
            return Response(
                {
                    "success": False,
                    "message": "Une erreur est survenue lors de la définition de la nouvelle bannière."
                },
            )

        image = Image.open(file)
        orientation = 'portrait' if image.height > image.width else 'paysage'
        file.seek(0)
        if photo_to_replace_id is not None:
            old_banner_at_this_position = get_object_or_404(Photo, pk=photo_to_replace_id, banner=True)
            old_position = old_banner_at_this_position.position
            old_banner_at_this_position.delete()
            old_banner_at_this_position.image.delete(save=False)
            photo = Photo.objects.create(image=file, orientation=orientation, banner=True, position=old_position)
        
        if position is not None:
            photo = Photo.objects.create(image=file, orientation=orientation, banner=True, position=position)

        prestation.photos.add(photo)
        return Response(
            {
                "success": True, 
                "photo": {
                    "id": photo.id,
                    "orientation": orientation,
                    "image": photo.image.url,
                    "position":photo.position,
                    "representant":photo.representant,
                    "banner":photo.banner,
                },
                "message":"Nouvelle photo bannière définie avec succès."
            },
            status=status.HTTP_201_CREATED
        )
        
    @action(
        detail=True,
        methods=['patch'],
        url_path=r'photos/(?P<photo_id>\d+)/change-role-representant',
        url_name='change-photo-role'
    )
    def change_photo_role_to_representant(self, request, pk=None, photo_id=None):
        prestation = self.get_object()
        # Vérifie que la photo appartient bien à cette prestation
        photo = get_object_or_404(Photo, pk=photo_id, prestations=prestation)

        # Retire le role de la précédente photo s'il y en a
        Photo.objects.filter(prestations=prestation, representant=True).update(representant=False)
        
        # Met à jour et sauve
        photo.representant = True
        photo.save()

        # Retourne la nouvelle valeur au client
        return Response(
            {"success":True, "message":"Nouvelle photo représentante défini avec succès"},
            status=status.HTTP_200_OK
        )


    @action(
        detail=True,
        methods=['patch'],
        url_path=r'photos/(?P<photo_id>\d+)/change-role-banner',
        url_name='change-photo-role-banner'
    )
    def change_photo_role_to_banner(self, request, pk=None, photo_id=None):
        prestation = self.get_object()
        datas = request.data
        position = datas.get("position")
        photo_to_replace_id = datas.get("photo_to_replace_id")
        
        # 1) Validation : au moins l'un des deux champs doit être présent (même s'il vaut 0)
        if position is None and photo_to_replace_id is None:
            return Response(
                {
                    "success": False,
                    "message": "Une erreur est survenue lors de la définition de la nouvelle bannière."
                },
            )

        # 2) Si on a une nouvelle position (y compris 0 !)
        if position is not None:
            new_photo = get_object_or_404(Photo, pk=photo_id, prestations=prestation)
            new_photo.banner = True
            new_photo.position = position
            new_photo.save()
            return Response({"success": True, "position": position, "image":new_photo.image.url, "message": "Photo bannière définie avec succès"})

        # 3) Sinon on a forcément photo_to_replace_id
        photo_to_replace = get_object_or_404(Photo, pk=photo_to_replace_id, prestations=prestation)
        old_position = photo_to_replace.position
        photo_to_replace.banner = False
        photo_to_replace.position = None
        photo_to_replace.save()

        new_photo = get_object_or_404(Photo, pk=photo_id, prestations=prestation)
        new_photo.banner = True
        new_photo.position = old_position
        new_photo.save()
        
        return Response(
            {"success": True, "replaceID": photo_to_replace.id, "image":new_photo.image.url, "message": "Photo bannière définie avec succès"}
        )

    @action(
        detail=True,
        methods=['patch'],
        url_path=r'update-informations',
        url_name='update_informations'
    )
    def update_informations(self, request, pk=None):
        datas = request.data

        new_name = datas.get("name")
        new_duration = datas.get("duration")
        new_price = datas.get("price")
        new_delivery = datas.get("delivery")
        new_description = datas.get("description")

        prestation = self.get_object()
        if new_name:
            prestation.name = new_name
        if new_duration:
            prestation.duration = new_duration
        if new_price:
            prestation.price = new_price
        if new_delivery:
            prestation.delivery = new_delivery
        if new_description:
            prestation.description = new_description
            
        prestation.save()
        

        return Response(
            {"success":True}
        )
        
    
    
class AdminArtisanViewSet(viewsets.ModelViewSet):
    queryset = Artisan.objects.all()
    serializer_class = ArtisanSerializer
    
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
        artisan = self.get_object()
        photo = get_object_or_404(Photo, pk=photo_id, artisans=artisan)
        photo.delete()
        return Response(
            {"success": True, "message":"Photo supprimé avec succès"},
            status=status.HTTP_200_OK
        )
    
    @action(
        detail=True,
        methods=['post'],
        parser_classes=[MultiPartParser, FormParser],
        url_path='upload-photos'
    )
    def upload_photos(self, request, pk=None):
        artisan = self.get_object()

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
            artisan.photos.add(photo)
            created.append({
                "id": photo.id,
                "orientation": orientation,
                "image": photo.image.url,
                "position":photo.position,
                "representant":photo.representant,
                "banner":photo.banner,
            })

        return Response(
            {"datas": created},
            status=status.HTTP_201_CREATED
        )
        
        
    @action(
        detail=True,
        methods=['post'],
        parser_classes=[MultiPartParser, FormParser],
        url_path='upload-photos-representant'
    )
    def upload_photos_representant(self, request, pk=None):
        artisan = self.get_object()

        file = request.FILES.get('files')
        
        if not file:
            return Response(
                {"detail": "Aucun fichier reçu."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # On détruit l'ancienne photo représentante si il y en a une
        ols_representants = Photo.objects.filter(artisans=artisan, representant=True)
        for representant in ols_representants:
            # supprime le fichier sur le storage
            representant.image.delete(save=False)
            # supprime l’enregistrement
            representant.delete()
        
        image = Image.open(file)
        orientation = 'portrait' if image.height > image.width else 'paysage'
        file.seek(0)
        photo = Photo.objects.create(image=file, orientation=orientation, representant=True)
        artisan.photos.add(photo)
        return Response(
            {
                "success": True, 
                "photo": {
                    "id": photo.id,
                    "orientation": orientation,
                    "image": photo.image.url,
                    "position":photo.position,
                    "representant":photo.representant,
                    "banner":photo.banner,
                },
                "message":"Nouvelle photo représentante définie avec succès."
            },
            status=status.HTTP_201_CREATED
        )
        
    @action(
        detail=True,
        methods=['patch'],
        url_path=r'photos/(?P<photo_id>\d+)/change-role-representant',
        url_name='change-photo-role'
    )
    def change_photo_role_to_representant(self, request, pk=None, photo_id=None):
        artisan = self.get_object()
        # Vérifie que la photo appartient bien à ce portefolio
        photo = get_object_or_404(Photo, pk=photo_id, artisans=artisan)

        # Retire le role de la précédente photo s'il y en a
        Photo.objects.filter(artisans=artisan, representant=True).update(representant=False)
        
        # Met à jour et sauve
        photo.representant = True
        photo.save()

        # Retourne la nouvelle valeur au client
        return Response(
            {"success":True},
            status=status.HTTP_200_OK
        )


    @action(
        detail=False,          # <- on passe à False
        methods=['post'],
        url_path='add'         # pas besoin du slash
    )
    def add_artisan(self, request):

        name = request.data.get("name")

        if not name:
            return Response(
                {"success": False, "message": "Le champ 'name' est requis."},
            )

        artisan, created = Artisan.objects.get_or_create(name=name)
        if not created:
            return Response(
                {"success": False, "message": "Un artisan avec ce nom existe déjà."},
            )
            
        return Response(
            {
                "success": True,
                "message": f"L'artisan {artisan.name} a été créé avec succès.",
                "new_artisan":{
                    "id":artisan.id,
                    "name":artisan.name,
                    "image":None,
                }
            },
        )
        
        
    @action(
        detail=True,
        methods=['delete'],
        url_path='delete'
    )
    def delete_artisan(self, request, pk=None):
        try:
            artisan = Artisan.objects.get(pk=pk)
        except Artisan.DoesNotExist:
            return Response({"success": False, "message": "Artisan non trouvé."})
        
        deleted_name = artisan.name
        deleted_id = artisan.id
        artisan.delete()

        return Response({
            "success":True,
            "message":f"L'artisan {deleted_name} a été supprimer avec succès",
            "deleted_id":deleted_id
        })
        
    @action(
        detail=True,
        methods=['patch'],
        url_path='change_name'
    )
    def change_artisan_name(self, request, pk=None):
        
        new_name = request.data.get("name")
        if not new_name:
            return Response({"success": False, "message": "Le champ 'name' est requis."})
            
        if Artisan.objects.filter(name=new_name).exists():
            return Response({"success": False, "message": "Un artisan avec ce nom existe déjà."})

        artisan = self.get_object()
        artisan.name = new_name
        artisan.save()

        return Response({
            "success":True,
            "artisan_id":artisan.id,
            "artisan_new_name":artisan.name,
            "message":f"L'artisan {artisan.name} a été mis à jour avec succès"
        })
    





















class AdminPhotoViewSet(viewsets.ViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
