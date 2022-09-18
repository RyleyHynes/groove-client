import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createMyShow, getMyShows } from "../managers/MyShowManager"
import { getSaturdaySchedule } from "../managers/ScheduleManager"
import { deleteShow } from "../managers/ShowManager"

export const SaturdaySchedule = ({ setStaff }) => {
    const [shows, setShows] = useState([])
    const [addShow, setAddShow] = useState(false)
    const [staff, setStaffState] = useState()

    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    const getCurrentSaturdaySchedule = () => {
        getSaturdaySchedule().then(data => setShows(data))
    }

    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    useEffect(() => {
        getCurrentSaturdaySchedule()
        //getMyShows('2022-10-22').then(data => setAddShow(data))
    }, [])

    const handleAddShow = (evt) => {
        evt.preventDefault()
        const show = { show_id: evt.target.id }
        setAddShow(evt.target.id)
        createMyShow(show).then((data) => {
            setAddShow(data)
        })

    }

    return (
        <>

            {
                (staff === "true")
                    ?
                    <>
                        <button onClick={() => navigate("/addShowForm")}>Add Show</button>
                    </>
                    :
                    <>

                    </>
            }

            <button onClick={() => navigate("/fridaySchedule")}>Friday</button>
            <button onClick={() => navigate("/saturdaySchedule")}>Saturday</button>

            <h2>Saturday Groove</h2>
            <article>
                <ul>
                    {shows.map((show) => {
                        return (
                            <div key={`show-${show.id}`}>
                                <section key={`show-${show.id}`}>
                                    <div>
                                        <img src={show?.artist.artist_image} alt='show'></img>
                                    </div>
                                    <div><b>Artist:</b>{show?.artist.artist_name}</div>
                                    <div><b>Genre:</b>{show?.artist.genre}</div>
                                    <div><b>Description:</b>{show?.artist.artist_description}</div>
                                    <div><b>Stage:</b>{show?.stage.stage_name}</div>
                                    <div><b>start:</b>{show.readable_start_time}-{show.readable_end_time}</div>
                                    <button id={show.id} onClick={handleAddShow}>Add to MyLineup</button>
                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="button is-warning" onClick={() => navigate(`/shows/${show.id}/edit`)}>edit</button>
                                                <button className="deleteButton" onClick={(evt) => {
                                                    evt.preventDefault()
                                                    deleteShow(show.id).then(getCurrentSaturdaySchedule)
                                                }}>Delete</button>
                                            </>
                                            :
                                            <>

                                            </>
                                    }
                                </section>
                            </div>
                        )
                    })}
                </ul>
            </article>
        </>
    )

}