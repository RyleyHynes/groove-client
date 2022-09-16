import { Link, useNavigate } from "react-router-dom"


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useRef, useState } from "react";

export const NavBar = ({ token, setToken, setStaff }) => {
    const navigate = useNavigate()
    const navbar = useRef()
    const hamburger = useRef()
    const [staff, setStaffState] = useState()

    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }


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
    //(
    //     <Container>
    //         <Row>
    //             <Col>
    //     <ul className="navbar">
    //     <li className="navbar__item">
    //             <Link to="/home">Home</Link>
    //         </li>
    //         <li className="navbar__item">
    //             <Link to="/fridaySchedule">Groove Schedule</Link>
    //         </li>
    //         <li className="navbar__item">
    //             <Link to="/myFridaySchedule">My Schedule</Link>
    //         </li>
    //         <li className="navbar__item">
    //             Profile
    //         </li>
    //         {
    //             (localStorage.getItem("groove_token") !== null) ?
    //                 <li className="nav-item">
    //                     <button className="nav-link fakeLink"
    //                         onClick={() => {
    //                             localStorage.removeItem("groove_token")
    //                             navigate('/login')
    //                         }}
    //                     >Logout</button>

    //                 </li> :
    //                 <>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/login">Login</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/register">Register</Link>
    //                     </li>
    //                 </>
    //         }        </ul>
    //         </Col>
    //         </Row>
    //         </Container>
    // )
}