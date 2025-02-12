from django.db import models
from .choices import ORIENTATION_CHOICES, PAGE_CHOICES, CONTEXT_CHOICES, ROLE_CHOICES

# Create your models here.
class Photo(models.Model):
    image = models.ImageField(upload_to="photos/")
    page = models.CharField(max_length=50, choices=PAGE_CHOICES)
    context = models.CharField(max_length=50, choices=CONTEXT_CHOICES, null=True, blank=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    orientation = models.CharField(max_length=10, choices=ORIENTATION_CHOICES)
    position = models.IntegerField(default=0) 

    def __str__(self):
        return self.image.name

    def get_absolute_url(self):
        from django.conf import settings
        return f"{settings.MEDIA_URL}{self.path}"
