import {Routes, Route} from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { Home } from "../home/Home"
import { MyFridaySchedule } from "../mylineup/MyFridaySchedule"
import { MySaturdaySchedule } from "../mylineup/MySaturdaySchedule"
import { FridaySchedule } from "../schedule/FridaySchedule"
import { SaturdaySchedule } from "../schedule/SaturdaySchedule"

import { Authorized } from "./Authorized"



export const ApplicationViews = ({ token, setToken, setUserId, userId }) => {
	return <>
	<Routes>
	<Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
    <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
    <Route element={<Authorized token={token} />}>
      {/* Add Routes here */}
	<Route path="/home" element={<Home />} />
	<Route path="/fridaySchedule" element={<FridaySchedule />} />
	<Route path="/saturdaySchedule" element={<SaturdaySchedule />} />
	<Route path="/myFridaySchedule" element={<MyFridaySchedule />} />
	<Route path="/mySaturdaySchedule" element={<MySaturdaySchedule />} />
	</Route>
	</Routes>
	</>
}

