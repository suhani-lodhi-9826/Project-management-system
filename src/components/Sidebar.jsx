import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import './Sidebar.css'

export default function Sidebar(){
    const {user} = useAuth();
    return (
        <>
          <section className="sidebar">
            { user.role==='ADMIN' &&   
             <ul>
                <li> <NavLink to="/admin/dashboard" end>Dashboard</NavLink> </li>
                <li> <NavLink to="/admin/dashboard/projects">Projects</NavLink></li>
                <li> <NavLink to="/admin/dashboard/Users">Users</NavLink></li>
                <li> <NavLink to="/admin/dashboard/teams">Teams</NavLink></li>
             </ul>}

             {   user.role==='MEMBER' && 
             <ul>
                 <li> <NavLink to="/user/dashboard">Dashboard</NavLink> </li>
                <li> <NavLink to="/user/dashboard/Projects">Projects</NavLink></li>
             </ul>}
          </section>
        </>
    )
}