import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteArtist, getArtists } from "../managers/ArtistManager"


export const ArtistList = ({ setStaff }) => {
    const [artists, setArtists] = useState([])
    const [staff, setStaffState] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    useEffect(() => {
        getArtists().then(data => setArtists(data))
    }, [])

    const refreshPage = () => {
        window.location.reload(false);
    }


    return (
        <>
            <h2>Artists</h2>
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
                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="button is-warning" onClick={() => navigate(`/artists/${artist.id}/edit`)}>edit</button>
                                                <button className="deleteButton" onClick={() => {
                                                    refreshPage()
                                                    deleteArtist(artist.id).then(getArtists().then(setArtists))
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