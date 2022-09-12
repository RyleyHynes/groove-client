import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createNewShow} from "../managers/ShowManager"
import { getStages } from "../managers/StageManager"


export const ShowForm = () => {
    const navigate = useNavigate()
    const [stages, setStages] = useState([])

    useEffect(() => {
        getStages().then(data => setStages(data))
    }, [])

    const [currentShow, setCurrentShow] = useState({
        artist_name: "",
        genre: "",
        artist_description: "",
        date: "",
        start_time: "",
        stage: 0,
        artist_image: ""
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
                <div className="form-group">
                <label htmlFor="artist_name">Artist: </label>
                <input type="text" name="artist_name" required autoFocus className="form-control" value={currentShow.artist_name}
                    onChange={changeShowState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
            <label htmlFor="genre">Genre: </label>
                <input type="text" name="genre" required autoFocus className="form-control" value={currentShow.genre}
                    onChange={changeShowState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label htmlFor="artist_description">Description: </label>
                <input type="text" name="artist_description" required autoFocus className="form-control" value={currentShow.artist_description}
                    onChange={changeShowState} />
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
                    min="09:00" max="18:00" required className="form-control" value={currentShow.start_time}
                    onChange={changeShowState} />
                </div>
            </fieldset>

            <fieldset>
                <div>
                <label htmlFor="stage">Stage: </label>
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

            <fieldset>
                <label htmlFor="artist_image">Artist Image(URL): </label>
                <div>
                <input type="text" name="artist_image" required className="form-control" value={currentShow.artist_image}
                        onChange={changeShowState} />
                </div>
            </fieldset>

            <button type="submit" onClick={event => {
                event.preventDefault()

                const show = {
                    artist_name: currentShow.artist_name,
                    genre: currentShow.genre,
                    artist_description: currentShow.artist_description,
                    date: currentShow.numberOfPlayers,
                    start_time: currentShow.start_time,
                    stage: parseInt(currentShow.stage),
                    artist_image: currentShow.artist_image
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