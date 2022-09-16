import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getArtists } from "../managers/ArtistManager"
import { getSingleShow, updateShow } from "../managers/ShowManager"
import { getStages } from "../managers/StageManager"

export const EditShow = () => {
    const [stages, setStages] = useState([])
    const [artists, setArtists] = useState([])
    const [show, setEditShow] = useState({
        artistId: 0,
        date: "",
        start_time: "",
        stageId: 0
    })


    const { showId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getStages().then(data => setStages(data))
        getArtists().then(data => setArtists(data))
    }, [])

    useEffect(() => {
        getSingleShow(showId).then(data => setEditShow(data))
    }, [showId])

    const handleSubmit = (evt) => {
        evt.preventDefault()
        updateShow(showId, show).then((data) => {
            navigate("/fridaySchedule")
        })
    }

    const changeShowState = (event) => {
        const showCopy = { ...show }
        showCopy[event.target.name] = event.target.value
        setEditShow(showCopy)
    }
    return <>
        <form className="showForm">
            <h2 className="showForm__artist_name">Create New Show</h2>
            <fieldset>
                <div>
                <label htmlFor="artistId">Artist: </label>
                    <select className="form-control" name="artist" value={show.artist?.id} required onChange={changeShowState}>
                    <option value="0">Choose Artist</option>
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
                    {
                        stages.map(stage => {
                            return <option value={stage.id} key={`stage--${stage.id}`}>{stage.stage_name}</option>
                        })
                    }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={handleSubmit}
                className="button is-success">
                Save
            </button>

            <button onClick={() => navigate("/fridaySchedule")}>Cancel</button>
        </form>
    </>
}