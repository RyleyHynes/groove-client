import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSaturdaySchedule } from "../managers/ScheduleManager"

export const SaturdaySchedule = () => {
    const [shows, setShows] = useState([])
    
    const navigate = useNavigate()

    useEffect(() => {
        getSaturdaySchedule().then(data => setShows(data))
    }, [])

    const handleAddShow =()=> {
        const addShow = shows.find(show=>show.user.id=== currentUserId && !show.is_active)
        let newShow = {}
        

    }
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
                                <div><b>start:</b>{show.readable_start_time}-{show.readable_end_time}</div>
                                <button onClick={(()=>navigate())}
                            </section>
                        </div>
                    )
                })}
            </ul>
        </article>
        </>
    )
    
}