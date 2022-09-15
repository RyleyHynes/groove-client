import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getSingleProfile, updateProfile } from "../managers/ProfileManager"



export const EditProfile = () => {
    const [profile, setEditProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        profile_image: ""
    })


    const { profileId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        getSingleProfile(profileId).then(data => {
            data.first_name=data.user.first_name
            data.last_name=data.user.last_name
            data.email=data.user.email
            data.username=data.user.username

            setEditProfile(data)})
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault()
        updateProfile(profile, profileId).then((data) => {
            navigate(`/profiles/${profile.id}`)
        })
    }

    const changeProfileState = (event) => {
        const profileCopy = { ...profile }
        profileCopy[event.target.name] = event.target.value
        setEditProfile(profileCopy)
    }

        const createImageString = (event) => {
            getBase64(event.target.files[0], (base64ImageString) => {
                const copy = { ...profile }
                copy.data = base64ImageString
                setEditProfile(copy)
            })
        }

        const getBase64 = (file, callback) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(file);
        }

        return <>
            <form className="showForm">
                <h2 className="showForm__artist_name">Edit Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="first_name" className="label">First Name:</label>
                        <div className="control">
                            <input className="input" required autoFocus
                                type="text"
                                value={profile.first_name}
                                name="first_name"
                                onChange={changeProfileState} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="last_name" className="label">Last Name:</label>
                        <div className="control">
                            <input className="input" required autoFocus
                                type="text"
                                value={profile.last_name}
                                name="last_name"
                                onChange={changeProfileState} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email" className="label">Email:</label>
                        <div className="control">
                            <input className="input" required autoFocus
                                type="text"
                                value={profile.email}
                                name="email"
                                onChange={changeProfileState} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="username" className="label">UserName:</label>
                        <div className="control">
                            <input className="input" required autoFocus
                                type="text"
                                value={profile.username}
                                name="username"
                                onChange={changeProfileState} />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                <h3>Choose Profile Image:</h3>
                <input type="file" id="data" name="action_pic" onChange={createImageString} />
                <input type="hidden" name="data" value={profile.profile_image} /> 
                </fieldset>

                <button type="submit"
                    onClick={handleSubmit}
                    className="button is-success">
                    Save
                </button>

                <button onClick={() => navigate(`/profiles/${profile.id}`)}>Cancel</button>
            </form>
        </>
}