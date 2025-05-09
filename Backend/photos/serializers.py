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
    



class PortefolioSerializer(serializers.ModelSerializer):

    photos = PhotoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Portefolio
        fields = ['id', 'name', "photos"]

class PrestationSerializer(serializers.ModelSerializer):

    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Prestation
        fields = ['id', 'name', 'price', 'duration', 'delivery', "description", "photos"]
