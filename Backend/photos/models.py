from os import name
from django.db import models
from django.db.models import Max

from .choices import ROLE_CHOICES, ORIENTATION_CHOICES
from .utils import process_and_convert_image
from django.conf import settings

# Create your models here.
class Photo(models.Model):
    image = models.ImageField(upload_to="photos/")
    role = models.CharField(max_length=50, blank=True, null=True, choices=ROLE_CHOICES)
    orientation = models.CharField(max_length=10, choices=ORIENTATION_CHOICES)
    position = models.IntegerField(blank=True, null=True) 

    def __str__(self):
        return self.image.name

    def construct_url(self):
        return f"{settings.MEDIA_URL}{self.image.url}"


    # Lorsqu'une photo est enregistrer en base
    def save(self, *args, **kwargs):

        # Si la photo n'est pas en webp ( on considère qu'elle n'est pas compresser ), on la compresse + redimensionne + converti en webp
        if self.image and not self.image.name.lower().endswith('.webp'):
            self.image = process_and_convert_image(self.image)
            
        super().save(*args, **kwargs)
        
        
class Artisan(models.Model):
    name=models.CharField(max_length=100)
    photos = models.ManyToManyField(
        Photo, 
        related_name="artisans", 
        blank=True, 
        help_text="Photos lié à cet artisan",
        
    )

    def __str__(self):
        return self.name

    def delete(self, *args, **kwargs):
        # On copie la liste avant suppression de l'Artisan
        photos_to_delete = list(self.photos.all())
        super().delete(*args, **kwargs)
        # Puis on supprime chaque Photo
        for photo in photos_to_delete:
            photo.delete()
    
    
class Portefolio(models.Model):
    name = models.CharField(max_length=100, unique=True)
    photos = models.ManyToManyField(
        Photo,
        related_name="portefolios",
        blank=True,
        help_text="Photos incluses dans ce portefolio"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Prestation(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )
    duration = models.CharField(max_length=100)
    delivery = models.IntegerField()
    description = models.TextField(default="")
    photos = models.ManyToManyField(
        Photo,
        related_name="prestations",
        blank=True,
        help_text="Photos incluses dans cette prestation"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    

