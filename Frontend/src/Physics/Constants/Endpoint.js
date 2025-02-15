const BACKURL = "http://127.0.0.1:8000/api"

const ENDPOINT = {
    UPLOAD:`${BACKURL}/upload/`,
    LOAD:(type, subject) => `${BACKURL}/photos?type=${type}&subject=${subject}`
}

export default ENDPOINT