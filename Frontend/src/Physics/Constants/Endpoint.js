// const BACKURL = "http://127.0.0.1:8000/api"
const BACKURL = "/api"

const ENDPOINT = {
    UPLOAD:`${BACKURL}/upload/`,
    LOAD:(type, subject) => `${BACKURL}/photos?type=${type}&subject=${subject}`,
    getArtisans:`${BACKURL}/photos/get_artisans/`,
    getThisArtisanPhoto:(idArtisan) => `${BACKURL}/photos/get_artisan_photo?id_artisan=${idArtisan}`,
    sendEmail:`${BACKURL}/sendmail/`
}

export default ENDPOINT