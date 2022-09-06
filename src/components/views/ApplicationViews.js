import {Routes, Route, useNavigate} from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { Home } from "../home/Home"
import { FridaySchedule } from "../schedule/FridaySchedule"
import { ScheduleDay } from "../schedule/ScheduleDay"

import { Authorized } from "./Authorized"


export const ApplicationViews = () => {
	return <>
	<Routes>
	<Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<Authorized />}>
	<Route path="/home" element={<Home />} />
	<Route path="/lineupDay" element={<ScheduleDay />} />
	<Route path="/fridayLineup" element={<FridaySchedule />} />
	</Route>
	</Routes>
	</>
}

