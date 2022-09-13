import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createNewArtist } from "../managers/ArtistManager"

import { getStages } from "../managers/StageManager"


export const ArtistForm = () => {
    const navigate = useNavigate()
    const [stages, setStages] = useState([])

    useEffect(() => {
        getStages().then(data => setStages(data))
    }, [])

    const [currentArtist, setCurrentArtist] = useState({
        artist_name: "",
        genre: "",
        artist_description: "",
        artist_image: ""
    })

    const changeArtistState = (domEvent) => {
        const newArtist = { ...currentArtist }
        newArtist[domEvent.target.name] = domEvent.target.value
        setCurrentArtist(newArtist)
    }

    return (
        <>
            <form className="artistForm">
                <h2 className="artistForm__artist_name">Create New Artist</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="artist_name">Artist: </label>
                        <input type="text" name="artist_name" required autoFocus className="form-control" value={currentArtist.artist_name}
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
                    event.preventDefault()

                    const artist = {
                        artist_name: currentArtist.artist_name,
                        genre: currentArtist.genre,
                        artist_description: currentArtist.artist_description,
                        artist_image: currentArtist.artist_image
                    }
                    /*Send post request to API*/
                    createNewArtist(artist)
                        .then(() => navigate("/artistList"))
                }}
                    className="btn btn-primary">Create Artist</button>
            </form>
        </>
    )
}