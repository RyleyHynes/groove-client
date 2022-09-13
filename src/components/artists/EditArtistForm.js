import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getSingleArtist, updateArtist } from "../managers/ArtistManager"

export const EditArtist = () => {
    const [artist, setArtist] = useState({
        artist_name: "",
        genre: "",
        artist_description: "",
        artist_image: ""
    })

    const { artistId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getSingleArtist(artistId).then(data => setArtist(data))
    }, [artistId])


    const handleSubmit = (evt) => {
        evt.preventDefault()
        updateArtist(artistId, artist).then((data) => {
            navigate(`/artists/${artistId}`)
        })
    }

    const changeArtistState = (event) => {
        const artistCopy = { ...artist }
        artistCopy[event.target.name] = event.target.value
        setArtist(artistCopy)
    }
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
                onClick={handleSubmit}
                className="button is-success">
                Save
            </button>

            <button onClick={() => navigate("/artistList")}>Cancel</button>
        </form>
    </>
}