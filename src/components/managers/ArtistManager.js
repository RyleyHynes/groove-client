/* Getter Functions */
export const getArtists = () => {
    return fetch("http://localhost:8000/artists", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
    .then(res => res.json())
}

export const getSingleArtist = (artistId) => {
    return fetch(`http://localhost:8000/artists/${artistId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
        .then(response => response.json())
}

export const createNewArtist = (artist) => {
    return fetch("http://localhost:8000/artists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        },
        body: JSON.stringify(artist)
    })
        .then(res => res.json())
}

export const updateArtist = (artistId, artist) => {
    return fetch(`http://localhost:8000/artists/${artistId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artist)
    })
}

export const deleteArtist = (artistId) => {
    return fetch(`http://localhost:8000/artists/${artistId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
}