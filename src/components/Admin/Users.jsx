import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserCards from "../models/UserCards";
import { useProjects } from "../../context/ProjectContext";
export default function Users(){
    const navigate = useNavigate();

    const {allUser, addUser} = useAuth();
    const {getProjectsByUser} = useProjects();



   

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
        {/* <div className="userCard">
        {
            allUser.map((u)=>{
                return <UserCards key={u.id} user={u}/>
            })
        }
        </div> */}
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Total Projects</th>
                    <th>Completed Projects</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allUser.map((u) => (
                    <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{getProjectsByUser(u.id)?.length || 0}</td>
                        <td>{getProjectsByUser(u.id)?.filter((p)=> p.status == 'DONE').length || 0}</td>
                        <td>
                            <button
                                onClick={() =>
                                    confirm("Are you sure you want to delete this user?") &&
                                    deleteUser(u.id)
                                }
                                className="btn-danger"
                            >
                                Delete
                            </button>
                            <button className="btn-secondary" onClick={() => navigate("../user-details/" + u.id)}>
                                View Details
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        </>
    )
}