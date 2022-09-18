import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteMyShow, getMyShows } from "../managers/MyShowManager"

export const MyFridaySchedule = () => {
    //setting initial state of mySaturdayShows 
    const [mySaturdayShows, setMySaturdayShows] = useState([])
    //setting initial state of myFridayShows 
    const [myFridayShows, setMyFridayShows] =useState([])
    //setting the initial day state to false for toggle purposes
    const [day, setDay] = useState(false)

    //sorts the shows based on their date
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
        setMySaturdayShows(saturdayShows) //setting shows that are on saturday to mySaturdayShows state
        setMyFridayShows(fridayShows) //setting shows that are on friday to myFridayShows state
    }

    //function which gets users shows and sorts them by day
    const getShows = () => {
        getMyShows().then(data => {
            
            sortShows(data[0])})
    }

    //useEffect ot invoke the getShows function
    useEffect(() => {
        
        getShows()
    }, [])

    //HTML for the users Schedule
    return (
        <>

            <button onClick={() => setDay(false)}>Friday</button>
            <button onClick={() => setDay(true)}>Saturday</button>
            {
                day ? <><h2>Your Saturday Schedule</h2>
                <article>
                    <ul>
                        {/* mapping though the users saturday shows and listing off each shows image, 
                        artist name, genre, description, stage, and show time */}
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
                                            <button className="deleteButton" onClick={(evt) => {
                                                    evt.preventDefault()
                                                    deleteMyShow(show.id).then(getShows)
                                                }}>Delete</button>
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
                    {/* mapping though the users friday shows and listing off each shows image, 
                        artist name, genre, description, stage, and show time */}
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
                                        {/* user has the option to delete this show from their lineup */}
                                        <button className="deleteButton" onClick={(evt) => {
                                                    evt.preventDefault()
                                                    deleteMyShow(show.id).then(getShows)
                                                }}>Delete</button> 
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