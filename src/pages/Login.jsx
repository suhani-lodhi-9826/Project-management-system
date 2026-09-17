import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login(){

    const {login} = useAuth()

    const navigate= useNavigate();

   function submitForm(formdata){
     const email= formdata.get("email");
     const password = formdata.get("password");
     const role= formdata.get("role")
     console.log(email, password, role)

    if(email==null||password==null||role==null){
        alert("Must provide all required informations")
        return;
    }
     
    const isLogin= login(email, password, role);

    if(isLogin){
        navigate('/dashboard')
    }
    

   }


    return (
        <>
        <h1>Login page</h1>
          <form action={submitForm}>
            <input name="email" type="email" placeholder="enter your email" />
            <br /> <br/>
            <input name="password" type="password" placeholder="enter your password"/>
            <br /> <br/>
            <label>
                <input type="radio" name="role" value="ADMIN" />
                ADMIN
            </label>
            <label>
                <input type="radio" name="role" value="MEMBER" />
                MEMBER
            </label>
            <button>Login</button>
          </form>
        </>
    )
}