export const getSingleShow = (showId) => {
    return fetch(`http://localhost:8000/shows/${showId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
        .then(response => response.json())
}

export const createNewShow = (show) => {
    return fetch("http://localhost:8000/shows", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        },
        body: JSON.stringify(show)
    })
        .then(res => res.json())
}

export const updateShow = (showId, show) => {
    return fetch(`http://localhost:8000/shows/${showId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(show)
    })
}

export const deleteShow = (id) => {
    return fetch(`http://localhost:8000/shows/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
}