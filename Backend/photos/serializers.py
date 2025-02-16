# photos/serializers.py
from rest_framework import serializers
from .models import Artisan, Photo
from django.conf import settings

class PhotoSerializer(serializers.ModelSerializer):
    # On peut ajouter un champ calculé pour retourner l'URL complète
    image = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ['id', 'image', 'type', 'subject', 'orientation', 'position']

    def get_image(self, obj):
        # On suppose que le champ 'path' contient le chemin relatif par rapport à MEDIA_ROOT, par exemple "photos/image1.jpg"
        
        return obj.image.url
    

class ArtisanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artisan
        fields = ["id", "name"]
        
class ArtisanPhotoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    artisans = ArtisanSerializer(many=True, read_only=True)

    class Meta:
        model = Photo
        fields = ["image", "artisans", "orientation"]
        
    def get_image(self, obj):
        return obj.image.url
