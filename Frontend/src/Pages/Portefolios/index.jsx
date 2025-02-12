import { useEffect, useState } from "react";
import './style.scss';

// const photos = import.meta.glob('./photos/studio/*.jpg', { eager: true });
const photos = import.meta.glob('./photos/low/*.webp', { eager: true });

export default function PortefoliosPage() {
  const [photoPaths, setPhotoPaths] = useState([]);

  useEffect(() => {
    const paths = Object.values(photos).map(module => module.default);
    setPhotoPaths(paths);
  }, [])

  return (
    <div id="portefolios-main-container">

        {photoPaths.map((path, index) => (
            <img loading="lazy" key={index} src={path} alt={`Photo ${index}`} />
        ))}

    </div>
  );
}