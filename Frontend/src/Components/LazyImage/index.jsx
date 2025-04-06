import { useEffect, useState } from "react";


export default function LazyImage({ src, alt, onClick }){

  const [aspectRatio, setAspectRatio] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Réinitialiser l'état pour forcer le rechargement
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          setAspectRatio(img.naturalWidth / img.naturalHeight);
        }
      };
  }, [src]);

  // Si on connaît le ratio, on peut calculer un padding-bottom pour le conteneur
  // padding-bottom = (hauteur / largeur) * 100%
  const paddingBottom = aspectRatio ? `${100 / aspectRatio}%` : '100%';

  return (
    <picture
      onClick={onClick}
      className="photo-container"
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: paddingBottom, // réserve l'espace en fonction du ratio
        overflow: 'hidden',
        height:"100%"
        // backgroundColor: '#f0f0f0' // couleur de fond pour masquer le chargement
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover', // ou 'contain' selon l'effet désiré
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in'
        }}
      />
    </picture>
  );
};