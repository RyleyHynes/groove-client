import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteArtist, getArtists } from "../managers/ArtistManager"
// import "./List.css"

//function to list off the artists that has a prop of seStaff
export const ArtistList = () => {
    //setting initial state of artist to an empty array
    const [artists, setArtists] = useState([])
    //setting initial state of staff
    const [staff, setStaffState] = useState()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //getting the is_staff property out of local storage for the current user and setting it to the staff state
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [])

    //getting the artists from the ArtistsManager.js file and setting that data into the artists state
    useEffect(() => {
        getArtists().then(data => setArtists(data))
    }, [])


    //Displaying the HTML for the artists that will be listed out
    return (
        <>
            <h2>Artists</h2>
            {/* if the user is staff they will be able to see a button that will bring them to the add artist form */}
            {
                (staff === "true")
                    ?
                    <>
                        <button onClick={() => navigate("/addArtistForm")}>Add Artist</button>
                    </>
                    :
                    <>

                    </>
            }
            <article>
                <ul>
                    {/* mapping through each artist to get their image, name, genre, and description */}
                    {artists.map((artist) => {
                        return (
                            <div key={`artist-${artist.id}`}>
                                <section key={`artist-${artist.id}`}>
                                    <div>
                                        <img src={artist?.artist_image} alt='show'></img>
                                    </div>
                                    <div><b>Artist:</b>{artist.artist_name}</div>
                                    <div><b>Genre:</b>{artist.genre}</div>
                                    <div><b>Description:</b>{artist.artist_description}</div>
                                    {/* if the user is staff they will have the option to edit or delete each artist */}
                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="button is-warning" onClick={() => navigate(`/artists/${artist.id}/edit`)}>edit</button>
                                                <button className="deleteButton" onClick={() => {
                                                    deleteArtist(artist.id).then(() => {getArtists().then(setArtists)})
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