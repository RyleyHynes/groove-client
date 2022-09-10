import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyShows } from "../managers/ShowManager"

export const MyFridaySchedule = () => {
    const navigate = useNavigate()
    const [myFridayShows, setMyFridayShows] = useState([])

    useEffect(() => {
        getMyShows("2022-10-21").then(data => setMyFridayShows(data[0]))
    }, [])

    return (
        <>

            <button onClick={() => navigate("/myFridaySchedule")}>Friday</button>
            <button onClick={() => navigate("/mySaturdaySchedule")}>Saturday</button>

            <h2>Your Friday Schedule</h2>
            <article>
                <ul>
                    {
                        myFridayShows?.shows?.map((show) => {
                            return (
                                <div key={`fridayShow-${show.id}`}>
                                    <section key={`show-${show.id}`}>
                                        <div>
                                            <img src={show?.artist?.artist_image} alt='show'></img>
                                        </div>
                                        <div><b>Artist:</b> {show?.artist?.artist_name}</div>
                                        <div><b>Genre:</b> {show?.artist?.genre}</div>
                                        <div><b>Description:</b> {show?.artist?.artist_description}</div>
                                        <div><b>Stage:</b> {show?.stage?.stage_name}</div>
                                        <div><b>Show Time:</b> {show.readable_start_time}-{show.readable_end_time}</div> 
                                    </section>
                                </div>
                            )
                        })}
                </ul>
            </article>
        </>
    )
}