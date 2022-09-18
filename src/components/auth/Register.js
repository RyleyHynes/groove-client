import { useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../managers/AuthManager"

/*Register is a function that accepts two props to register new users*/
export const Register = ({ setToken, setUserId }) => {
    /*invoking useRef and assigning its return value to several variables
    useRef( ) allows you to persist values between rerenders.It can be used 
    to store a mutable value that does not cause a re-render when updated */
    const firstName = useRef() 
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    /*Invoking useNavigate and assigning it to navigate so that we can navigate our application programmatically*/
    const navigate = useNavigate()

    //This function handles the registration of a new user
    const handleRegister = (e) => {
        e.preventDefault() //preventing browser reload/refresh
        
        //creating new user object if the password verification matches
        if (password.current.value === verifyPassword.current.value) { 
            const newUser = { 
                username: username.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                bio: bio.current.value,
                password: password.current.value
            }

            //validating the user and setting a token and userId
            registerUser(newUser)
                .then(res => {
                    if ("valid" in res && res.valid) {
                        setToken(res.token)
                        localStorage.setItem("is_staff", res.is_staff)
                        setUserId(res.user_id)
                        navigate("/home")
                    }
                })
        } else {
            passwordDialog.current.showModal() //if validation fails, this pop up triggers
        }
    }

    //HTML that user sees on the registration page
    return (
        <section className="columns is-centered">
            {/* When the form is submitted, the handleRegister function is triggered */}
            <form className="column is-two-thirds" onSubmit={handleRegister}>
                <h1 className="title">Groove Fest 2022</h1>
                <p className="subtitle">Create an account</p>
                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                    {/* ref attribute = element to access it directly in the DOM. */}
                        <input className="input" type="text" ref={firstName} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input className="input" type="text" ref={lastName} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input" type="text" ref={username} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" ref={email} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded">
                                <input className="input" type="password" placeholder="Password" ref={password} />
                            </p>
                        </div>

                        <div className="field">
                            <p className="control is-expanded">
                                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Bio</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="Tell us about yourself..." ref={bio}></textarea>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">Submit</button>
                    </div>
                    <div className="control">
                        {/* cancels registration and brings you back to login */}
                        <Link to="/login" className="button is-link is-light">Cancel</Link> 
                    </div>
                </div>

            </form>
        </section>
    )
}