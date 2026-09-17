import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null)

export function AuthProvider({children}){
    const [user, setUser] = useState(() => {
        const mockUser = localStorage.getItem('user');
        return mockUser ? JSON.parse(mockUser) : null;
    });
    const [loading, setLoading]= useState(true);


    async function login(email, password, role){
     let users = await fetch("http://localhost:3000/users");
     users = await users.json();
     const loggedUser= users.filter((u)=> u.email===email && u.role===role)[0];
     if(!loggedUser){
        alert("User doesn't exist with this email and role");
        return false;
     }
     if(loggedUser.password!==password){
        alert("Password is wrong");
        return {success:false};
     }
     setUser(loggedUser);
     setLoading(true)
     localStorage.setItem('user', JSON.stringify(loggedUser));
     return true
    }


    function logout(){
        localStorage.removeItem('user')
        setUser(null);
        setLoading(false)
    }

    let value={user,loading, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}


export const useAuth=() => useContext(AuthContext);