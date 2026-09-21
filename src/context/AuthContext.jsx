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

    async function addUser(name, email, password, role){
        const newUser = {
            name,
            email,
            password,
            role
        };
         let response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            alert('User added successfully');
            response = await response.json();
            setAllUsers([...allUser, response]);
            return {success:true};
        }
        else{
            alert('Failed to add user');
            return {success:false};
        }
        
    }

    function logout(){
        localStorage.removeItem('user')
        setUser(null);
    }

    function getUserById(id){
       return allUser.filter((u)=> u.id==id);
    }

    function deleteUser(id){
        let response = fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        });
        if(response.ok){
            alert("User deleted successfully");
        }
        setAllUsers(allUser.filter((u)=> u.id!=id));

    }

    async function updateUser(id, data){
        let res = await fetch('http://localhost:3000/users/'+id,
            {
                method: "patch",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if(res.ok){
                res = await res.json();
                setAllUsers((prev)=> prev.map((p)=> p.id==id ? res : p));
                alert("Details updated")
            }
            else{
                console.log("error ocurred during user detail update")
            }
    }

    let value={user,loading, allUser, login, logout, addUser, getUserById, updateUser};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}


export const useAuth=() => useContext(AuthContext);