import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProfileShows, getSingleProfile } from "../managers/ProfileManager"
import { FaUserCircle } from 'react-icons/fa';


export const ProfileDetails = (userId) => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()
    const [profile, setProfile] = useState([])
    const [shows, setShows] = useState([])

    /*invoking useParams and assigning its return value to profileId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const {profileId} = useParams()
    
    /*Get current user from local storage*/
    const currentUserId = parseInt(localStorage.getItem('user_id'))

    //function to get a single profile and that profiles shows and set them both into respective states
    const getProfileWithShows = () => {
        getSingleProfile(profileId).then(data => setProfile(data))
        getProfileShows(profileId).then(setShows)
    }

    //use effect to invoke the getProfileWithShows while watching the profileId and re-rendering when it changes
    useEffect(()=> {
        getProfileWithShows()
    }, [profileId])

    

    //HTML to display the current users profile
    return (
        <article className="profiles">
            <section key={`profile--${profile.id}`} className="profile">
                <header>
                    {
                        profile.profile_image === ""
                        ? <figure className="media-left">
                            <span className="icon is-large">
                                <FaUserCircle size={'3rem'} />
                            </span>
                        </figure>
                        : <img className="image" src={`http://localhost:8000${profile.profile_image}`} alt="usersProfileImage"/>
                    }
                </header>
                <div className="profile__fullName">Name: {profile.user?.first_name} {profile.user?.last_name}</div>
                <div className="profile__username">UserName: {profile.user?.username}</div>
                <div className="profile__email">Email: {profile.user?.email}</div>
                <div className="profile__creationDate">Date Joined: {profile.user?.date_joined}</div>
                {/* displays the number of shows they have added to their custom schedule */}
                { currentUserId === profile.user?.id
                    ?<div>Show Count: {shows.length}</div>
                    :<></>
                }
                
                <footer>
                    {/* displays type of user */}
                    {
                        profile.user?.is_staff === true
                            ? <div className="profile__usertype">Staff</div>
                            : <div className="profile__usertype">Author</div>
                    }
                </footer>
                {/* button to navigate to the edit profile form */}
                <button className="button is-warning" onClick={() => navigate(`/profiles/${profile.user?.id}/edit`)}>Edit Info</button>
            </section>
        </article>
    )
}