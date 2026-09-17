import { useAuth } from "../context/AuthContext"

export default function Sidebar(){
    const {user} = useAuth();
    return (
        <>
          <section class="sidebar">
             user.role==='ADMIN'?
             <ul>
                <li>dashboard</li>
                <li>Projects</li>
                <li>Users</li>
                <li>Teams</li>
             </ul> :
          </section>
        </>
    )
}