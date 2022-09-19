import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { checkDeactive, checkDemoted, createDeactive, createDemotion, editUserActive, editUserStatus, getProfiles, updateDeactive, updateDemotion } from "../managers/ProfileManager"

//function that lists all the users profiles
export const ProfileList = (userId) => {
    //setting initial state for profiles as an empty array
    const [profiles, setProfiles] = useState([])
    //setting initial state for showInactive and setting it to false
    const [showInactive, setInactive] = useState(false)
    //setting initial state for showUserType and setting it to 0
    const [showUserType, setUserType] = useState(0)
    //setting initial state for status
    const [status, setStatus] = useState()

    //getting the profiles and setting them into state
    useEffect(() => {
        getProfiles().then(data => setProfiles(data))
    },[])

    //function to return the type of user
    const userType = (user) => {
        if(user.is_staff === true) {
            return <>Admin</>
        } else {
            return <>Author</>
        }
    }

    //function to return whether the user is active 
    const userActive = (user) => {
        if (user.is_active === true) {
            return <>Deactivate</>
        } else {
            return <>Activate</>
        }
    }

    
    const userInactive = () => {
        setInactive(!showInactive)
    }

    const userTypeForm = (evt) => {
        setUserType(parseInt(evt.target.id))
    }

    const userDemoteProcess = (profile, status) => {
        if (profile.user.is_staff === true) {
            checkDemoted(profile).then((data)=> {

            if ( (data.length !== 0) && (data[0]?.approveUser !== localStorage.getItem('user_id'))){
                data[0].secondApproveUser = localStorage.getItem('user_id')
                updateDemotion(data[0]).then(()=> editUserStatus(profile, status).then(()=> {
                    setUserType(0)
                    getProfiles().then(data => setProfiles(data))
                }))
            } else {
                const demote = {
                    demotedUser: profile.id,
                    approveUser: localStorage.getItem('user_id')
                }
                createDemotion(demote).then(()=> window.alert(`one more admin needed to confirm demotion`))
            }
        })
        } else {
            editUserStatus(profile, status).then(()=>setUserType(0)).then(()=> getProfiles().then(data => setProfiles(data)))
        }
    }

    const userDeactiveProcess = (profile) => {
        if (profile.user.is_staff === true) {
            checkDeactive(profile).then((data)=> {

            if ( (data.length !== 0) && (data[0]?.approveUser !== localStorage.getItem('user_id'))){
                data[0].secondApproveUser = localStorage.getItem('user_id')
                updateDeactive(data[0]).then(()=> 
                editUserActive(profile).then(() => {
                    setInactive(false)
                    getProfiles().then(data => setProfiles(data))
                }))
            } else {
                const deactive = {
                    deactivatedUser: profile.id,
                    approveUser: localStorage.getItem('user_id')
                }
                createDeactive(deactive).then(()=> window.alert(`one more admin needed to confirm deactivation`))
            }
        })
        } else {
            editUserActive(profile).then(() => setInactive(false)).then(() => getProfiles().then(data => setProfiles(data)))
        }
    }

    return <>
        <button onClick={() => userInactive()}>View Deactivated</button>
        {showInactive
            ? profiles.map((p) => {
                if (p.user.is_active === false) {
                    return <>
                        <p>Full Name: {p.user.first_name} {p.user.last_name}</p>
                        <button onClick={(evt) => {
                            evt.preventDefault()
                            editUserActive(p).then(() => setInactive(false)).then(() => getProfiles().then(data => setProfiles(data)))
                        }}>Reactivate</button>
                    </>
                } else{
                    return ""
                }
            })

            : <></>
        }
        <article className="profiles">
            <br />
            <h2><b>Active Users</b></h2>
            { 
                profiles.sort(((a, b) => { return a.user.username.localeCompare(b.user.username) })).map(profile => {
                    if (profile.user?.is_active) {
                        return <section key={`profile--${profile.id}`} className="profile">
                            <div className="profile__fullName">Full Name: {profile.user.first_name} {profile.user.last_name}</div>
                            <Link to={`/profiles/${profile.id}`} className="button is-Link is-light">Username: {profile.user.username}</Link>
                            <div className="profile__userType">User Type: {userType(profile.user)}</div>
                            {showUserType === 0 || showUserType != profile.id
                                ? localStorage.getItem('user_id') != profile.id
                                ?<button id={profile.id} onClick={(evt) => userTypeForm(evt)}>Edit User Type</button>
                                : <></>
                                : <></>
                            }
                            {showUserType === profile.id
                                ? <>
                                    <br />
                                    <input type="radio" id="Author" name="status" value="Author"
                                        onChange={
                                            () => {
                                                setStatus(false)
                                            }
                                        } />
                                    <label htmlFor="Author">Author</label>
                                    <input type="radio" id="Admin" name="status" value="Admin"
                                        onChange={
                                            () => {
                                                setStatus(true)
                                            }
                                        } />
                                    <label htmlFor="Admin">Admin</label>
                                    <button onClick={() => userDemoteProcess(profile, status)}>Save</button>
                                    <button onClick={() => setUserType(0)}>Cancel</button>
                                    <br />
                                </>
                                : <></>
                            }
                            {localStorage.getItem('user_id') != profile.id
                                ? <button onClick={(evt) => {
                                    evt.preventDefault()
                                    userDeactiveProcess(profile)
                                }}>{userActive(profile.user)}</button>
                                : <></>
                            }
                            <br /><br />
                        </section>
                    }
                })
            }
        </article>
    </>
}