import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Login.css';

export default function Login(){

    const {login, user} = useAuth()

    const navigate= useNavigate();

   async function submitForm(formdata){
     const email= formdata.get("email");
     const password = formdata.get("password");
     const role= formdata.get("role")
     console.log(email, password, role)

    if(email==null||password==null||role==null){
        alert("Must provide all required informations")
        return;
    }
     
    const isLogin= await login(email, password, role);

    if(isLogin){
        if(user.role=='ADMIN'){
           navigate('/admin/dashboard')
        }
        else if(user.role=='MEMBER'){
           navigate('/user/dashboard')
        }
    }
    

   }


    return (
        <>
       <div className="login-page">
    <h1>Login page</h1>

    <form className="login-form" action={submitForm}>
        <input name="email" type="email" placeholder="Enter your email" />

        <input name="password" type="password" placeholder="Enter your password"/>

        <div className="role-options">
            <label>
                <input type="radio" name="role" value="ADMIN" />
                ADMIN
            </label>

            <label>
                <input type="radio" name="role" value="MEMBER" />
                MEMBER
            </label>
        </div>

        <button type="submit">Login</button>
    </form>
</div>
        </>
    )
}