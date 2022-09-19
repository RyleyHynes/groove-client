import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getSingleArtist, updateArtist } from "../managers/ArtistManager"

export const EditArtist = () => {
    //assigning the artist state to an object of key value pairs that are all set to empty strings
    const [artist, setArtist] = useState({
        artist_name: "",
        genre: "",
        artist_description: "",
        artist_image: ""
    })

    /*invoking useParams and assigning its return value to artistId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const { artistId } = useParams()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    /*getting the singleArtist from the ArtistsManager.js file by the artistId param and setting 
    that data into the artists state*/
    useEffect(() => {
        getSingleArtist(artistId).then(data => setArtist(data))
    }, [artistId])

    //handles the submission of an artist edit
    const handleSubmit = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        //Invoking the PUT method in the ArtistManager.js file and navigating back to the artist list
        updateArtist(artistId, artist).then((data) => {
            navigate(`/artistList`)
        })
    }

    //function to change copy of the initial artist state and set the new artist value to the state
    const changeArtistState = (event) => {
        const artistCopy = { ...artist } //creating a copy of the artist state
        artistCopy[event.target.name] = event.target.value
        setArtist(artistCopy)
    }

    //HTML form the user will see to update the artist
    return <>
        <form className="artistForm">
            <h2 className="updateArtist">Update Artist</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="artist_name" className="label">Artist Name:</label>
                    <div className="control">
                        <input className="input" required autoFocus
                            type="text"
                            value={artist.artist_name}
                            name="artist_name"
                            //When the value changes the changeArtistState function is triggered
                            onChange={changeArtistState} />
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Genre:</label>
                    <div className="control">
                        <input className="input" required autoFocus
                            type="text"
                            value={artist.genre}
                            name="genre"
                            onChange={changeArtistState} />
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Description:</label>
                    <div className="control">
                        <input className="input" required autoFocus
                            type="text"
                            value={artist.artist_description}
                            name="artist_description"
                            onChange={changeArtistState} />
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>URL Image:</label>
                    <div className="control">
                        <input className="input" required autoFocus
                            type="text"
                            value={artist.artist_image}
                            name="artist_image"
                            onChange={changeArtistState} />
                    </div>
                </div>
            </fieldset>
        
            <button type="submit"
                onClick={handleSubmit} //when save is clicked the handleSubmit function is triggered
                className="button is-success">
                Save
            </button>
            {/* when cancel is clicked it navigates the user back to the artist list */}
            <button onClick={() => navigate("/artistList")}>Cancel</button>
        </form>
    </>
}