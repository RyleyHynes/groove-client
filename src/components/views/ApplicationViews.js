import { Routes, Route } from "react-router-dom"
import { ArtistForm } from "../artists/ArtistForm"
import { ArtistList } from "../artists/ArtistList"
import { EditArtist } from "../artists/EditArtistForm"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { Home } from "../home/Home"
import { MyFridaySchedule } from "../mylineup/MyFridaySchedule"
import { ProfileDetails } from "../profle/Profile"
import { ProfileList } from "../profle/ProfileList"
import { FridaySchedule } from "../schedule/FridaySchedule"
import { SaturdaySchedule } from "../schedule/SaturdaySchedule"
import { ShowForm } from "../show/AddShowForm"
import { EditShow } from "../show/EditShowForm"

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
				
				<Route path="/addShowForm" element={<ShowForm />} />
				<Route path="/shows/:showId/edit" element={<EditShow />} />

				<Route path="/addArtistForm" element={<ArtistForm />} />
				<Route path="/artistList" element={<ArtistList />} />
				<Route path="/artists/:artistId/edit" element={<EditArtist />} />

				<Route path="/profiles" element={<ProfileList />} />
				<Route path="/profiles/:profileId" element={<ProfileDetails />} />
			</Route>
		</Routes>
	</>
}

