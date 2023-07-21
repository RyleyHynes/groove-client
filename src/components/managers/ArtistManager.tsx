/* Getter Functions for all artists and single artist*/
export const getArtists = () => {
    return fetch("http://localhost:8000/artists", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
    .then(res => res.json())
}

/* Getter Functions for single artist*/
export const getSingleArtist = (artistId) => {
    return fetch(`http://localhost:8000/artists/${artistId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
        .then(response => response.json())
}

export const getSearchArtists = (search) => {
    return fetch(`http://localhost:8000/artists?search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
        .then(res => res.json())
}

/* POST Function for creation of new artist*/
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

/* PUT Function for updating an existing artist*/
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

/* DELETE Function for existing artist*/
export const deleteArtist = (artistId) => {
    return fetch(`http://localhost:8000/artists/${artistId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
}