import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserCards from "../models/UserCards";
import { useProjects } from "../../context/ProjectContext";
export default function Users(){
    const navigate = useNavigate();

    const {allUser, addUser} = useAuth();
    const {getProjectByUserId} = useProjects();


   

    async function addNewUser(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const role = "MEMBER";
        const result = await addUser(name, email, password, role);
        if (result.success) {
            e.target.reset();
        }
    }
    return (
        <>
          <h1>Users</h1>
          <br/>
        <form onSubmit={addNewUser}>
            <div className="addUser">
            <input type="text" name="name" placeholder="Name" required/>
            <input type="email" name="email" placeholder="Email" required/>
            <input type="password" name="password" placeholder="Password" required/>
            </div>
            <button type="submit" className="btn-primary">Add new User</button>
        </form>
        <br/>
        <h2 className="subtitle">All Users</h2>
        <div className="userCard">
        {
            allUser.map((u)=>{
                return <UserCards key={u.id} user={u}/>
            })
        }
        </div>
        </>
    )
}