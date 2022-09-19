import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getArtists } from "../managers/ArtistManager"
import { getSingleShow, updateShow } from "../managers/ShowManager"
import { getStages } from "../managers/StageManager"

export const EditShow = () => {
    //setting up initial state for stages
    const [stages, setStages] = useState([])
    //setting up initial state for artists
    const [artists, setArtists] = useState([])
    //assigning the currentShow state to an object of key value pairs 
    const [show, setEditShow] = useState({
        artistId: 0,
        date: "",
        start_time: "",
        stageId: 0
    })

    /*invoking useParams and assigning its return value to showId. This hook returns an object of 
    key/value pairs of the dynamic params from the current URL that were matched by the <Route path>*/
    const { showId } = useParams()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //observes and invokes getter functions and sets them to their respective states
    useEffect(() => {
        getStages().then(data => setStages(data))
        getArtists().then(data => setArtists(data))
    }, [])

    //observes and invokes getSingleShow by the showId param and sets it into the editShow state 
    useEffect(() => {
        getSingleShow(showId).then(data => setEditShow(data))
    }, [showId])

    //function to submit the updated show 
    const handleSubmit = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        updateShow(showId, show).then((data) => {
            navigate("/fridaySchedule")
        })
    }

    //function to change copy of the initial show state and set the new show value to the state
    const changeShowState = (event) => {
        const showCopy = { ...show } //creating a copy of the initial show state
        showCopy[event.target.name] = event.target.value
        setEditShow(showCopy)
    }

    //HTML for the edit show form
    return <>
        <form className="showForm">
            <h2 className="showForm__artist_name">Edit Show</h2>
            <fieldset>
                <div>
                <label htmlFor="artistId">Artist: </label>
                    <select className="form-control" name="artist" value={show.artist?.id} required onChange={changeShowState}>
                    <option value="0">Choose Artist</option>
                    {/* mapping through the artists to display as a drop down menu */}
                    {
                        artists.map(artist => {
                            return <option value={artist.id} key={`artist--${artist.id}`}>{artist.artist_name}</option>
                        })
                    }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required className="form-control" value={show.date}
                        onChange={changeShowState} />
                </div>
            </fieldset>

            <fieldset>
                <div>
                <label htmlFor="start_time">Start Time: </label>
                <input type="time" id="appt" name="start_time"
                    min="09:00:00" max="18:00:00" required className="form-control" value={show.start_time}
                    onChange={changeShowState} />
                </div>
            </fieldset>

            <fieldset>
                <div>
                <label htmlFor="stageId">Stage: </label>
                    <select className="form-control" name="stage" value={show.stage?.id} required onChange={changeShowState}>
                    <option value="0">Choose Stage</option>
                    {/* mapping through the stages to display as a drop down menu */}
                    {
                        stages.map(stage => {
                            return <option value={stage.id} key={`stage--${stage.id}`}>{stage.stage_name}</option>
                        })
                    }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={handleSubmit} //when save is clicked the handleSubmit function is triggered
                className="button is-success">
                Save
            </button>
            {/* when cancel is clicked it navigates the user back to the friday schedule */}
            <button onClick={() => navigate("/fridaySchedule")}>Cancel</button>
        </form>
    </>
}