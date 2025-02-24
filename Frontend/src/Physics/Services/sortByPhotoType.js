export default function sortByPhotoType(photos,  { reverse = false, portraitNumber = 2 } = {}){
    
    const photosPortrait = photos.filter(photo => photo.orientation === "portrait")
    const photosPaysage = photos.filter(photo => photo.orientation === "paysage")
    const arrangedPhotos = []

    while(photosPortrait.length && photosPaysage.length){
        if(reverse && arrangedPhotos.length === 0){
            arrangedPhotos.push(photosPaysage.shift())
        }
        if(photosPortrait.length >= portraitNumber){
            for(let i = 0; i<portraitNumber; i++){
                arrangedPhotos.push(photosPortrait.shift())
            }
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