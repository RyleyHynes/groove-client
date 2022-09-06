/* Getter Functions */
export const getFridaySchedule = () => {
    return fetch(`http://localhost:8088/shows?show_date=2022-10-21`)
    .then(response => response.json())
}

export const getSaturdaySchedule = () => {
    return fetch(`http://localhost8088/shows?show_date=2022-10-22`)
    .then(response => response.json())
}
