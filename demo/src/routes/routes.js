import Dashboard from "../components/admin/Dashboard"
import Profile from "../components/admin/Profile"
import {Navigate} from "react-router-dom"
const routes = [
    { path: 'dashboard'  , name: 'Dashboard', element: <Dashboard/> },
    { path: 'profile'  , name: 'Profile' ,  element:<Profile/> },
    { path: '', element: <Navigate to="dashboard"/>}

]
export default routes