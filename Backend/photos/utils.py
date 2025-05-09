from PIL import Image
import os
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO

def process_and_convert_image(uploaded_file, scale=0.33, quality=95):
    """
    Traite une image uploadée :
      - Redimensionne l'image à 33% de ses dimensions d'origine
      - La convertit en WebP avec une qualité de 90%
    Retourne un InMemoryUploadedFile prêt à être sauvegardé dans le modèle.
    """
    # Ouvre l'image depuis l'upload
    img = Image.open(uploaded_file)
    
    # Calcul des nouvelles dimensions
    new_width = int(img.width * scale)
    new_height = int(img.height * scale)
    
    # Redimensionne l'image en conservant les proportions
    resized_img = img.resize((new_width, new_height), Image.LANCZOS)
    
    # Sauvegarde dans un buffer en mémoire
    buffer = BytesIO()
    resized_img.save(buffer, format='WEBP', quality=quality)
    buffer.seek(0)
    
    # Crée un nouveau InMemoryUploadedFile
    file_size = buffer.getbuffer().nbytes
    new_file = InMemoryUploadedFile(
        file=buffer,
        field_name=getattr(uploaded_file, 'field_name', 'image'),
        name=os.path.splitext(uploaded_file.name)[0] + '.webp',
        content_type='image/webp',
        size=file_size,
        charset=None
    )
    
    return new_file