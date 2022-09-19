import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createNewArtist } from "../managers/ArtistManager"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//function to display the form for a new artist submission MVP
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
            <Form>
                <h2 className="artistForm__artist_name">Create New Artist</h2>
                <Form.Group className="mb-3" controlId="formBasicArtist">
                    <Form.Label>Artist: </Form.Label>
                    <Form.Control type="text" name="artist_name" required autoFocus className="form-control" value={currentArtist.artist_name}
                        // when the value of the Form.Control changes we trigger the changeArtistFunction
                        onChange={changeArtistState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGenre">
                    <Form.Label>Genre: </Form.Label>
                    <Form.Control type="text" name="genre" required autoFocus className="form-control" value={currentArtist.genre}
                        onChange={changeArtistState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description: </Form.Label>
                    <Form.Control as="textarea" rows={2} name="artist_description" required autoFocus className="form-control" value={currentArtist.artist_description}
                        onChange={changeArtistState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicArtistImage">
                    <Form.Label>Artist Image(URL): </Form.Label>
                    <Form.Control type="text" name="artist_image" required className="form-control" value={currentArtist.artist_image}
                        onChange={changeArtistState} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={event => {
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
                    className="btn btn-primary">Create Artist</Button>
                {/* when cancel is clicked it navigates the user back to the artist list */}
                <Button onClick={() => navigate("/artistList")}>Cancel</Button>
            </Form>
        </>
    )
}