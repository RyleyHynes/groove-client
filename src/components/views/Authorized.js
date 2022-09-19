import { Navigate, Outlet } from "react-router-dom"

//function to check if the groove user is authorized and if not it routes them to the login
export const Authorized = () => {
    if (localStorage.getItem("groove_token")) {
        return <Outlet />
    }
    return <Navigate to='/login' replace />
}