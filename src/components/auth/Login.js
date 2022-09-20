import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../managers/AuthManager"


/*Login is a function that accepts two props to register new users*/
export const Login = ({ setToken, setUserId }) => {
    /*invoking useRef and assigning its return value to several variables
    useRef( ) allows you to persist values between rerenders.It can be used 
    to store a mutable value that does not cause a re-render when updated */
    const username = useRef()
    const password = useRef()

    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    const [isUnsuccessful, setIsUnsuccessful] = useState(false) //setting initial state of isUnsuccessful to false

    //This function handles the login of a user
    const handleLogin = (e) => {
        e.preventDefault() //preventing browser reload/refresh

        //user object to be checked for login
        const user = {
            username: username.current.value,
            password: password.current.value
        }

        //handling validation for login and if it is unsuccessful we change the state to true
        loginUser(user).then(res => {
            if ("valid" in res && res.valid) {

                setToken(res.token)
                setUserId(res.user_id)
                localStorage.setItem('is_staff', res.is_staff)
                navigate("/home")

            }
            else {
                setIsUnsuccessful(true)
            }
        })
    }

    //HTML that user sees on the login page
    return (
                        {/* When the form is submitted, the handleLogin function is triggered */}
                        <div className="Auth-form-container">
                        <form className="Auth-form" onSubmit={handleLogin}>
                        <div className="Auth-form-content">
                            <h1 className="Auth-form-title">Groove Fest 2022</h1>
                            <h2 className="Auth-form-title">Please sign in</h2>

                            <div className="field">
                                <label className="userName">Username</label>
                                <div >
                                    {/* ref attribute = element to access it directly in the DOM. */}
                                    <input className="input" type="text" ref={username} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input className="input" type="password" ref={password} />
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link" type="submit" >Submit</button>
                                </div>
                                <div className="control">
                                    {/* cancels registration and brings you back to login */}
                                    <Link to="/register" className="button is-link is-light">Cancel</Link>
                                </div>
                            </div>
                            {/* if the state of isUnsuccessful changes to true we have a pop up saying invalid, otherwise it shows an empty string aka nothing */}
                            {
                                isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
                            }
                            </div>
                        </form>
                        </div>
                            
    )
}

