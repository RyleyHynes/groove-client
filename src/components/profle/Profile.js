import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { editUserImage, getProfileShows, getSingleProfile } from "../managers/ProfileManager"
import { FaUserCircle } from 'react-icons/fa';


export const ProfileDetails = (userId) => {
    const [profile, setProfile] = useState([])
    const [shows, setShows] = useState([])

    const {profileId} = useParams()
    
    /*Get current user from local storage*/
    const currentUserId = parseInt(localStorage.getItem('user_id'))

    const getProfileWithShows = () => {
        getSingleProfile(profileId).then(data => setProfile(data))
        getProfileShows(profileId).then(setShows)
    }

    useEffect(()=> {
        getProfileWithShows()
    }, [profileId])

    const [newImg, setImg] = useState("")

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setImg(base64ImageString)
        });
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);

    }
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
                        : <image className="image" src={`http://localhost:8000${profile.profile_image}`} />
                    }
                </header>
                <div className="profile__fullName">Name: {profile.user?.first_name} {profile.user?.last_name}</div>
                <div className="profile__username">UserName: {profile.user?.username}</div>
                <div className="profile__email">Email: {profile.user?.email}</div>
                <div className="profile__creationDate">{profile.user?.date_joined}</div>
                { currentUserId === profile.user?.id
                    ?<div>Show Count: {shows.length}</div>
                    :<></>
                }
                <h3>Choose Profile Image:</h3>
                <input type="file" id="game_image" name="action_pic" onChange={createImageString} />
                <input type="hidden" name="game_id" value={profile.id} /> 
                <button onClick={() => {
                    editUserImage(profile, newImg)
                        .then(() => getSingleProfile(profileId).then(data => setProfile(data)))
                }}>Upload</button><br />
                <footer>
                    {
                        profile.user?.is_staff === true
                            ? <div className="profile__usertype">Staff</div>
                            : <div className="profile__usertype">Author</div>
                    }
                </footer>
            </section>
        </article>
    )
}