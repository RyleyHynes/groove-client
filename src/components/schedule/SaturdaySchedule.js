import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createMyShow} from "../managers/MyShowManager"
import { getSaturdaySchedule } from "../managers/ScheduleManager"
import { deleteShow, getSearchSaturdayShows } from "../managers/ShowManager"
// import "./List.css"


export const SaturdaySchedule = ({ setStaff }) => {
    //setting up initial state for shows
    const [shows, setShows] = useState([])
    //setting up initial state for addShow and setting it to false
    const [addShow, setAddShow] = useState(false)
    //setting up initial state for staff
    const [staff, setStaffState] = useState()
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredSaturdayShow, setFilteredSaturdayShow] = useState([])

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
    
    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchSaturdayShows(searchTerms).then(data => setFilteredSaturdayShow(data[0].shows))
            }
            else {
                setFilteredSaturdayShow(shows)
            }
        },
        [searchTerms, shows]
    )

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
            <h2 className="showForm_title">Saturday Groove</h2>
            {/* if the user is staff they will have the option to add a new show*/}
            <div className="topButtons">
                {
                    (staff === "true")
                        ?
                        <>
                            <button className="dayButtons" onClick={() => navigate("/addShowForm")}>Add Show</button>
                        </>
                        :
                        <>

                        </>
                }
            {/* buttons to toggle between friday and saturdays schedule */}
            <button className="dayButtons" onClick={() => navigate("/fridaySchedule")}>Friday</button>
            <button className="dayButtons" onClick={() => navigate("/saturdaySchedule")}>Saturday</button>
            <input
                    className="input search mx-4"
                    type="text"
                    placeholder="Search Items"
                    onChange={
                        (changeEvent) => {
                            let search = changeEvent.target.value
                            setSearchTerms(search)
                        }
                    }
                />
            </div>
            <article>
                <ul className="showContainer">
                    {/* mapping through each show and displaying its information */}
                    {filteredSaturdayShow.map((show) => {
                        return (
                            <div className="individualShow" key={`show-${show.id}`}>
                                <section className="showList" key={`show-${show.id}`}>
                                    <div className="imageContainer">
                                        <img className="showPicture" src={show?.artist.artist_image} alt='show'></img>
                                    </div>
                                    <div className="textContainer">
                                        <div className="showInfo"><b>Artist:</b>{show?.artist.artist_name}</div>
                                        <div className="showInfo"><b>Genre:</b>{show?.artist.genre}</div>
                                        <div className="showInfo"><b>Description:</b>{show?.artist.artist_description}</div>
                                        <div className="showInfo"><b>Stage:</b>{show?.stage.stage_name}</div>
                                        <div className="showInfo"><b>start:</b>{show.readable_start_time}-{show.readable_end_time}</div>
                                    </div>
                                </section>
                                <section className="bottomButtons">
                                    <button className="alterButton" id={show.id} onClick={handleAddShow}>Add to MyLineup</button>

                                    {/* if the user is staff they will have the option to edit or delete a show */}
                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="alterButton" onClick={() => navigate(`/shows/${show.id}/edit`)}>edit</button>
                                                <button className="alterButton" onClick={(evt) => {
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