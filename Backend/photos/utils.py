from PIL import Image
import os
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO

def compress_image(uploaded_file, scale=0.33, quality=85):
    """
    Redimensionne l'image puis la ré-enregistre dans son format d'origine
    avec le niveau de qualité spécifié.
    """
    img = Image.open(uploaded_file)
    new_size = (int(img.width * scale), int(img.height * scale))
    resized = img.resize(new_size, Image.LANCZOS)

    buffer = BytesIO()
    fmt = img.format or 'JPEG'
    resized.save(buffer, format=fmt, quality=quality)
    buffer.seek(0)

    name, ext = os.path.splitext(uploaded_file.name)
    new_name = f"{name}{ext}"  # même extension
    size = buffer.getbuffer().nbytes

    return InMemoryUploadedFile(
        file=buffer,
        field_name=getattr(uploaded_file, 'field_name', 'image'),
        name=new_name,
        content_type=uploaded_file.content_type,
        size=size,
        charset=None,
    )
  
  
def convert_to_webp(uploaded_file, quality=100, lossless=True):
    """
    Convertit une image dans n'importe quel format en WebP en qualité maximale.
    Si lossless=True utilise le mode sans perte, sinon quality=100.
    """
    img = Image.open(uploaded_file)

    buffer = BytesIO()
    # Paramètres pour WebP en qualité max
    save_kwargs = {'format': 'WEBP'}
    if lossless:
        save_kwargs['lossless'] = True
    else:
        save_kwargs['quality'] = quality

    img.save(buffer, **save_kwargs)
    buffer.seek(0)

    name = os.path.splitext(uploaded_file.name)[0] + '.webp'
    size = buffer.getbuffer().nbytes

    return InMemoryUploadedFile(
        file=buffer,
        field_name=getattr(uploaded_file, 'field_name', 'image'),
        name=name,
        content_type='image/webp',
        size=size,
        charset=None,
    )