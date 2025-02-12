from django.contrib import admin
from .models import Photo


class PhotoAdmin(admin.ModelAdmin):
    # Définir les colonnes à afficher dans la liste
    list_display = ('id', 'image', 'page', 'context', 'role', 'orientation', 'position', 'image_preview')
    
    # Permettre la recherche sur certains champs
    search_fields = ('path', 'page', 'context', 'role', 'orientation')
    
    # Ajouter des filtres sur les colonnes
    list_filter = ('page', 'context', 'role', 'orientation')

    def image_preview(self, obj):
        if obj.image:
            # Afficher une miniature de l'image (ici, on retourne une balise HTML)
            # Pour que le HTML soit rendu dans l'admin, il faut autoriser le "formatage" en utilisant "allow_tags=True" dans Django < 2.0,
            # Pour Django 2.x et plus, il faut utiliser "format_html"
            from django.utils.html import format_html
            return format_html('<img src="{}" style="max-width: 100px; max-height: 100px;" />', obj.image.url)
        return "Aucune image"
    
    image_preview.short_description = "Aperçu"  # Nom de la colonne dans l'admin
# Register your models here.
admin.site.register(Photo, PhotoAdmin)
