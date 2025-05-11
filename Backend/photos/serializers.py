# photos/serializers.py
from rest_framework import serializers
from .models import Artisan, Photo, Portefolio, Prestation
from django.conf import settings

class PhotoSerializer(serializers.ModelSerializer):
    # On peut ajouter un champ calculé pour retourner l'URL complète
    image = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'image', 'orientation', 'position', "role"]

    def get_image(self, obj):
        return obj.image.url
    

class ArtisanSerializer(serializers.ModelSerializer):

    photos = PhotoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Artisan
        fields = ["id", "name", "photos"]
        
class ArtisanPhotoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    artisans = ArtisanSerializer(many=True, read_only=True)

    class Meta:
        model = Photo
        fields = ["image", "artisans", "orientation"]
        
    def get_image(self, obj):
        return obj.image.url
    



class PortefolioSerializer(serializers.ModelSerializer):

    photos = PhotoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Portefolio
        fields = ['id', 'name', "photos"]

class PrestationSerializer(serializers.ModelSerializer):

    photos = PhotoSerializer(many=True, read_only=True)
    artisans = serializers.SerializerMethodField()
    
    class Meta:
        model = Prestation
        fields = ['id', 'name', 'price', 'duration', 'delivery', "description", "photos", "artisans"]
        
    def get_artisans(self, object):
        # si le nom n'est pas "Artisan", on renvoie juste une liste vide
        if object.name != "Artisan":
            return None
        # Récupère les artisans
        artisans_qs = Artisan.objects.all()
        data = []
        for artisan in artisans_qs:
            # Essaie de récupérer la photo de rôle "banner"
            try:
                banner = artisan.photos.get(role='banner')
                # On renvoie l'URL de l'image (ou .image.name si tu préfères le chemin)
                photo_url = banner.image.url
            except Photo.DoesNotExist:
                photo_url = None

            data.append({
                'id': artisan.id,
                'name': artisan.name,
                'image': photo_url
            })
        return data
