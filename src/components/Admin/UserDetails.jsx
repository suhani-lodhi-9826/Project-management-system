import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectContext";
import ViewProject from "../Member/ViewProject";
export default function UserDetails() {

    const { id } = useParams();
    const { getUserById } = useAuth();
    const { getProjectsByUser } = useProjects();
    const user = getUserById(id)[0];
    
    const projects = getProjectsByUser(id);
    console.log(projects);
   return (
   <>
      <h1>User Details</h1>
      <div>
        <h2>{user?.name}</h2>
        <p>Email: {user?.email}</p>
      </div>
       <h2 className="subtitle">Projects</h2>
       <div>
       {projects?.map((project) =>{
           return  <div className="project-card card">
            <h2>Project-Title : {project.name}</h2>
            <p>Project-description : {project.description}</p>
            <p>Start-Date : {project.startDate}</p>
            <p>End-Date : {project.dueDate}</p>
            <p>Status : {project.status}</p>
            <p>Priority : {project.priority}</p>
        </div>
        })
     }
     </div>
   </>

   )
}