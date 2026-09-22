import { useParams } from "react-router-dom"
import { useProjects } from "../../context/ProjectContext"
import { useAuth } from "../../context/AuthContext"
import { useMemo } from "react"

export default function ViewProject(){
    const { id } = useParams();
    const { getProjectById, getTaskByProjectIdAndUserId } = useProjects();
    const { getUserById, allUser, user } = useAuth();

    const project = getProjectById(id)?.[0];
    const tasks = getTaskByProjectIdAndUserId(id, user.id);

    console.log("taskksss" ,tasks)

    if (!project) return <p>Project not found.</p>;
    if(!tasks) return <p>Tasks not found</p>

    return (
        <>
        <h1>Project details</h1>
        <div className="project-card card">
            <h2>Project-Title : {project.name}</h2>
            <p>Project-description : {project.description}</p>
            <p>Start-Date : {project.startDate}</p>
            <p>End-Date : {project.dueDate}</p>
            <p>Status : {project.status}</p>
            <p>Priority : {project.priority}</p>

            <div>
                Contributors :
                {project.members.map((m) => {
                    const member = allUser.filter((u)=>{
                        return u.id==m;
                    })
                    console.log(member)
                    return <p key={m.id}>{member ? member[0].name : "Unknown user"}</p>;
                })}
            </div>
        </div>
<br/>
<h2 className="subtitle">My Tasks</h2>
        {
            tasks.length > 0? tasks.map((t)=>{
                return <div className="project-card card" key={t.id}>
                    <h2>{t.title}</h2>
                    <p>Description : {t.description}</p>
                    <p>Due-date : {t.dueDate}</p>
                    <p>Status : {t.status}</p>
                    <p>Priority : {t.priority}</p>
                </div>
            }) :
            <p>No tasks found...</p>
        }
        
        </>
    );
}