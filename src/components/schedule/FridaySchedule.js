import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getFridaySchedule } from "../managers/ScheduleManager"

export const FridaySchedule = () => {
    const [shows, setShows] = useState([])
    
    const navigate = useNavigate()

    useEffect(() => {
        getFridaySchedule().then(data => setShows(data))
    }, [])

    return (
        <>
        <h2>Friday Groove</h2>
        <article>
            <ul>
                {shows.map((show)=> {
                    return(
                        <div key={`show-${show.id}`}>
                            <section key={`show-${show.id}`}>
                                <div>
                                    <img src={show?.artist.artist_image} alt='show'></img>
                                </div>
                                <div><b>Artist:</b>{show?.artist.artist_name}</div>
                                <div><b>Genre:</b>{show?.artist.genre}</div>
                                <div><b>Description:</b>{show?.artist.artist_description}</div>
                                <div><b>Stage:</b>{show?.stage.stage_name}</div>
                                <div><b>Show Time:</b>{show.readable_start_time}-{show.readable_end_time}</div>
                            </section>
                        </div>
                    )
                })}
            </ul>
        </article>
        </>
    )
    
}