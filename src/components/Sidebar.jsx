import { useAuth } from "../context/AuthContext"
import './Sidebar.css'

export default function Sidebar(){
    const {user} = useAuth();
    return (
        <>
          <section class="sidebar">
            { user.role==='ADMIN' &&   
             <ul>
                <li>dashboard</li>
                <li>Projects</li>
                <li>Users</li>
                <li>Teams</li>
             </ul>}

             {   user.role==='MEMBER' && 
             <ul>
                <li>dashboard</li>
                <li>Projects</li>
             </ul>}
          </section>
        </>
    )
}