import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getFridaySchedule } from "../managers/ScheduleManager"

export const FridaySchedule = () => {
    const [show, setShow] = useState([])
    
    const navigate = useNavigate()

    return (
        <>
        <h2>Friday Groove</h2>
        <article>
            <ul>
                {getFridaySchedule.map((show)=> {
                    return(
                        <div key={`show-${show.id}`}>
                            <section key={`show-${show.id}`}>
                                <div>
                                    <img src={show.artist_image} alt='show'></img>
                                </div>
                                <div><b>Artist:</b>{show.artist_name}</div>
                            </section>
                        </div>
                    )
                })}
            </ul>
        </article>
        </>
    )
    
}