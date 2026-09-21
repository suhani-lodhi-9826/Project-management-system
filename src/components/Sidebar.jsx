import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"


export default function Sidebar(){
    const {user, logout} = useAuth();
    return (
        <>
          <section className="sidebar">
            { user.role==='ADMIN' &&   
             <ul>
                <li> <NavLink to="/admin/dashboard" end>Dashboard</NavLink> </li>
                <li> <NavLink to="/admin/dashboard/projects">Projects</NavLink></li>
                <li> <NavLink to="/admin/dashboard/Users">Users</NavLink></li>
             </ul>}

             {   user.role==='MEMBER' && 
             <ul>
                 <li> <NavLink to="/user/dashboard" end>Dashboard</NavLink> </li>
                <li> <NavLink to="/user/dashboard/tasks">My Tasks</NavLink></li>
                <li><NavLink to="/user/dashboard/profile">Profile</NavLink></li>
             </ul>}

             <div className="logout">
                <button onClick={() => confirm("Are you sure you want to logout?") && logout()} className="logout btn-danger">logout</button>
             </div>
          </section>
        </>
    )
}