import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getArtists } from "../managers/ArtistManager"
import { createNewShow } from "../managers/ShowManager"
import { getStages } from "../managers/StageManager"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const ShowForm = () => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()
    //setting up initial state for stages
    const [stages, setStages] = useState([])
    //setting up initial state for artists
    const [artists, setArtists] = useState([])

    //observes and invokes getter functions and sets them to their respective states
    useEffect(() => {
        getStages().then(data => setStages(data))
        getArtists().then(data => setArtists(data))
    }, [])

    //assigning the currentShow state to an object of key value pairs 
    const [currentShow, setCurrentShow] = useState({
        artistId: 0,
        date: "",
        start_time: "",
        stageId: 0
    })

    //function to change copy of the initial currentShow state and set the new currentShow value to the state
    const changeShowState = (domEvent) => {
        const newShow = { ...currentShow } //creating a copy of the initial currentShow state
        newShow[domEvent.target.name] = domEvent.target.value
        setCurrentShow(newShow)
    }

    //HTML for the create new show form
    return (
        <>
            <Form>
                <h2 className="showForm__artist_name">Create New Show</h2>
                <Form.Group className="mb-3" controlId="formBasicArtist">
                    <Form.Label>Artist: </Form.Label>
                    <Form.Select className="form-control" name="artist" value={currentShow.artist} required onChange={changeShowState}>
                        <option value="0">Choose Artist</option>
                        {/* mapping through the artists to display as a drop down menu */}
                        {
                            artists.map(artist => {
                                return <option value={artist.id} key={`artist--${artist.id}`}>{artist.artist_name}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Date: </Form.Label>
                    <input type="date" name="date" required className="form-control" value={currentShow.date}
                        //When the value changes the changeShowState function is triggered
                        onChange={changeShowState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStartTime">
                    <Form.Label>Start Time: </Form.Label>
                    <input type="time" id="appt" name="start_time"
                        min="09:00:00" max="18:00:00" required className="form-control" value={currentShow.start_time}
                        onChange={changeShowState} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStage">
                    <Form.Label>Stage: </Form.Label>
                    <Form.Select className="form-control" name="stage" value={currentShow.stage} required onChange={changeShowState}>
                        <option value="0">Choose Stage</option>
                        {/* mapping through the stages to display as a drop down menu */}
                        {
                            stages.map(stage => {
                                return <option value={stage.id} key={`stage--${stage.id}`}>{stage.stage_name}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={event => {
                    event.preventDefault() //preventing browser reload/refresh
                    //show object to be sent to the API
                    const show = {
                        artist: parseInt(currentShow.artist),
                        date: currentShow.date,
                        start_time: currentShow.start_time,
                        stage: parseInt(currentShow.stage)
                    }
                    /*Invoking the POST method with the show object and then navigating to fridaysSchedule*/
                    createNewShow(show)
                        .then(() => navigate("/fridaySchedule"))
                }}
                    className="btn btn-primary">Create Show</Button>
                {/* when cancel is clicked it navigates the user back to the friday schedule */}
                <Button onClick={() => navigate("/fridaySchedule")}>Cancel</Button>
            </Form>
        </>
    )
}