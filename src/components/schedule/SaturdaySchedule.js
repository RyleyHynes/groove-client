import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createMyShow, getMyShows } from "../managers/MyShowManager"
import { getSaturdaySchedule } from "../managers/ScheduleManager"
import { deleteShow } from "../managers/ShowManager"



export const SaturdaySchedule = ({ setStaff }) => {
    //setting up initial state for shows
    const [shows, setShows] = useState([])
    //setting up initial state for addShow and setting it to false
    const [addShow, setAddShow] = useState(false)
    //setting up initial state for staff
    const [staff, setStaffState] = useState()

    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //function to get the saturday schedule and set it into shows state
    const getCurrentSaturdaySchedule = () => {
        getSaturdaySchedule().then(data => setShows(data))
    }

    //observing the user in local storage and the boolean on is_staff 
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    //observing and invoking the getCurrentSaturdaySchedule
    useEffect(() => {
        getCurrentSaturdaySchedule()
    }, [])

    //function to add a show to their custom schedule
    const handleAddShow = (evt) => {
        evt.preventDefault() //preventing browser reload/refresh
        const show = { show_id: evt.target.id }
        setAddShow(evt.target.id)
        createMyShow(show).then((data) => {
            setAddShow(data)
        })

    }

    return (
        <>
            {/* if the user is staff they will have the option to add a new show*/}
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

            {/* buttons to toggle between friday and saturdays schedule */}
            <button onClick={() => navigate("/fridaySchedule")}>Friday</button>
            <button onClick={() => navigate("/saturdaySchedule")}>Saturday</button>

            <h2>Saturday Groove</h2>
            <article>
                <ul>
                    {/* mapping through each show and displaying its information */}
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
                                    
                                    {/* if the user is staff they will have the option to edit or delete a show */}
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