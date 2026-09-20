import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null)

export function AuthProvider({children}){
    const [allUser, setAllUsers] = useState([])
    const [user, setUser] = useState(() => {
        const mockUser = localStorage.getItem('user');
        return mockUser ? JSON.parse(mockUser) : null;
    });
    const [loading, setLoading]= useState(true);

    useEffect(() => {

        const mockUser = localStorage.getItem("user");

        if (mockUser) {
            setUser(JSON.parse(mockUser));
        }

        async function fetchAllUsers(){
             let users = await fetch("http://localhost:3000/users");
             users = await users.json();
             setAllUsers(users);
        }
        fetchAllUsers();
        setLoading(false);
    }, []);
    


    async function login(email, password, role){
     const loggedUser= allUser.filter((u)=> u.email===email && u.role===role)[0];
     if(!loggedUser){
        alert("User doesn't exist with this email and role");
        return false;
     }
     if(loggedUser.password!==password){
        alert("Password is wrong");
        return {success:false};
     }
     setUser(loggedUser);
     setLoading(false);
     localStorage.setItem('user', JSON.stringify(loggedUser));
     return true
    }


    function logout(){
        localStorage.removeItem('user')
        setUser(null);
    }

    let value={user,loading, allUser, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}


export const useAuth=() => useContext(AuthContext);