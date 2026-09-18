import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import './Sidebar.css'

export default function Sidebar(){
    const {user} = useAuth();
    return (
        <>
          <section class="sidebar">
            { user.role==='ADMIN' &&   
             <ul>
                <li> <NavLink to="/dashboard" end>Dashboard</NavLink> </li>
                <li> <NavLink to="/dashboard/Projects">Projects</NavLink></li>
                <li> <NavLink to="/dashboard/Users">Users</NavLink></li>
                <li> <NavLink to="/dashboard/teams">Teams</NavLink></li>
             </ul>}

             {   user.role==='MEMBER' && 
             <ul>
                 <li> <NavLink to="/dashboard">Dashboard</NavLink> </li>
                <li> <NavLink to="/dashboard/Projects">Projects</NavLink></li>
             </ul>}
          </section>
        </>
    )
}