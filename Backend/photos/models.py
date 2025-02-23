from django.db import models
from django.db.models import Max

from .choices import ARTISAN_CHOICES, ROLE_CHOICES, TYPE_CHOICES, ORIENTATION_CHOICES, SUBJECT_CHOICES
from .utils import process_and_convert_image
from django.conf import settings

# Create your models here.
class Photo(models.Model):
    image = models.ImageField(upload_to="photos/")
    role = models.CharField(max_length=50, blank=True, null=True, choices=ROLE_CHOICES)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    orientation = models.CharField(max_length=10, choices=ORIENTATION_CHOICES)
    position = models.IntegerField(blank=True, null=True) 

    def __str__(self):
        return self.image.name

    def construct_url(self):
        return f"{settings.MEDIA_URL}{self.image.url}"


    # Lorsqu'une photo est enregistrer en base
    def save(self, *args, **kwargs):


        # Si la position n'est pas définie, on la calcule automatiquement
        # Récupère la liste des photos de son type et de son subject
        # Récupère la plus haute position connu de cette liste
        # Attribut +1 à la photo qu'on enregistre
        if self.position is None:
            list_of_photo_similar = Photo.objects.filter(type=self.type, subject=self.subject)
            highest_position = list_of_photo_similar.aggregate(Max('position'))['position__max'] or 0

            self.position = highest_position + 1

        # Si la photo n'est pas en webp ( on considère qu'elle n'est pas compresser ), on la compresse + redimensionne + converti en webp
        if self.image and not self.image.name.lower().endswith('.webp'):
            self.image = process_and_convert_image(self.image)
            
        super().save(*args, **kwargs)
        
        
class Artisan(models.Model):
    name=models.CharField(max_length=50, choices=ARTISAN_CHOICES)
    photos = models.ManyToManyField(Photo, related_name="artisans", blank=True)

    def __str__(self):
        return self.name
