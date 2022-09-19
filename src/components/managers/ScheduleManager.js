/*Getter Function for friday schedule*/
export const getFridaySchedule = () => {
    return fetch("http://localhost:8000/shows?show_date=2022-10-21", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
    .then(res => res.json())
}

/*Getter Function for saturday schedule*/
export const getSaturdaySchedule = () => {
    return fetch("http://localhost:8000/shows?show_date=2022-10-22", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
    .then(res => res.json())
}