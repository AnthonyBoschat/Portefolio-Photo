from django.db import models
from django.db.models import Max
from .choices import TYPE_CHOICES, ORIENTATION_CHOICES, SUBJECT_CHOICES

# Create your models here.
class Photo(models.Model):
    image = models.ImageField(upload_to="photos/")
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    orientation = models.CharField(max_length=10, choices=ORIENTATION_CHOICES)
    position = models.IntegerField(blank=True, null=True) 

    def __str__(self):
        return self.image.name

    def get_absolute_url(self):
        from django.conf import settings
        return f"{settings.MEDIA_URL}{self.image.url}"

    def save(self, *args, **kwargs):
        # Si la position n'est pas définie, on la calcule automatiquement
        if self.position is None:
            # Récupère la position maximale parmi les images existantes
            dernier_max = Photo.objects.aggregate(Max('position'))['position__max'] or 0
            self.position = dernier_max + 1
        super().save(*args, **kwargs)
