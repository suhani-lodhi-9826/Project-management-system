import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function Users(){
    const navigate = useNavigate();

    const {allUser, addUser} = useAuth();

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
        <form onSubmit={addNewUser}>
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit" className="btn-primary">Add new User</button>
        </form>

        
        </>
    )
}