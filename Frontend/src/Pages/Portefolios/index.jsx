import { useEffect, useState } from "react";
import './style.scss';

// Déclaré en dehors du composant pour qu'il soit instable (créé une seule fois)
const photos = import.meta.glob('./photos/studio/*.jpg', { eager: true });

export default function PortefoliosPage() {
  const [photoPaths, setPhotoPaths] = useState([]);

  useEffect(() => {
    const paths = Object.values(photos).map(module => module.default);

    console.log(paths)
    setPhotoPaths(paths);
  }, []); // Plus de dépendances, l'effet s'exécute une seule fois

  return (
    <div id="portefolios-main-container">

        {photoPaths.map((path, index) => (
            <img loading="lazy" key={index} src={path} alt={`Photo ${index}`} />
        ))}

    </div>
  );
}