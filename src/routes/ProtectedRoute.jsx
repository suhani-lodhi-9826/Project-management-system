
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoutes({children}){
    const {user, loading} = useAuth();
    const navigate= useNavigate();
    console.log("protected route called", user)
     
   if (!user&& !loading) {
        return <Navigate to="/login" replace />;
    }
    
   
    return children;

} 