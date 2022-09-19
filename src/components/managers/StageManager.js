/*Getter function for all stages*/
export const getStages = () => {
    return fetch(`http://localhost:8000/stages`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
        .then(response => response.json())
}

/* POST Function for creation of new stage*/
export const createNewStage = (stage) => {
    return fetch("http://localhost:8000/stages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        },
        body: JSON.stringify(stage)
    })
        .then(res => res.json())
}

/* PUT Function for updating an existing stage*/
export const updateStage = (stageId, stage) => {
    return fetch(`http://localhost:8000/stages/${stageId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(stage)
    })
}

/* DELETE Function for existing stage*/
export const deleteStage = (stageId) => {
    return fetch(`http://localhost:8000/stages/${stageId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
}