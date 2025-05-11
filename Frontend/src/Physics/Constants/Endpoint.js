// const BACKURL = "http://127.0.0.1:8000/api"
const BACKURL = "/api"

const ENDPOINT = {
    UPLOAD:`${BACKURL}/upload/`,
    LOAD:(type, subject) => `${BACKURL}/photos?type=${type}&subject=${subject}`,
    getArtisans:`${BACKURL}/photos/get_artisans/`,
    getThisArtisanPhoto:(idArtisan) => `${BACKURL}/photos/get_artisan_photo?id_artisan=${idArtisan}`,
    sendEmail:`${BACKURL}/sendmail/`,
    ADMIN:{
        token:`${BACKURL}/token/`,
        refresh:`${BACKURL}/token/refresh/`,
        verify:`${BACKURL}/token/verify/`,
        PORTEFOLIOS:{
            UPLOAD:(id)=>`${BACKURL}/admin/portefolios/${id}/upload-photos/`,
            DELETE:(portefolio_id, photo_id) => `${BACKURL}/admin/portefolios/${portefolio_id}/photos/${photo_id}/`,
            CHANGE_REPRESENTANT:(portefolio_id, photo_id) => `${BACKURL}/admin/portefolios/${portefolio_id}/photos/${photo_id}/change-role-representant/`,
        },
        PRESTATIONS:{
            UPLOAD:(id)=>`${BACKURL}/admin/prestations/${id}/upload-photos/`,
            DELETE:(prestation_id, photo_id) => `${BACKURL}/admin/prestations/${prestation_id}/photos/${photo_id}/`,
            CHANGE_REPRESENTANT:(prestation_id, photo_id) => `${BACKURL}/admin/prestations/${prestation_id}/photos/${photo_id}/change-role-representant/`,
            UPDATE_INFORMATIONS:(prestation_id) => `${BACKURL}/admin/prestations/${prestation_id}/update-informations/`,
        },
        ARTISANS:{
            UPLOAD:(id)=>`${BACKURL}/admin/artisans/${id}/upload-photos/`,
            DELETE:(artisan_id, photo_id) => `${BACKURL}/admin/artisans/${artisan_id}/photos/${photo_id}/`,
            CHANGE_REPRESENTANT:(artisan_id, photo_id) => `${BACKURL}/admin/artisans/${artisan_id}/photos/${photo_id}/change-role-representant/`,
            ADD: `${BACKURL}/admin/artisans/add/`,
            DELETE:(artisan_id) =>  `${BACKURL}/admin/artisans/${artisan_id}/delete/`,
            CHANGE_NAME:(artisan_id) =>  `${BACKURL}/admin/artisans/${artisan_id}/change_name/`,
        },
    },
    PORTEFOLIOS:{
        GET:(id) => `${BACKURL}/portefolios?id=${id}`,
        LIST:`${BACKURL}/portefolios/`,
    },
    PRESTATIONS:{
        GET:(id) => `${BACKURL}/prestations?id=${id}`,
        LIST:`${BACKURL}/prestations/`,
    },
    ARTISANS:{
        GET:(id) => `${BACKURL}/artisans?id=${id}`,
        LIST:`${BACKURL}/artisans/`
    },
}

export default ENDPOINT