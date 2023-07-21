import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getSingleArtist, updateArtist } from "../managers/ArtistManager"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
        <Form>
            <h2 className="showForm_title">Update Artist</h2>
            <Form.Group className="mb-3" controlId="formBasicArtist">
                <Form.Label className="profile_edit">Artist Name:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={artist.artist_name}
                    name="artist_name"
                    //When the value changes the changeArtistState function is triggered
                    onChange={changeArtistState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
                <Form.Label className="profile_edit">Genre:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={artist.genre}
                    name="genre"
                    onChange={changeArtistState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label className="profile_edit">Description:</Form.Label>
                <Form.Control required autoFocus
                    as="textarea" rows={2}
                    value={artist.artist_description}
                    name="artist_description"
                    onChange={changeArtistState} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicURL">
                <Form.Label className="profile_edit">URL Image:</Form.Label>
                <Form.Control className="input" required autoFocus
                    type="text"
                    value={artist.artist_image}
                    name="artist_image"
                    onChange={changeArtistState} />
            </Form.Group>

            <Button type="submit"
                onClick={handleSubmit} //when save is clicked the handleSubmit function is triggered
                className="button is-success">
                Save
            </Button>
            {/* when cancel is clicked it navigates the user back to the artist list */}
            <Button onClick={() => navigate("/artistList")}>Cancel</Button>
        </Form>
    </>
}