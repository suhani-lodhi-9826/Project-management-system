import { useParams } from "react-router-dom"
import { useProjects } from "../../context/ProjectContext"
import { useAuth } from "../../context/AuthContext"
import { useMemo } from "react"

export default function ViewProject(){
    const { id } = useParams();
    const { getProjectById } = useProjects();
    const { getUserById, allUser } = useAuth();

    const project = getProjectById(id)?.[0];

    if (!project) return <p>Project not found.</p>;

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
        </>
    );
}