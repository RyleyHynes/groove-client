import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyShows } from "../managers/ShowManager"

export const MySaturdaySchedule = () => {
    const navigate = useNavigate()
    const [mySaturdayShows, setMySaturdayShows] = useState([])

    useEffect(() => {
        getMyShows("2022-10-22").then(data => setMySaturdayShows(data[0]))
    }, [])


    return (
        <>
            <button onClick={() => navigate("/myFridaySchedule")}>Friday</button>
            <button onClick={() => navigate("/mySaturdaySchedule")}>Saturday</button>

            <h2>Your Saturday Schedule</h2>
            <article>
                <ul>
                    {
                        mySaturdayShows?.shows?.map((show) => {
                            return (
                                <div key={`saturdayShow-${show.id}`}>
                                    <section key={`show-${show.id}`}>
                                        <div>
                                            <img src={show?.artist.artist_image} alt='show'></img>
                                        </div>
                                        <div><b>Artist:</b> {show?.artist.artist_name}</div>
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