from django.db import models
from .choices import ORIENTATION_CHOICES

# Create your models here.
class Photo(models.Model):
    path = models.CharField(max_length=255)
    page = models.CharField(max_length=50)
    role = models.CharField(max_length=50)
    type = models.CharField(max_length=10, choices=ORIENTATION_CHOICES)
    position = models.IntegerField(default=0) 

    def __str__(self):
        return self.path

    def get_absolute_url(self):
        from django.conf import settings
        return f"{settings.MEDIA_URL}{self.path}"
