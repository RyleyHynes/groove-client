export const getStages = () => {
    return fetch(`http://localhost:8000/stages`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
        .then(response => response.json())
}