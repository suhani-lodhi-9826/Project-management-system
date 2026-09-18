
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoutes({children, allowedRole}){
    const {user, loading} = useAuth();
    const navigate= useNavigate();
    console.log("protected route called", user)
    console.log("Loading:", loading);
     if(loading){
        return <div>Loading...</div>
     }
   if (!user) {
        return <Navigate to="/login" replace />
    }

    if(user.role!==allowedRole){
        return <Navigate to="/login" replace />
    }
    
   
    return children;

} 