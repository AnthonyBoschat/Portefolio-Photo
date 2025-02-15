from django.contrib import admin
from .models import Photo, Artisan
from django.utils.html import format_html


class PhotoAdmin(admin.ModelAdmin):

    # Définir les colonnes à afficher dans la liste
    list_display = ('id', 'image', 'type', 'role', 'subject', 'orientation', 'position', 'image_preview')
    
    # Permettre la recherche sur certains champs
    search_fields = ('type', 'subject', 'orientation', 'role')
    
    # Ajouter des filtres sur les colonnes
    list_filter = ('type', 'subject', 'orientation', 'role', ('artisans', admin.RelatedOnlyFieldListFilter))

    def image_preview(self, obj):
        if obj.image:
            # Afficher une miniature de l'image (ici, on retourne une balise HTML)
            # Pour que le HTML soit rendu dans l'admin, il faut autoriser le "formatage" en utilisant "allow_tags=True" dans Django < 2.0,
            # Pour Django 2.x et plus, il faut utiliser "format_html"
            from django.utils.html import format_html
            return format_html('<img src="{}" style="max-width: 100px; max-height: 100px;" />', obj.image.url)
        return "Aucune image"
    
    image_preview.short_description = "Aperçu"  # Nom de la colonne dans l'admin






class PhotoInline(admin.TabularInline):
    model = Artisan.photos.through  # Utilise le modèle intermédiaire
    extra = 0  # Pas de formulaires supplémentaires
    readonly_fields = ('photo_preview',)  # Champ en lecture seule pour afficher la preview

    def photo_preview(self, obj):
        if obj.photo.image:
            return format_html(
                '<img src="{}" style="max-width: 100px; max-height: 100px;" />',
                obj.photo.image.url
            )
        return "Aucune image"

    photo_preview.short_description = "Aperçu"

    # Optionnel : si vous ne souhaitez pas afficher les autres champs (artisan/photo)
    # vous pouvez définir fields pour n'afficher que la preview :
    fields = ('photo_preview',)

class ArtisanAdmin(admin.ModelAdmin):
    inlines = [PhotoInline]
    list_display = ('id', 'name')
    
# Register your models here.
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Artisan, ArtisanAdmin)
