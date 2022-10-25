import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteArtist, getArtists, getSearchArtists } from "../managers/ArtistManager"
// import "./List.css"

//function to list off the artists that has a prop of seStaff
export const ArtistList = ({ searchTermState }) => {
    //setting initial state of artist to an empty array
    const [artists, setArtists] = useState([])
    //setting initial state of staff
    const [staff, setStaffState] = useState()
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredArtists, setFilteredArtists] = useState([])
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

    useEffect(
        () => {
            if (searchTerms !== "") {
                getSearchArtists(searchTerms).then(data => setFilteredArtists(data))
            }
            else {
                setFilteredArtists(artists)
            }
        },
        [searchTerms, artists]
    )

    //Displaying the HTML for the artists that will be listed out
    return (
        <>
            <h2 className="showForm_title">Artists</h2>
            {/* if the user is staff they will be able to see a button that will bring them to the add artist form */}
            <div className="topButtons">
                {
                    (staff === "true")
                        ?
                        <>
                            <button className="dayButtons" onClick={() => navigate("/addArtistForm")}>Add Artist</button>
                        </>
                        :
                        <>

                        </>
                }
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
                    {/* mapping through each artist to get their image, name, genre, and description */}
                    {filteredArtists.map((artist) => {
                        return (
                            <div className="individualShow" key={`artist-${artist.id}`}>
                                <section className="showList" key={`artist-${artist.id}`}>
                                    <div className="imageContainer">
                                        <img className="showPicture" src={artist?.artist_image} alt='show'></img>
                                    </div>
                                    <div className="textContainer">
                                        <div className="showInfo"><b>Artist: </b>{artist.artist_name}</div>
                                        <div className="showInfo"><b>Genre: </b>{artist.genre}</div>
                                        <div className="showInfo"><b>Description: </b>{artist.artist_description}</div>
                                    </div>
                                </section>
                                <section className="bottomButtons">
                                    {/* if the user is staff they will have the option to edit or delete each artist */}
                                    {
                                        (staff === "true")
                                            ?
                                            <>
                                                <button className="alterButton" onClick={() => navigate(`/artists/${artist.id}/edit`)}>edit</button>
                                                <button className="alterButton" onClick={() => {
                                                    deleteArtist(artist.id).then(() => { getArtists().then(setArtists) })
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