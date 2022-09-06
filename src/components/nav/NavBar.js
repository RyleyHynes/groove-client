import { Link, useNavigate } from "react-router-dom"


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <Row>
                <Col>
        <ul className="navbar">
        <li className="navbar__item">
                <Link to="/home">Home</Link>
            </li>
            <li className="navbar__item">
                <Link to="/games">Lineup Schedule</Link>
            </li>
            <li className="navbar__item">
                My Lineup
            </li>
            <li className="navbar__item">
                Profile
            </li>
            {
                (localStorage.getItem("groove_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("groove_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                        
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
            </Col>
            </Row>
            </Container>
    )
}