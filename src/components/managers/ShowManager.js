/*Getter function for a single show*/
export const getSingleShow = (showId) => {
    return fetch(`http://localhost:8000/shows/${showId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
        .then(response => response.json())
}

/*POST function for creating a new show*/
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

/*PUT function to edit an existing show*/
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

/*DELETE function for an existing show*/
export const deleteShow = (id) => {
    return fetch(`http://localhost:8000/shows/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
}