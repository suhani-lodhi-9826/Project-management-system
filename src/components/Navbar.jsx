import { useAuth } from "../context/AuthContext"


export default function Navbar(){

    const {user} = useAuth();
    console.log((user.role).charAt(0).toUpperCase()+(user.role).substring(1))

    return (
        <>
          <nav className="navbar">
            <h2>Project Management System</h2>
            <h2>Welcome! {user.name}</h2>
            <h3>{(user.role).charAt(0)+(user.role).substring(1).toLowerCase()} Portal</h3>
            
          </nav>
        </>
    )
}