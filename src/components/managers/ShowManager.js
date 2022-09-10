export const getMyShows = (date) => {
    return fetch(`http://localhost:8000/myshows?show_date=${date}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
        .then(res => res.json())
}

export const getSingleShow = (showId) => {
    return fetch(`http://localhost:8000/shows/${showId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
        .then(response => response.json())
}


export const createShow = (show) => {
    return fetch("http://localhost:8000/myshows", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        },
        body: JSON.stringify(show)
    })
        .then(res => res.json())
}

export const editShow = (showId, show) => {
    return fetch(`http://localhost:8000/games/${showId}`, {
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