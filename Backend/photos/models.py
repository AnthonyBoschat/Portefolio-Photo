from os import name
from django.db import models
from django.db.models import Max

from .choices import ROLE_CHOICES, ORIENTATION_CHOICES
from .utils import compress_image, convert_to_webp
from django.conf import settings

# Create your models here.
class Photo(models.Model):
    image = models.ImageField(upload_to="photos/")
    representant = models.BooleanField(default=False)
    banner = models.BooleanField(default=False)
    orientation = models.CharField(max_length=10, choices=ORIENTATION_CHOICES)
    position = models.IntegerField(blank=True, null=True) 

    def __str__(self):
        return self.image.name

    def construct_url(self):
        return f"{settings.MEDIA_URL}{self.image.url}"


    # Lorsqu'une photo est enregistrer en base
    def save(self, *args, **kwargs):

        print(f"settings.COMPRESS_IMAGES_________{settings.COMPRESS_IMAGES}")
        print(f"settings.CONVERT_IMAGES_________{settings.CONVERT_IMAGES}")
        if self.image:
            img_file = self.image
            
            if settings.COMPRESS_IMAGES:
                img_file = compress_image(img_file)
            if settings.CONVERT_IMAGES:
                img_file = convert_to_webp(img_file)

            self.image = img_file
            
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
    

