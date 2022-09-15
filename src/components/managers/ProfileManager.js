export const getProfiles = () => {
    return fetch("http://localhost:8000/profiles", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`
        }
    })
        .then(response => response.json())
}

export const getProfileShows = (profileId) => {
    return fetch(`http://localhost:8000/shows?user=${profileId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}



export const getSingleProfile = (profileId) => {
    return fetch(`http://localhost:8000/profiles/${profileId}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
        .then(res => res.json())
}

export const updateProfile = (profile, profileId) => {
    return fetch(`http://localhost:8000/profiles/${profileId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
}

export const editUserActive = (user) => {
    return fetch(`http://localhost:8000/profiles/${user.id}/user_active`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export const editUserStatus = (user, status) => {
    return fetch(`http://localhost:8000/profiles/${user.id}/user_status`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("groove_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ is_staff: status })
    })
}



export const checkDemoted = (user) => {
    return fetch(`http://localhost:8000/demotes?demotedUser=${user.id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
        .then(res => res.json())
}

export const createDemotion = (demote) => {
    return fetch('http://localhost:8000/demotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        },
        body: JSON.stringify(demote)
    }).then(res => res.json())
}

export const updateDemotion = (demote) => {
    return fetch(`http://localhost:8000/demotes/${demote.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        },
        body: JSON.stringify(demote)
    })
}

export const checkDeactive = (user) => {
    return fetch(`http://localhost:8000/deactives?deactivatedUser=${user.id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        }
    })
        .then(res => res.json())
}

export const createDeactive = (deactive) => {
    return fetch('http://localhost:8000/deactives', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        },
        body: JSON.stringify(deactive)
    }).then(res => res.json())
}

export const updateDeactive = (deactive) => {
    return fetch(`http://localhost:8000/deactives/${deactive.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('groove_token')}`
        },
        body: JSON.stringify(deactive)
    })
}