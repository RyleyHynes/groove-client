import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

//function for the nav bar which accepts 3 props
export const NavBar = ({ token, setToken, setStaff }) => {
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    // const [selectionBorder, setSelection] = useState({
    //     selection:"home",
    //     style: "border-2 border-blue"
    // })

    // const handleChange = (selection) => {
    //     setSelection({
    //         ...selectionBorder, selection
    //     })
    // }
    const [staff, setStaffState] = useState()

    //getting the is_staff property out of local storage for the current user and setting it to the staff state
    useEffect(() => {
        setStaffState(localStorage.getItem("is_staff"))
    }, [setStaff])

    //HTML for the navbar 
    return (
        <Nav variant="pills" defaultActiveKey={window.location.pathname}>
            {
                token
                    ? <>
                        <Nav.Item>
                            <Nav.Link href="/home">Home</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/fridaySchedule">Groove Schedule</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/myFridaySchedule">My Schedule</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href={`/profiles/${localStorage.getItem("user_id")}`} className="navbar-item">Profile</Nav.Link>
                        </Nav.Item>
                        {/* if the user is staff they will also have the below nav bar options */}
                        {staff === "true"
                            ?
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/profiles" className="navbar-item">User Profiles</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/artistList" className="navbar-item">Artist List</Nav.Link>
                                </Nav.Item>
                            </>
                            : <></>
                        }
                    </>
                    :
                    ""
            }
            
                        {/*initial login / register page navbar*/}
                        {
                            token
                                ? <>
                                    <Button  onClick={() => {
                                        setToken('')
                                        setStaff('')
                                        navigate('/login')
                                    }}>Logout</Button>
                                </>
                                :
                                <>
                                <Nav.Item>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </Nav.Item>
                                </>
                        }
        </Nav>
    )
}
