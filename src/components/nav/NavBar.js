import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";

//function for the nav bar which accepts 3 props
export const NavBar = ({ token, setToken, setStaff }) => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()
    const navbar = useRef()
    const hamburger = useRef()
    const [staff, setStaffState] = useState()

    //getting the is_staff property out of local storage for the current user and setting it to the staff state
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    //HTML for the navbar 
    return (
        <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <h1 className="title is-4">Groove Fest</h1> 
                </a>

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {
                        token
                            ? <>
                                <Link to="/home" className="navbar-item">Home</Link>
                                <Link to="/fridaySchedule" className="navbar-item">Groove Schedule</Link>
                                <Link to="/myFridaySchedule" className="navbar-item">My Schedule</Link>
                                <Link to={`/profiles/${localStorage.getItem("user_id")}`} className="navbar-item">Profile</Link> 
                                {/* if the user is staff they will also have the below nav bar options */}
                                {staff === "true"
                                ?
                                <>
                                <Link to="/profiles" className="navbar-item">User Profiles</Link>
                                <Link to="/artistList" className="navbar-item">Artist List</Link>
                                </>
                                    :  <></>
                                }
                            </>
                            :
                            ""
                    }
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {/*initial login / register page navbar*/}
                            {
                                token
                                    ? <>
                                        <button className="button is-outlined" onClick={() => {
                                            setToken('')
                                            setStaff('')
                                            navigate('/login')
                                        }}>Logout</button>
                                    </>
                                    :
                                    <>
                                        <Link to="/register" className="button is-link">Register</Link>
                                        <Link to="/login" className="button is-outlined">Login</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}