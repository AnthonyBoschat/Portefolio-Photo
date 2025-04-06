function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
        }
    }
    return cookieValue;
}

export default function csrfFetch(url, options = {}) {
    const csrfToken = getCookie('csrftoken')
    
    // Configuration par défaut
    const defaultOptions = {
      credentials: 'include', // pour envoyer et recevoir les cookies
      headers: {
        // 'Content-Type': 'application/json',
        // Ajoutez l'en-tête CSRF si le token existe
        ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {})
      }
    }
  
    // Fusionner les options passées en argument avec les options par défaut
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...(options.headers || {})
      }
    }
  
    return fetch(url, mergedOptions)
  }