/*Getter Function for myShows*/
export const getMyShows = () => {
    return fetch(`http://localhost:8000/myshows`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
        .then(res => res.json())
}


export const getSearchMyShows = (search) => {
    return fetch(`http://localhost:8000/myshows?user=${localStorage.getItem('groove_user')}&search=${search}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
        .then(res => res.json())
}

/*POST Function for new creation of myShow */
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

/*Delete Function for MyShow */
export const deleteMyShow = (id) => {
    return fetch(`http://localhost:8000/myshows/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
}