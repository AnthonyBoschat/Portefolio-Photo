export default function sortByPhotoType(photos){
    const photosPortrait = photos.filter(photo => photo.orientation === "portrait")
    const photosPaysage = photos.filter(photo => photo.orientation === "paysage")
    const arrangedPhotos = []

    while(photosPortrait.length && photosPaysage.length){
        if(photosPortrait.length >= 2){
            arrangedPhotos.push(photosPortrait.shift(), photosPortrait.shift())
        }
        arrangedPhotos.push(photosPaysage.shift())
    }

    // D'abord, on ajoute les photos paysage restantes (s'il y en a)
    if (photosPaysage.length) {
        arrangedPhotos.push(...photosPaysage);
    }

    // Ensuite, on ajoute TOUTES les photos portrait restantes à la toute fin
    if (photosPortrait.length) {
        arrangedPhotos.push(...photosPortrait);
    }

    return arrangedPhotos
}