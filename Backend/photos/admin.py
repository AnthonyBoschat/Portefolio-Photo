from django.contrib import admin
from .models import Photo, Artisan, Portefolio, Prestation
from django.utils.html import format_html


class PhotoAdmin(admin.ModelAdmin):

    # Définir les colonnes à afficher dans la liste
    list_display = ('id', 'image', 'role', 'orientation', 'position', 'image_preview')
    
    # Permettre la recherche sur certains champs
    search_fields = ('orientation', 'role')
    
    # Ajouter des filtres sur les colonnes
    list_filter = ('orientation', 'role', ('artisans', admin.RelatedOnlyFieldListFilter))

    def image_preview(self, obj):
        if obj.image:
            # Afficher une miniature de l'image (ici, on retourne une balise HTML)
            # Pour que le HTML soit rendu dans l'admin, il faut autoriser le "formatage" en utilisant "allow_tags=True" dans Django < 2.0,
            # Pour Django 2.x et plus, il faut utiliser "format_html"
            from django.utils.html import format_html
            return format_html('<img src="{}" style="max-width: 100px; max-height: 100px;" />', obj.image.url)
        return "Aucune image"
    
    image_preview.short_description = "Aperçu"  # Nom de la colonne dans l'admin






class BasePhotoInline(admin.TabularInline):
    """
    Inline abstrait pour afficher un aperçu des photos liées
    via un modèle intermédiaire ManyToManyField.
    """
    extra = 0
    readonly_fields = ('photo_preview',)
    fields = ('photo_preview',)

    def photo_preview(self, obj):
        # 'photo' est le nom du ForeignKey sur le modèle through
        if obj.photo.image:
            return format_html(
                '<img src="{}" style="max-width:100px;max-height:100px;" />',
                obj.photo.image.url
            )
        return "Aucune image"
    photo_preview.short_description = "Aperçu"

# On crée autant d’inlines que de relations ManyToManyField
class ArtisanPhotoInline(BasePhotoInline):
    model = Artisan.photos.through

class PortefolioPhotoInline(BasePhotoInline):
    model = Portefolio.photos.through

class PrestationPhotoInline(BasePhotoInline):
    model = Prestation.photos.through

class ArtisanAdmin(admin.ModelAdmin):
    inlines = [ArtisanPhotoInline]
    list_display = ('id', 'name')
    
class PortefolioAdmin(admin.ModelAdmin):
    inlines = [PortefolioPhotoInline]
    list_display = ('id', 'name')
    
class PrestationAdmin(admin.ModelAdmin):
    inlines = [PrestationPhotoInline]
    list_display = ('id', 'name', "price", "duration", "delivery", "description")
    
# Register your models here.
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Artisan, ArtisanAdmin)
admin.site.register(Portefolio, PortefolioAdmin)
admin.site.register(Prestation, PrestationAdmin)
