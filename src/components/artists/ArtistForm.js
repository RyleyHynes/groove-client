import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createNewArtist } from "../managers/ArtistManager"
import { getStages } from "../managers/StageManager"

//function to display the form for a new artist submission
export const ArtistForm = () => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()
    //assigning the currentArtist state to an object of key value pairs that are all set to empty strings
    const [currentArtist, setCurrentArtist] = useState({
        artist_name: "",
        genre: "",
        artist_description: "",
        artist_image: ""
    })

    //function to change copy of the initial state and set it to the state
    const changeArtistState = (domEvent) => {
        const newArtist = { ...currentArtist } //creating a copy of the initial state
        newArtist[domEvent.target.name] = domEvent.target.value
        setCurrentArtist(newArtist)
    }

    //HTML for the artist form that the user sees
    return (
        <>
            <form className="artistForm">
                <h2 className="artistForm__artist_name">Create New Artist</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="artist_name">Artist: </label>
                        <input type="text" name="artist_name" required autoFocus className="form-control" value={currentArtist.artist_name}
                            // when the value of the input changes we trigger the changeArtistFunction
                            onChange={changeArtistState} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="genre">Genre: </label>
                        <input type="text" name="genre" required autoFocus className="form-control" value={currentArtist.genre}
                            onChange={changeArtistState} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="artist_description">Description: </label>
                        <input type="text" name="artist_description" required autoFocus className="form-control" value={currentArtist.artist_description}
                            onChange={changeArtistState} />
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="artist_image">Artist Image(URL): </label>
                    <div>
                        <input type="text" name="artist_image" required className="form-control" value={currentArtist.artist_image}
                            onChange={changeArtistState} />
                    </div>
                </fieldset>

                <button type="submit" onClick={event => {
                    //preventing browser reload/refresh
                    event.preventDefault()
                    
                    //artist object to be sent to API
                    const artist = {
                        artist_name: currentArtist.artist_name,
                        genre: currentArtist.genre,
                        artist_description: currentArtist.artist_description,
                        artist_image: currentArtist.artist_image
                    }
                    /*Send POST request to API containing the artist object above*/
                    createNewArtist(artist)
                        .then(() => navigate("/artistList")) //navigating back to the artist list after submission
                }}
                    className="btn btn-primary">Create Artist</button>
            </form>
        </>
    )
}