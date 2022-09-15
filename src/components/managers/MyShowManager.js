export const getMyShows = () => {
    return fetch(`http://localhost:8000/myshows`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
        .then(res => res.json())
}

export const createMyShow = (show) => {
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



export const deleteMyShow = (id) => {
    return fetch(`http://localhost:8000/myshows/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
}