/// <reference path="/Users/ryleyhynes/workspace/groove-client/react-jsx.d.ts" />
import { useState } from "react"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
interface GrooveProps {
    // TODO: add props
}

//function that authenticates the user
const Groove: React.FC<GrooveProps> = () => {
    //setting initial token state to the groove_token found in local storage
    const [token, setTokenState] = useState<string | null>(localStorage.getItem('groove_token'))
    //setting initial userId state to the userId found in local storage
    const [userId, setUserIdState] = useState<string | null>(localStorage.getItem('user_id'))
    //setting initial staff state to the is_staff property found in local storage
    const [isStaff, setIsStaffState] = useState<string | null>(localStorage.getItem('is_staff'))


    const setToken = (newToken: string | null) => {
        if (newToken === null) {
            localStorage.removeItem('groove_token');
        } else {
            localStorage.setItem('groove_token', newToken)
        }
        setTokenState(newToken)
    }

    const setUserId = (userId: string | null) => {
        if (userId === null) {
            localStorage.removeItem('user_id');
        } else {
            localStorage.setItem('user_id', userId)
        }
        setUserIdState(userId)
    }

    const setStaff = (isStaff: string | null) => {
        if (isStaff === null) {
            localStorage.removeItem('is_staff')
        } else {
            localStorage.setItem('is_staff', isStaff)
        }
        setIsStaffState(isStaff)
    }

    return <>
        <NavBar token={token} setToken={setToken} setStaff={setStaff} />
        <ApplicationViews token={token} setToken={setToken} setUserId={setUserId} userId={userId} setStaff={setStaff} />
    </>
}

export default Groove;