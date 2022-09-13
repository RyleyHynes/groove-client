import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getArtists } from "../managers/ArtistManager"
import { createNewShow} from "../managers/ShowManager"
import { getStages } from "../managers/StageManager"


export const ShowForm = () => {
    const navigate = useNavigate()
    const [stages, setStages] = useState([])
    const [artists, setArtists] = useState([])

    useEffect(() => {
        getStages().then(data => setStages(data))
        getArtists().then(data => setArtists(data))
    }, [])

    const [currentShow, setCurrentShow] = useState({
        artistId: 0,
        date: "",
        start_time: "",
        stageId: 0
    })

    const changeShowState = (domEvent) => {
        const newShow = {...currentShow}
        newShow[domEvent.target.name] = domEvent.target.value
        setCurrentShow(newShow)
    }

    return (
        <>
        <form className="showForm">
            <h2 className="showForm__artist_name">Create New Show</h2>
            <fieldset>
                <div>
                <label htmlFor="artistId">Artist: </label>
                    <select className="form-control" name="artist" value={currentShow.artist} required onChange={changeShowState}>
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
                    <input type="date" name="date" required className="form-control" value={currentShow.date}
                        onChange={changeShowState} />
                </div>
            </fieldset>

            <fieldset>
                <div>
                <label htmlFor="start_time">Start Time: </label>
                <input type="time" id="appt" name="start_time"
                    min="09:00:00" max="18:00:00" required className="form-control" value={currentShow.start_time}
                    onChange={changeShowState} />
                </div>
            </fieldset>

            <fieldset>
                <div>
                <label htmlFor="stageId">Stage: </label>
                    <select className="form-control" name="stage" value={currentShow.stage} required onChange={changeShowState}>
                    <option value="0">Choose Stage</option>
                    {
                        stages.map(stage => {
                            return <option value={stage.id} key={`stage--${stage.id}`}>{stage.stage_name}</option>
                        })
                    }
                    </select>
                </div>
            </fieldset>

            <button type="submit" onClick={event => {
                event.preventDefault()

                const show = {
                    artist: parseInt(currentShow.artist),
                    date: currentShow.date,
                    start_time: currentShow.start_time,
                    stage: parseInt(currentShow.stage)
                }
                /*Send post request to API*/
                createNewShow(show)
                    .then(() => navigate("/fridaySchedule"))
            }}
                className="btn btn-primary">Create Show</button>
        </form>
        </>
    )
}