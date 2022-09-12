import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyShows } from "../managers/ShowManager"

export const MyFridaySchedule = () => {
    const navigate = useNavigate()
    const [mySaturdayShows, setMySaturdayShows] = useState([])
    const [myFridayShows, setMyFridayShows] =useState([])
    const [day, setDay] = useState(false)

    const sortShows =(shows)=>{
        const fridayShows = []
        const saturdayShows = []
        let friShows = shows?.shows.map((show)=>{
            if (show.get_lineup_day === "2022-10-21") {
                fridayShows.push(show)
            } else{
                saturdayShows.push(show)
            }
        })
        setMySaturdayShows(saturdayShows)
        setMyFridayShows(fridayShows)
    }

    useEffect(() => {
        getMyShows().then(data => {
            
            sortShows(data[0])
        })
    }, [])


    
    return (
        <>

            <button onClick={() => setDay(false)}>Friday</button>
            <button onClick={() => setDay(true)}>Saturday</button>
            {
                day ? <><h2>Your Saturday Schedule</h2>
                <article>
                    <ul>
                        {
                            mySaturdayShows?.map((show) => {
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
                </> : 
                <>
            <h2>Your Friday Schedule</h2>
            <article>
                <ul>
                    {
                        myFridayShows?.map((show) => {
                            
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
            </>}
            
        </>
    )
}